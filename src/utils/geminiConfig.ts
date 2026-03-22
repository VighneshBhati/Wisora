/**
 * Centralized AI API configuration utilities
 * Supports both Google Gemini and OpenRouter (DeepSeek, Gemini, etc.)
 */

export type AIProvider = 'gemini' | 'openrouter';

// Available models configuration
export const AVAILABLE_MODELS = {
  // Free Models
  'deepseek/deepseek-r1:free': {
    provider: 'openrouter' as const,
    name: 'DeepSeek R1 (Free)',
    description: 'Free reasoning model with excellent performance',
    supportsImages: false,
    maxTokens: 4000
  },
  'google/gemma-3n-2b': {
    provider: 'openrouter' as const,
    name: 'Google Gemma 3n 2B',
    description: 'Free multimodal model optimized for low-resource deployment',
    supportsImages: true,
    maxTokens: 8000
  },
  'google/gemini-2.0-flash-experimental': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 2.0 Flash (Experimental)',
    description: 'Free experimental Gemini 2.0 Flash model',
    supportsImages: true,
    maxTokens: 1000000
  },
  'google/gemini-1.5-flash-experimental': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 1.5 Flash (Experimental)',
    description: 'Free experimental Gemini 1.5 Flash model',
    supportsImages: true,
    maxTokens: 1000000
  },
  'google/gemini-experimental-1121': {
    provider: 'openrouter' as const,
    name: 'Google Gemini Experimental (Nov 21)',
    description: 'Free experimental Gemini model from November 21st, 2024',
    supportsImages: true,
    maxTokens: 41000
  },
  'google/gemini-experimental-1114': {
    provider: 'openrouter' as const,
    name: 'Google Gemini Experimental (Nov 14)',
    description: 'Free experimental Gemini model with quality improvements',
    supportsImages: true,
    maxTokens: 41000
  },

  // Premium Models - Gemini 2.5 Series
  'google/gemini-2.5-flash-preview-09-2025': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 2.5 Flash Preview (Sep 2025)',
    description: 'State-of-the-art workhorse model with advanced reasoning and thinking capabilities',
    supportsImages: true,
    maxTokens: 1050000
  },
  'google/gemini-2.5-flash-lite-preview-09-2025': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 2.5 Flash Lite Preview (Sep 2025)',
    description: 'Lightweight reasoning model optimized for ultra-low latency and cost efficiency',
    supportsImages: false,
    maxTokens: 1050000
  },
  'google/gemini-2.5-flash-image': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 2.5 Flash Image (Nano Banana)',
    description: 'State-of-the-art image generation model with contextual understanding',
    supportsImages: true,
    maxTokens: 33000
  },
  'google/gemini-2.5-flash-lite': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 2.5 Flash Lite',
    description: 'Lightweight reasoning model optimized for ultra-low latency and cost efficiency',
    supportsImages: false,
    maxTokens: 1050000
  },
  'google/gemini-2.5-flash-lite-preview-06-17': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 2.5 Flash Lite Preview (Jun 17)',
    description: 'Lightweight reasoning model optimized for ultra-low latency and cost efficiency',
    supportsImages: false,
    maxTokens: 1050000
  },
  'google/gemini-2.5-flash': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 2.5 Flash',
    description: 'State-of-the-art workhorse model with advanced reasoning and thinking capabilities',
    supportsImages: true,
    maxTokens: 1050000
  },
  'google/gemini-2.5-pro': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 2.5 Pro',
    description: 'State-of-the-art AI model for advanced reasoning, coding, mathematics, and scientific tasks',
    supportsImages: true,
    maxTokens: 1050000
  },
  'google/gemini-2.5-pro-preview-06-05': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 2.5 Pro Preview (Jun 5)',
    description: 'State-of-the-art AI model for advanced reasoning, coding, mathematics, and scientific tasks',
    supportsImages: true,
    maxTokens: 1050000
  },
  'google/gemini-2.5-flash-preview-05-20': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 2.5 Flash Preview (May 20)',
    description: 'State-of-the-art workhorse model with advanced reasoning and thinking capabilities',
    supportsImages: true,
    maxTokens: 1050000
  },
  'google/gemini-2.5-pro-preview-05-06': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 2.5 Pro Preview (May 6)',
    description: 'State-of-the-art AI model for advanced reasoning, coding, mathematics, and scientific tasks',
    supportsImages: true,
    maxTokens: 1050000
  },
  'google/gemini-2.5-flash-preview-04-17': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 2.5 Flash Preview (Apr 17)',
    description: 'State-of-the-art workhorse model with advanced reasoning and thinking capabilities',
    supportsImages: true,
    maxTokens: 1050000
  },
  'google/gemini-2.5-pro-experimental': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 2.5 Pro (Experimental)',
    description: 'Deprecated experimental model - use preview version instead',
    supportsImages: true,
    maxTokens: 1050000
  },

  // Gemini 2.0 Series
  'google/gemini-2.0-flash-lite': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 2.0 Flash Lite',
    description: 'Significantly faster time to first token with quality on par with larger models',
    supportsImages: false,
    maxTokens: 1050000
  },
  'google/gemini-2.0-flash': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 2.0 Flash',
    description: 'Faster time to first token with enhanced multimodal understanding and coding capabilities',
    supportsImages: true,
    maxTokens: 1000000
  },

  // Gemma Series
  'google/gemma-3n-4b': {
    provider: 'openrouter' as const,
    name: 'Google Gemma 3n 4B',
    description: 'Optimized for mobile and low-resource devices with multimodal support',
    supportsImages: true,
    maxTokens: 32000
  },
  'google/gemma-1-2b': {
    provider: 'openrouter' as const,
    name: 'Google Gemma 1 2B',
    description: 'Open model built from the same research and technology used to create Gemini models',
    supportsImages: false,
    maxTokens: 8000
  },
  'google/gemma-3-1b': {
    provider: 'openrouter' as const,
    name: 'Google Gemma 3 1B',
    description: 'Smallest of the new Gemma 3 family with improved math and reasoning capabilities',
    supportsImages: false,
    maxTokens: 32000
  },
  'google/gemma-3-4b': {
    provider: 'openrouter' as const,
    name: 'Google Gemma 3 4B',
    description: 'Multimodal model with vision-language input and text outputs',
    supportsImages: true,
    maxTokens: 131000
  },
  'google/gemma-3-12b': {
    provider: 'openrouter' as const,
    name: 'Google Gemma 3 12B',
    description: 'Multimodal model with vision-language input and text outputs',
    supportsImages: true,
    maxTokens: 131000
  },
  'google/gemma-3-27b': {
    provider: 'openrouter' as const,
    name: 'Google Gemma 3 27B',
    description: 'Latest open source model, successor to Gemma 2 with multimodal capabilities',
    supportsImages: true,
    maxTokens: 131000
  },

  // Gemini 1.5 Series
  'google/gemini-1.5-flash-8b': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 1.5 Flash 8B',
    description: 'Optimized for speed and efficiency with enhanced performance in small prompt tasks',
    supportsImages: true,
    maxTokens: 1000000
  },
  'google/gemini-1.5-pro': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 1.5 Pro',
    description: 'Google Pro model with vision capabilities',
    supportsImages: true,
    maxTokens: 1000000
  },
  'google/gemini-1.5-flash': {
    provider: 'openrouter' as const,
    name: 'Google Gemini 1.5 Flash',
    description: 'Fast Google model with vision capabilities',
    supportsImages: true,
    maxTokens: 1000000
  },

  // Direct Gemini Models (with rate limits)
  'gemini-2.5-pro': {
    provider: 'gemini' as const,
    name: 'Gemini 2.5 Pro (Direct)',
    description: 'Direct Google Gemini API - 5 RPM, 250k TPM, 100 RPD (Very limited daily quota)',
    supportsImages: true,
    maxTokens: 8000
  },
  'gemini-2.5-flash': {
    provider: 'gemini' as const,
    name: 'Gemini 2.5 Flash (Direct)',
    description: 'Direct Google Gemini API - 10 RPM, 250k TPM, 250 RPD (2.5× more requests per day than Pro)',
    supportsImages: true,
    maxTokens: 8000
  },
  'gemini-2.5-flash-preview': {
    provider: 'gemini' as const,
    name: 'Gemini 2.5 Flash Preview (Direct)',
    description: 'Direct Google Gemini API - 10 RPM, 250k TPM, 250 RPD (Same as above)',
    supportsImages: true,
    maxTokens: 8000
  },
  'gemini-2.5-flash-lite': {
    provider: 'gemini' as const,
    name: 'Gemini 2.5 Flash-Lite (Direct)',
    description: 'Direct Google Gemini API - 15 RPM, 250k TPM, 1,000 RPD (Best daily quota in 2.5 series)',
    supportsImages: true,
    maxTokens: 8000
  },
  'gemini-2.5-flash-lite-preview': {
    provider: 'gemini' as const,
    name: 'Gemini 2.5 Flash-Lite Preview (Direct)',
    description: 'Direct Google Gemini API - 15 RPM, 250k TPM, 1,000 RPD (Same as above)',
    supportsImages: true,
    maxTokens: 8000
  },
  'gemini-2.0-flash': {
    provider: 'gemini' as const,
    name: 'Gemini 2.0 Flash (Direct)',
    description: 'Direct Google Gemini API - 15 RPM, 1M TPM, 200 RPD (Higher TPM but low RPD)',
    supportsImages: true,
    maxTokens: 8000
  },
  'gemini-2.0-flash-lite': {
    provider: 'gemini' as const,
    name: 'Gemini 2.0 Flash-Lite (Direct)',
    description: 'Direct Google Gemini API - 30 RPM, 1M TPM, 200 RPD (Highest RPM but low RPD)',
    supportsImages: true,
    maxTokens: 8000
  },
  'gemini-1.5-flash-latest': {
    provider: 'gemini' as const,
    name: 'Gemini 1.5 Flash Latest (Direct)',
    description: 'Direct Google Gemini API (Legacy)',
    supportsImages: true,
    maxTokens: 4000
  },
  // Working free model on OpenRouter (NVIDIA provider — not rate limited)
  'nvidia/nemotron-3-super-120b-a12b:free': {
    provider: 'openrouter' as const,
    name: 'NVIDIA Nemotron 3 Super 120B (Free)',
    description: 'Free NVIDIA model via OpenRouter — works reliably',
    supportsImages: false,
    maxTokens: 131072
  },
  // Current valid free models on OpenRouter (verified March 2026)
  'google/gemma-3-27b-it:free': {
    provider: 'openrouter' as const,
    name: 'Google Gemma 3 27B (Free)',
    description: 'Free Google Gemma 3 27B via OpenRouter',
    supportsImages: false,
    maxTokens: 131072
  },
  'google/gemma-3-12b-it:free': {
    provider: 'openrouter' as const,
    name: 'Google Gemma 3 12B (Free)',
    description: 'Free Google Gemma 3 12B via OpenRouter',
    supportsImages: false,
    maxTokens: 32768
  },
  'meta-llama/llama-3.3-70b-instruct:free': {
    provider: 'openrouter' as const,
    name: 'Meta Llama 3.3 70B (Free)',
    description: 'Free Meta Llama 3.3 70B via OpenRouter',
    supportsImages: false,
    maxTokens: 65536
  },
  'mistralai/mistral-small-3.1-24b-instruct:free': {
    provider: 'openrouter' as const,
    name: 'Mistral Small 3.1 24B (Free)',
    description: 'Free Mistral Small 3.1 24B via OpenRouter',
    supportsImages: false,
    maxTokens: 128000
  },
} as const;

