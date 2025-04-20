interface GeminiResponse {
  response: {
    text: () => string;
  };
}

interface GeminiOptions {
  prompt: string;
  max_output_tokens: number;
}

interface Gemini {
  generateText: (options: GeminiOptions) => Promise<GeminiResponse>;
}

declare global {
  interface Window {
    gemini?: Gemini;
  }
} 