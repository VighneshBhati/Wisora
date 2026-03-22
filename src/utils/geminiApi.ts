
interface QuestionData {
  question_text: string;
  options?: string[];
  question_type: 'mcq' | 'written';
}

import { fetchAI, type AIMessage } from './geminiConfig';

interface AnswerResponse {
  answer: string;
  explanation?: string;
}

interface BulkAnswerResponse {
  answers: {
    question_index: number;
    answer: string;
    explanation?: string;
  }[];
}

export const answerSingleQuestion = async (question: QuestionData): Promise<AnswerResponse> => {
  const systemPrompt = `You are an expert AI assistant that answers quiz questions accurately. 
  
For multiple choice questions:
- Analyze the question and all provided options carefully
- Return ONLY the exact text of the correct option (do NOT include "a)", "b)", "c)", "d)" - just return the option text itself)
- Be precise and confident in your answer

For written questions:  
- Provide a clear, concise, and accurate answer
- Keep answers brief but complete

CRITICAL: Do not include option letters (a), b), c), d)) in your response. Return only the option text.

Always be confident and provide the most accurate answer possible.`;

  let prompt = `Question: ${question.question_text}\n\n`;
  
  if (question.question_type === 'mcq' && question.options) {
    prompt += `Options:\n`;
    question.options.forEach((option, index) => {
      if (option.trim()) {
        prompt += `${String.fromCharCode(97 + index)}) ${option}\n`;
      }
    });
    prompt += `\nProvide the exact text of the correct option.`;
  } else {
    prompt += `Provide a direct answer to this question.`;
  }

  try {
    const messages: AIMessage[] = [
      { role: 'user', content: prompt }
    ];

    const response = await fetchAI(messages, {
      systemPrompt,
      temperature: 0.1,
      maxTokens: 200
    });

    // Extract the answer text, removing any option letters (a), b), c), d), etc.)
    let answer = response.content.trim();
    
    // Remove option letters like "a) ", "b) ", "c) ", "d) " from the beginning
    const optionPattern = /^[a-z]\)\s*/i;
    if (optionPattern.test(answer)) {
      answer = answer.replace(optionPattern, '').trim();
    }
    
    return { answer };
  } catch (error: unknown) {
    throw new Error(`Failed to get answer from AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const answerAllQuestions = async (questions: QuestionData[]): Promise<BulkAnswerResponse> => {
  const systemPrompt = `You are an expert AI assistant that answers quiz questions accurately. You will receive multiple questions and must return answers for ALL questions in the exact JSON format specified.

CRITICAL: You must provide an answer for EVERY question provided. Do not skip any questions.

For multiple choice questions, return the exact text of the correct option (do NOT include "a)", "b)", "c)", "d)" - just the option text itself).
For written questions, provide clear and accurate answers.

CRITICAL: Do not include option letters (a), b), c), d)) in your response. Return only the option text.

Return your response as a JSON object with this exact structure:
{
  "answers": [
    {
      "question_index": 0,
      "answer": "exact answer text",
      "explanation": "optional brief explanation"
    },
    {
      "question_index": 1,
      "answer": "exact answer text",
      "explanation": "optional brief explanation"
    }
  ]
}