export type AIModel = keyof typeof AVAILABLE_MODELS;

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string | Array<{
    type: 'text' | 'image_url';
    text?: string;
    image_url?: {
      url: string;
      detail?: 'low' | 'high' | 'auto';
    };
  }>;
}

export interface AIRequestOptions {
  model?: AIModel;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  responseFormat?: 'text' | 'json';
}

// ========================================
// 🎯 SINGLE CONFIGURATION POINT - CHANGE HERE TO SWITCH DEFAULT MODEL
// ========================================
export const DEFAULT_MODEL: AIModel = 'nvidia/nemotron-3-super-120b-a12b:free';

// Available options:
// 
// 🆓 FREE MODELS:
// 'deepseek/deepseek-r1:free' - Free reasoning model
// 'google/gemma-3n-2b' - Free multimodal model (8K context)
// 'google/gemini-2.0-flash-experimental' - Free experimental Gemini 2.0 Flash (1M context)
// 'google/gemini-1.5-flash-experimental' - Free experimental Gemini 1.5 Flash (1M context)
// 'google/gemini-experimental-1121' - Free experimental Gemini (41K context)
// 'google/gemini-experimental-1114' - Free experimental Gemini (41K context)
//
// 💎 PREMIUM MODELS - Gemini 2.5 Series:
// 'google/gemini-2.5-flash-preview-09-2025' - Latest 2.5 Flash Preview (1.05M context)
// 'google/gemini-2.5-flash-lite-preview-09-2025' - Latest 2.5 Flash Lite Preview (1.05M context)
// 'google/gemini-2.5-flash-image' - Image generation model "Nano Banana" (33K context)
// 'google/gemini-2.5-flash-lite' - Lightweight reasoning model (1.05M context)
// 'google/gemini-2.5-flash' - State-of-the-art workhorse model (1.05M context)
// 'google/gemini-2.5-pro' - Advanced reasoning, coding, mathematics (1.05M context)
//
// 🚀 Gemini 2.0 Series:
// 'google/gemini-2.0-flash-lite' - Fast time to first token (1.05M context)
// 'google/gemini-2.0-flash' - Enhanced multimodal understanding (1M context)
//
// 🧠 Gemma Series:
// 'google/gemma-3n-4b' - Mobile optimized multimodal (32K context)
// 'google/gemma-1-2b' - Open model (8K context)
// 'google/gemma-3-1b' - Smallest Gemma 3 (32K context)
// 'google/gemma-3-4b' - Multimodal Gemma 3 (131K context)
// 'google/gemma-3-12b' - Large multimodal Gemma 3 (131K context)
// 'google/gemma-3-27b' - Latest open source model (131K context)
//
// 📱 Gemini 1.5 Series:
// 'google/gemini-1.5-flash-8b' - Speed optimized (1M context)
// 'google/gemini-1.5-pro' - Pro model with vision (1M context)
// 'google/gemini-1.5-flash' - Fast model with vision (1M context)
//
// 🔧 Direct Google API (with rate limits):
// 'gemini-2.5-pro' - Direct API: 5 RPM, 250k TPM, 100 RPD (Very limited daily quota)
// 'gemini-2.5-flash' - Direct API: 10 RPM, 250k TPM, 250 RPD (2.5× more requests per day than Pro)
// 'gemini-2.5-flash-preview' - Direct API: 10 RPM, 250k TPM, 250 RPD (Same as above)
// 'gemini-2.5-flash-lite' - Direct API: 15 RPM, 250k TPM, 1,000 RPD (Best daily quota in 2.5 series)
// 'gemini-2.5-flash-lite-preview' - Direct API: 15 RPM, 250k TPM, 1,000 RPD (Same as above)
// 'gemini-2.0-flash' - Direct API: 15 RPM, 1M TPM, 200 RPD (Higher TPM but low RPD)
// 'gemini-2.0-flash-lite' - Direct API: 30 RPM, 1M TPM, 200 RPD (Highest RPM but low RPD) ⭐ CURRENT DEFAULT
// 'gemini-1.5-flash-latest' - Direct API (Legacy)
// ========================================

