
import { fetchAI, type AIMessage } from './geminiConfig';

export const generateQuestionTitle = async (content: string): Promise<string> => {
  const systemPrompt = `You are an expert at creating concise, professional question titles. 

Given a question content, generate a clear, specific, and engaging title that:
- Is maximum 10-12 words
- Captures the essence of the question
- Uses professional language
- Is easy to understand
- Helps others quickly identify what the question is about

Return ONLY the title, nothing else.`;

  const prompt = `Question content: "${content}"

Generate a professional title for this question.`;

  try {
    const messages: AIMessage[] = [
      { role: 'user', content: prompt }
    ];

    const response = await fetchAI(messages, {
      systemPrompt,
      temperature: 0.3,
      maxTokens: 50
    });

    const title = response.content.trim();
    
    if (!title) {
      throw new Error('No title generated from AI');
    }

    return title;
  } catch (error: unknown) {
    console.error('Error generating title:', error);
    // Fallback to first few words of content
    const fallbackTitle = content.split(' ').slice(0, 8).join(' ');
    return fallbackTitle.length > 50 ? fallbackTitle.substring(0, 47) + '...' : fallbackTitle;
  }
};