IMPORTANT: Include one answer object for each question, using question_index 0, 1, 2, etc.`;

  let prompt = "Please answer all of the following questions:\n\n";
  
  questions.forEach((question, index) => {
    prompt += `Question ${index}: ${question.question_text}\n`;
    
    if (question.question_type === 'mcq' && question.options) {
      prompt += `Options:\n`;
      question.options.forEach((option, optIndex) => {
        if (option.trim()) {
          prompt += `${String.fromCharCode(97 + optIndex)}) ${option}\n`;
        }
      });
    }
    prompt += '\n';
  });

  prompt += `\n\nYou must answer ALL ${questions.length} questions above. Return answers in the specified JSON format with exactly ${questions.length} answer objects. For MCQ questions, return the exact option text, not the letter. IMPORTANT: Use 0-based indexing for question_index (0, 1, 2, etc.).`;

  console.log('Sending questions to AI:', questions);
  console.log('Prompt being sent:', prompt);
  
  try {
    const messages: AIMessage[] = [
      { role: 'user', content: prompt }
    ];

    const response = await fetchAI(messages, {
      systemPrompt,
      temperature: 0.1,
      maxTokens: 2000,
      responseFormat: 'json'
    });

    try {
      // The response content is a JSON string, so we need to parse it
      const parsedResponse = JSON.parse(response.content);
      console.log('Parsed response:', parsedResponse);
      
      // Validate response structure
      if (!parsedResponse.answers || !Array.isArray(parsedResponse.answers)) {
        throw new Error('Invalid response format: missing or invalid answers array');
      }
      
      // Validate that we got answers for all questions
      if (parsedResponse.answers.length !== questions.length) {
        console.warn(`Expected ${questions.length} answers, but got ${parsedResponse.answers.length}`);
        // Don't throw error, just warn - we'll handle partial responses
      }
      
      // Validate each answer has required fields and clean the answer text
      parsedResponse.answers.forEach((answer: Record<string, unknown>, index: number) => {
        if (typeof answer.question_index !== 'number' || typeof answer.answer !== 'string') {
          throw new Error(`Invalid answer format at index ${index}: missing question_index or answer`);
        }
        if (answer.question_index < 0 || answer.question_index >= questions.length) {
          throw new Error(`Invalid question_index ${answer.question_index} at answer index ${index}`);
        }
        
        // Clean the answer text by removing option letters (a), b), c), d), etc.)
        let cleanAnswer = answer.answer.trim();
        const optionPattern = /^[a-z]\)\s*/i;
        if (optionPattern.test(cleanAnswer)) {
          cleanAnswer = cleanAnswer.replace(optionPattern, '').trim();
        }
        answer.answer = cleanAnswer;
      });
      
      return parsedResponse;
    } catch (parseError) {
      console.error('Failed to parse JSON:', response.content);
      console.error('Parse error:', parseError);
      throw new Error('Failed to parse AI response as JSON');
    }
  } catch (error: unknown) {
    throw new Error(`Failed to get answers from AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const generateMcqOptions = async (questionText: string): Promise<{ options: string[], correct_answer: string }> => {
  const systemPrompt = `You are an expert AI assistant that generates multiple choice questions.
  For the given question, generate four plausible options, with one being the correct answer.
  Return the options and the correct answer in JSON format: { "options": ["option1", "option2", "option3", "option4"], "correct_answer": "correct_option" }`;

  const prompt = `Question: ${questionText}`;

  try {
    const messages: AIMessage[] = [
      { role: 'user', content: prompt }
    ];

    const response = await fetchAI(messages, {
      systemPrompt,
      temperature: 0.7,
      maxTokens: 1024,
      responseFormat: 'json'
    });

    try {
      const parsedResponse = JSON.parse(response.content);
      return parsedResponse;
    } catch (parseError) {
      throw new Error('Failed to parse AI response as JSON');
    }
  } catch (error: unknown) {
    throw new Error(`Failed to generate options from AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

interface GenerateQuestionsParams {
  quizDescription: string;
  numberOfQuestions: number;
  questionType: 'both' | 'mcq' | 'written';
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
}

interface GeneratedQuestion {
  question_text: string;
  question_type: 'mcq' | 'written';
  options?: string[];
  correct_answer?: string;
  points: number;
}

export const generateQuestions = async (params: GenerateQuestionsParams): Promise<GeneratedQuestion[]> => {
  const { quizDescription, numberOfQuestions, questionType, difficulty } = params;

  const systemPrompt = `You are an expert AI assistant that generates educational quiz questions. 
  
  Generate high-quality questions based on the provided quiz description. Each question should be:
  - Clear and well-structured
  - Appropriate for the specified difficulty level
  - Educationally valuable and relevant to the topic
  - Free from bias and inclusive

  For multiple choice questions:
  - Provide exactly 4 options (A, B, C, D)
  - Make sure only one option is clearly correct
  - Make incorrect options plausible but clearly wrong
  - Avoid obvious patterns in correct answers

  For written questions:
  - Ask for explanations, analysis, or detailed answers
  - Provide clear evaluation criteria in the question

  Return your response as a JSON array with this exact structure:
  [
    {
      "question_text": "The question text here",
      "question_type": "mcq" or "written",
      "options": ["option1", "option2", "option3", "option4"] (only for MCQ),
      "correct_answer": "correct option text" (only for MCQ),
      "points": 1
    }
  ]`;

  let prompt = `Quiz Topic: ${quizDescription}\n\n`;
  prompt += `Generate ${numberOfQuestions} questions with the following specifications:\n`;
  prompt += `- Difficulty Level: ${difficulty}\n`;
  prompt += `- Question Type: ${questionType}\n\n`;
  
  if (questionType === 'both') {
    prompt += `Mix of multiple choice and written questions. For written questions, don't include options or correct_answer fields.\n`;
  } else if (questionType === 'mcq') {
    prompt += `All questions should be multiple choice with 4 options each.\n`;
  } else {
    prompt += `All questions should be written/essay type questions. Don't include options or correct_answer fields.\n`;
  }

  prompt += `\nMake sure each question is worth 1 point and is appropriate for the difficulty level specified.`;

  try {
    const messages: AIMessage[] = [
      { role: 'user', content: prompt }
    ];

    const response = await fetchAI(messages, {
      systemPrompt,
      temperature: 0.7,
      maxTokens: 4000,
      responseFormat: 'json'
    });

    try {
      const parsedResponse = JSON.parse(response.content);
      
      // Validate the response structure
      if (!Array.isArray(parsedResponse)) {
        throw new Error('Response is not an array');
      }

      // Ensure all questions have required fields
      const validatedQuestions = parsedResponse.map((q: Record<string, unknown>, index: number) => ({
        question_text: (q.question_text as string) || `Generated Question ${index + 1}`,
        question_type: (q.question_type as 'mcq' | 'written') || 'mcq',
        options: q.question_type === 'mcq' ? (q.options as string[] || []) : undefined,
        correct_answer: q.question_type === 'mcq' ? (q.correct_answer as string || '') : undefined,
        points: (q.points as number) || 1
      }));

      return validatedQuestions;
    } catch (parseError) {
      throw new Error('Failed to parse AI response as JSON');
    }
  } catch (error: unknown) {
    throw new Error(`Failed to generate questions from AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};