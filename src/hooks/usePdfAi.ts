
import { useCallback, useMemo, useState } from 'react'
import { extractTextFromPDF, ExtractResult } from '@/services/pdf'
import { fetchAI, type AIMessage } from '@/utils/geminiConfig'

type PdfAiTask = 'extract-questions' | 'extract-course-info'

interface UsePdfAiOptions {
	model?: string
	temperature?: number
	maxOutputTokens?: number
}

interface FileInfo {
	name: string
	size: number
	type: string
	pageCount: number
}

interface BaseSuccess<T> {
	success: true
	data: T
	extractedText?: string
	fileInfo?: FileInfo
}

interface BaseError {
	success: false
	error: string
	stage?: 'extraction' | 'ai'
	fileInfo?: FileInfo
	rawResponse?: string
}

export type PdfAiResult<T> = BaseSuccess<T> | BaseError

export type ExtractedQuestion = {
	id: string
	question_text: string
	question_type: 'mcq' | 'written'
	options?: string[]
	correct_answer?: string
	points?: number
}

export type CourseInfo = {
	title?: string
	description?: string
	category?: string
	price?: number
	instructor?: string
	chapters?: Array<{
		title: string
		description?: string
		lessons?: Array<{ title: string; duration_minutes?: number }>
	}>
}

function buildPrompt(task: PdfAiTask, text: string) {
	if (task === 'extract-questions') {
		const system = `You are an expert educational content parser. Extract well-structured quiz questions from provided text.

Rules:
- Detect MCQ and written questions
- For MCQ, include options[] and prefer 3-6 options
- Provide concise, unambiguous question_text
- If a correct answer is present in the text, include it as correct_answer (exact text for MCQ)
- Return ONLY JSON with the specified schema`

		const schema = {
			questions: [
				{
					id: 'string',
					question_text: 'string',
					question_type: "'mcq' | 'written'",
					options: ['string?'],
					correct_answer: 'string?',
					points: 'number?'
				}
			]
		}

		const user = `Source text:\n\n${text}\n\nReturn JSON only with shape: ${JSON.stringify(schema)}`
		return { system, user }
	}

	const system = `You are an expert course information extractor. Parse course metadata, chapters, and lessons from text.

Rules:
- Provide best-effort fields: title, description, category, price, instructor
- Aggregate chapters with lessons when present
- Use numbers for price when explicit, otherwise omit
- Return ONLY JSON with the specified schema`

	const schema = {
		course: {
			title: 'string?',
			description: 'string?',
			category: 'string?',
			price: 'number?',
			instructor: 'string?',
			chapters: [
				{
					title: 'string',
					description: 'string?',
					lessons: [
						{ title: 'string', duration_minutes: 'number?' }
					]
				}
			]
		}
	}

	const user = `Source text:\n\n${text}\n\nReturn JSON only with shape: ${JSON.stringify(schema)}`
	return { system, user }
}

async function callGeminiJSON(system: string, user: string, opts?: UsePdfAiOptions) {
	const temperature = opts?.temperature ?? 0.2
	const maxOutputTokens = opts?.maxOutputTokens ?? 2000

	const messages: AIMessage[] = [
		{ role: 'user', content: user }
	]

	const response = await fetchAI(messages, {
		systemPrompt: system,
		temperature,
		maxTokens: maxOutputTokens,
		responseFormat: 'json'
	})

	return response.content
}

export function usePdfAi(task: PdfAiTask, options?: UsePdfAiOptions) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const schemaGuard = useMemo(() => {
		return {
			parseQuestions(json: unknown): ExtractedQuestion[] {
				const data = json as Record<string, unknown>;
				const list = data?.questions;
				if (!Array.isArray(list)) return [];
				return list
					.map((q: unknown) => {
						const question = q as Record<string, unknown>;
						return {
							id: String(question.id ?? crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)),
							question_text: String(question.question_text ?? ''),
							question_type: (question.question_type === 'mcq' ? 'mcq' : 'written') as 'mcq' | 'written',
							options: Array.isArray(question.options) ? question.options.map((o: unknown) => String(o)) : undefined,
							correct_answer: question.correct_answer ? String(question.correct_answer) : undefined,
							points: typeof question.points === 'number' ? question.points : undefined,
						};
					})
					.filter((q) => q.question_text);
			},
			parseCourse(json: unknown): CourseInfo {
				const data = json as Record<string, unknown>;
				const c = data?.course ?? data;
				const courseData = c as Record<string, unknown>;
				const chaptersIn = Array.isArray(courseData?.chapters) ? courseData.chapters : [];
				return {
					title: courseData?.title ? String(courseData.title) : undefined,
					description: courseData?.description ? String(courseData.description) : undefined,
					category: courseData?.category ? String(courseData.category) : undefined,
					price: typeof courseData?.price === 'number' ? courseData.price : undefined,
					instructor: courseData?.instructor ? String(courseData.instructor) : undefined,
					chapters: chaptersIn
						.map((ch: unknown) => {
							const chapter = ch as Record<string, unknown>;
							return {
								title: String(chapter?.title ?? ''),
								description: chapter?.description ? String(chapter.description) : undefined,
								lessons: Array.isArray(chapter?.lessons)
									? chapter.lessons.map((ls: unknown) => {
											const lesson = ls as Record<string, unknown>;
											return {
												title: String(lesson?.title ?? ''),
												duration_minutes:
													typeof lesson?.duration_minutes === 'number' ? lesson.duration_minutes : undefined,
											};
									  })
									: undefined,
							};
						})
						.filter((ch: Record<string, unknown>) => ch.title),
				};
			},
		}
	}, [])

	const process = useCallback(
		async (
			input:
				| { pdfFile: File; rawText?: undefined }
				| { pdfFile?: undefined; rawText: string }
		): Promise<PdfAiResult<ExtractedQuestion[] | CourseInfo>> => {
			setLoading(true)
			setError(null)
			try {
				let text: string
				let fileInfo: FileInfo | undefined
				if ('pdfFile' in input && input.pdfFile) {
					const res = await extractTextFromPDF(input.pdfFile)
					if (!res.success) {
						return { 
							success: false, 
							error: 'PDF extraction failed', 
							stage: 'extraction' as const,
							fileInfo: undefined
						}
					}
					text = res.text
					fileInfo = res.fileInfo
				} else {
					text = input.rawText
				}

				const { system, user } = buildPrompt(task, text)
				const responseText = await callGeminiJSON(system, user, options)
				let parsed: unknown
				try {
					parsed = JSON.parse(responseText)
				} catch (_e) {
					// Try to salvage JSON from text blocks
					const match = responseText.match(/\{[\s\S]*\}|\[[\s\S]*\]/)
					if (!match) throw new Error('Failed to parse AI response as JSON')
					parsed = JSON.parse(match[0])
				}

				if (task === 'extract-questions') {
					const questions = schemaGuard.parseQuestions(parsed)
					return { success: true, data: questions, extractedText: text, fileInfo }
				}

				const course = schemaGuard.parseCourse(parsed)
				return { success: true, data: course, extractedText: text, fileInfo }
			} catch (e: unknown) {
				const errorMessage = e instanceof Error ? e.message : 'Processing failed';
				setError(errorMessage);
				return { success: false, error: errorMessage, stage: 'ai' as const }
			} finally {
				setLoading(false)
			}
		},
		[options, schemaGuard, task]
	)

	return {
		loading,
		error,
		process,
	}
}
