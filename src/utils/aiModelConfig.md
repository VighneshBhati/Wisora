# AI Model Configuration

## 🎯 Single Configuration Point

To change the AI model used throughout the entire application, simply edit **ONE LINE** in `src/utils/geminiConfig.ts`:

```typescript
// Line 88 in geminiConfig.ts
export const DEFAULT_MODEL: AIModel = 'google/gemini-2.5-pro'; // 👈 CHANGE THIS
```

## Available Models

### 🆓 Free Models
- `'deepseek/deepseek-r1:free'` - Free reasoning model with excellent performance
- `'google/gemma-3n-2b'` - Free multimodal model optimized for low-resource deployment (8K context)
- `'google/gemini-2.0-flash-experimental'` - Free experimental Gemini 2.0 Flash (1M context)
- `'google/gemini-1.5-flash-experimental'` - Free experimental Gemini 1.5 Flash (1M context)
- `'google/gemini-experimental-1121'` - Free experimental Gemini from November 21st, 2024 (41K context)
- `'google/gemini-experimental-1114'` - Free experimental Gemini with quality improvements (41K context)

### 💎 Premium Models - Gemini 2.5 Series
- `'google/gemini-2.5-flash-preview-09-2025'` - Latest 2.5 Flash Preview with advanced reasoning (1.05M context)
- `'google/gemini-2.5-flash-lite-preview-09-2025'` - Latest 2.5 Flash Lite Preview optimized for ultra-low latency (1.05M context)
- `'google/gemini-2.5-flash-image'` - Image generation model "Nano Banana" with contextual understanding (33K context)
- `'google/gemini-2.5-flash-lite'` - Lightweight reasoning model optimized for cost efficiency (1.05M context)
- `'google/gemini-2.5-flash'` - State-of-the-art workhorse model with thinking capabilities (1.05M context)
- `'google/gemini-2.5-pro'` - Advanced reasoning, coding, mathematics, and scientific tasks (1.05M context)

### 🚀 Gemini 2.0 Series
- `'google/gemini-2.0-flash-lite'` - Significantly faster time to first token (1.05M context)
- `'google/gemini-2.0-flash'` - Enhanced multimodal understanding and coding capabilities (1M context)

### 🧠 Gemma Series
- `'google/gemma-3n-4b'` - Optimized for mobile and low-resource devices with multimodal support (32K context)
- `'google/gemma-1-2b'` - Open model built from Gemini research and technology (8K context)
- `'google/gemma-3-1b'` - Smallest of the new Gemma 3 family with improved math and reasoning (32K context)
- `'google/gemma-3-4b'` - Multimodal model with vision-language input and text outputs (131K context)
- `'google/gemma-3-12b'` - Large multimodal model with vision-language capabilities (131K context)
- `'google/gemma-3-27b'` - Latest open source model, successor to Gemma 2 (131K context)

### 📱 Gemini 1.5 Series
- `'google/gemini-1.5-flash-8b'` - Optimized for speed and efficiency in small prompt tasks (1M context)
- `'google/gemini-1.5-pro'` - Pro model with vision capabilities (1M context)
- `'google/gemini-1.5-flash'` - Fast model with vision capabilities (1M context)

### 🔧 Direct Google API (with rate limits)
- `'gemini-2.5-pro'` - Direct API: 5 RPM, 250k TPM, 100 RPD (Very limited daily quota)
- `'gemini-2.5-flash'` - Direct API: 10 RPM, 250k TPM, 250 RPD (2.5× more requests per day than Pro)
- `'gemini-2.5-flash-preview'` - Direct API: 10 RPM, 250k TPM, 250 RPD (Same as above)
- `'gemini-2.5-flash-lite'` - Direct API: 15 RPM, 250k TPM, 1,000 RPD (Best daily quota in 2.5 series)
- `'gemini-2.5-flash-lite-preview'` - Direct API: 15 RPM, 250k TPM, 1,000 RPD (Same as above)
- `'gemini-2.0-flash'` - Direct API: 15 RPM, 1M TPM, 200 RPD (Higher TPM but low RPD)
- `'gemini-2.0-flash-lite'` - Direct API: 30 RPM, 1M TPM, 200 RPD (Highest RPM but low RPD) ⭐ **CURRENT DEFAULT**
- `'gemini-1.5-flash-latest'` - Direct API (Legacy)

## Examples

### To use a free model:
```typescript
// Free reasoning model
export const DEFAULT_MODEL: AIModel = 'deepseek/deepseek-r1:free';

// Free experimental Gemini 2.0 Flash (1M context)
export const DEFAULT_MODEL: AIModel = 'google/gemini-2.0-flash-experimental';

// Free multimodal model
export const DEFAULT_MODEL: AIModel = 'google/gemma-3n-2b';
```

### To use the latest premium models:
```typescript
// Latest Gemini 2.5 Flash Preview (September 2025)
export const DEFAULT_MODEL: AIModel = 'google/gemini-2.5-flash-preview-09-2025';

// Latest Gemini 2.5 Pro
export const DEFAULT_MODEL: AIModel = 'google/gemini-2.5-pro';

// Image generation model "Nano Banana"
export const DEFAULT_MODEL: AIModel = 'google/gemini-2.5-flash-image';
```

### To use cost-effective models:
```typescript
// Lightweight reasoning model
export const DEFAULT_MODEL: AIModel = 'google/gemini-2.5-flash-lite';

// Fast time to first token
export const DEFAULT_MODEL: AIModel = 'google/gemini-2.0-flash-lite';

// Speed optimized
export const DEFAULT_MODEL: AIModel = 'google/gemini-1.5-flash-8b';
```

### To use direct Google API models:
```typescript
// Current default - Highest RPM (30 RPM, 1M TPM, 200 RPD)
export const DEFAULT_MODEL: AIModel = 'gemini-2.0-flash-lite';

// Best daily quota in 2.5 series (15 RPM, 250k TPM, 1,000 RPD)
export const DEFAULT_MODEL: AIModel = 'gemini-2.5-flash-lite';

// Higher TPM but low RPD (15 RPM, 1M TPM, 200 RPD)
export const DEFAULT_MODEL: AIModel = 'gemini-2.0-flash';

// Premium model with limited quota (5 RPM, 250k TPM, 100 RPD)
export const DEFAULT_MODEL: AIModel = 'gemini-2.5-pro';
```

## How It Works

1. **Single Source of Truth**: All AI calls use the `DEFAULT_MODEL` from `geminiConfig.ts`
2. **No Code Changes Needed**: Change the model in one place, and it applies everywhere
3. **Automatic Provider Selection**: The system automatically uses OpenRouter or direct Gemini API based on the model
4. **Image Support**: Vision models automatically support image inputs

## Files That Use This Configuration

- `src/utils/geminiApi.ts` - Quiz generation and answering
- `src/utils/geminiTitleGenerator.ts` - Question title generation
- `src/components/chatbot/ChatbotSidebar.tsx` - AI chatbot
- `src/components/chatbot/CourseResolver.ts` - Entity extraction
- `src/components/quizzes/ImageQuestionExtractor.tsx` - Image question extraction
- `src/hooks/usePdfAi.ts` - PDF AI processing
- `src/pages/TeacherLanding.tsx` - AI insights

All these files automatically use whatever model you set as `DEFAULT_MODEL`!