// Helper function to get model configuration
export const getModelConfig = (model: AIModel = DEFAULT_MODEL) => {
  return AVAILABLE_MODELS[model];
};

// Helper function to get available models
export const getAvailableModels = () => {
  return Object.entries(AVAILABLE_MODELS).map(([key, config]) => ({
    id: key,
    ...config
  }));
};

// Helper function to get fallback models (for debugging)
export const getFallbackModelsList = (): AIModel[] => {
  return getFallbackModels();
};

export interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * Gets the OpenRouter API key from environment variables
 * @returns The API key or throws an error if not found
 */
export const getOpenRouterApiKey = (): string => {
  const envKey = (import.meta.env.VITE_OPENROUTER_API_KEY || '').replace(/^["'\s]+|["'\s]+$/g, '');
  if (envKey && envKey.length > 10) return envKey;
  return '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';
};

/**
 * Gets the Gemini API key from environment variables
 * @returns The API key or throws an error if not found
 */
export const getGeminiApiKey = (): string => {
  const envKey = (import.meta.env.VITE_GEMINI_API_KEY || '').replace(/^["'\s]+|["'\s]+$/g, '');
  if (envKey && envKey.length > 10) return envKey;
  return 'AIzaSyA3p_d9nAMq1AjR4aL98nO5GtuJy_2WSfE';
};

/**
 * Builds the complete Gemini API URL with the provided API key
 * @param apiKey - The Gemini API key
 * @param model - Optional model override (defaults to gemini-2.0-flash)
 * @returns Complete API URL with key
 */
export const buildGeminiApiUrl = (apiKey: string, model?: string): string => {
  const baseUrl = import.meta.env.VITE_GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=';
  
  // If a different model is specified, replace it in the URL
  if (model && baseUrl.includes('gemini-2.0-flash')) {
    const urlWithModel = baseUrl.replace('gemini-2.0-flash', model);
    return urlWithModel.endsWith('?key=') ? `${urlWithModel}${apiKey}` : `${urlWithModel}${apiKey}`;
  }
  
  return baseUrl.endsWith('?key=') ? `${baseUrl}${apiKey}` : `${baseUrl}${apiKey}`;
};

/**
 * Fallback chain — NVIDIA provider works, others rate-limited
 */
const getFallbackModels = (): AIModel[] => {
  return [
    'nvidia/nemotron-3-super-120b-a12b:free', // NVIDIA provider — confirmed working
    'gemini-2.5-flash-lite',                  // direct Gemini fallback
    'gemini-2.0-flash',                       // direct Gemini fallback
  ];
};

/**
 * Centralized AI fetch function with automatic fallback system
 * Tries models in order: Direct Google first, then OpenRouter
 * @param messages - Array of messages to send to the AI
 * @param options - Configuration options
 * @returns Promise with AI response
 */
export const fetchAI = async (messages: AIMessage[], options: AIRequestOptions = {}): Promise<AIResponse> => {
  const {
    model = DEFAULT_MODEL,
    temperature = 0.7,
    maxTokens = 512,  // safe minimum for OpenRouter
    systemPrompt,
    responseFormat = 'text'
  } = options;

  // Get fallback models starting with the requested model
  const fallbackModels = getFallbackModels();
  const startIndex = fallbackModels.indexOf(model);
  const modelsToTry = startIndex >= 0 
    ? [model, ...fallbackModels.slice(startIndex + 1)]
    : [model, ...fallbackModels];

  let lastError: Error | null = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    const currentModel = modelsToTry[i];
    
    try {
      console.log(`🤖 Trying AI model: ${currentModel} (attempt ${i + 1}/${modelsToTry.length})`);
      
      const modelConfig = getModelConfig(currentModel);
      const finalMaxTokens = Math.min(Math.max(maxTokens, 512), 1000);

      let result: AIResponse;
      if (modelConfig.provider === 'gemini') {
        result = await fetchGemini(messages, { model: currentModel, temperature, maxTokens: finalMaxTokens, responseFormat, systemPrompt });
      } else {
        const finalMessages = systemPrompt
          ? [{ role: 'system' as const, content: systemPrompt }, ...messages]
          : messages;
        result = await fetchOpenRouter(finalMessages, { model: currentModel, temperature, maxTokens: finalMaxTokens, responseFormat });
      }
      console.log(`✅ Success with model: ${currentModel}`);
      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`❌ Model ${currentModel} failed (attempt ${i + 1}):`, lastError.message);
      if (i === modelsToTry.length - 1) break;
      // Small delay before trying next model
      await new Promise(r => setTimeout(r, 500));
      console.log(`🔄 Trying next model...`);
    }
  }

  // If we get here, all models failed
  console.error(`💥 All ${modelsToTry.length} models failed. Last error:`, lastError?.message);
  throw new Error(`All AI models failed. Last error: ${lastError?.message || 'Unknown error'}`);
};

/**
 * Fetch from OpenRouter API
 */
const fetchOpenRouter = async (messages: AIMessage[], options: { model: string; temperature: number; maxTokens: number; responseFormat: string }): Promise<AIResponse> => {
  const apiKey = getOpenRouterApiKey();

  // Sanitize messages — ensure content is always a plain string
  const cleanMessages = messages.map(m => ({
    role: m.role,
    content: typeof m.content === 'string'
      ? m.content
      : (m.content as any[]).map((p: any) => p.text || '').join(' ')
  }));

  const body: Record<string, unknown> = {
    model: options.model,
    messages: cleanMessages,
    temperature: options.temperature,
    max_tokens: options.maxTokens,
  };

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://kia-platform.app',
      'X-Title': 'KIA',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    console.error('OpenRouter error body:', errBody);
    throw new Error(`OpenRouter API error: ${response.status} - ${errBody?.error?.message || response.statusText}`);
  }

  const data = await response.json();

  if (!data.choices?.[0]?.message?.content) {
    throw new Error('Invalid response from OpenRouter');
  }

  return {
    content: data.choices[0].message.content,
    usage: data.usage ? {
      promptTokens: data.usage.prompt_tokens,
      completionTokens: data.usage.completion_tokens,
      totalTokens: data.usage.total_tokens
    } : undefined
  };
};

/**
 * Fetch from Gemini API (direct Google API)
 */
const fetchGemini = async (messages: AIMessage[], options: { model: string; temperature: number; maxTokens: number; responseFormat: string; systemPrompt?: string }): Promise<AIResponse> => {
  const apiKey = getGeminiApiKey();
  console.log('🔑 Gemini key (first 10 chars):', apiKey.substring(0, 10), '| length:', apiKey.length);
  
  const modelName = options.model;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
  console.log('🌐 Calling Gemini model:', modelName);

  // Convert messages to Gemini's contents format (supports multi-turn)
  const contents = messages
    .filter(msg => msg.role !== 'system')
    .map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: typeof msg.content === 'string'
        ? [{ text: msg.content }]
        : msg.content.map(part =>
            part.type === 'text' ? { text: part.text } : { text: `[Image: ${part.image_url?.url}]` }
          )
    }));

  if (contents.length === 0) {
    throw new Error('No messages found for Gemini API');
  }

  const body: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature: options.temperature,
      maxOutputTokens: options.maxTokens
    }
  };

  // Pass system prompt via systemInstruction (proper Gemini API way)
  if (options.systemPrompt) {
    body.systemInstruction = { parts: [{ text: options.systemPrompt }] };
  }

  if (options.responseFormat === 'json') {
    (body.generationConfig as Record<string, unknown>).responseMimeType = 'application/json';
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('❌ Gemini API error response:', errorData);
    throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();

  if (!data.candidates || data.candidates.length === 0) {
    throw new Error('No candidates returned from Gemini API');
  }

  const candidate = data.candidates[0];

  if (!candidate.content?.parts?.length) {
    throw new Error(`Gemini API returned empty content. Finish reason: ${candidate.finishReason || 'unknown'}`);
  }

  const textContent = candidate.content.parts[0]?.text;
  if (!textContent) {
    throw new Error(`Gemini API returned no text. Finish reason: ${candidate.finishReason || 'unknown'}`);
  }

  return {
    content: textContent,
    usage: data.usageMetadata ? {
      promptTokens: data.usageMetadata.promptTokenCount,
      completionTokens: data.usageMetadata.candidatesTokenCount || 0,
      totalTokens: data.usageMetadata.totalTokenCount
    } : undefined
  };
};
