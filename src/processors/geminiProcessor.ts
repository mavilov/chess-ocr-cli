import { ImageProcessorStrategy } from "../types";

export class GeminiProcessor implements ImageProcessorStrategy {
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }
  }

  async processImage(imageBuffer: Buffer): Promise<string> {
    // Note: This is a placeholder for Gemini implementation
    throw new Error(
      "Gemini Vision API support is not yet implemented. Please use --mode openai for now. Check back later for Gemini support.",
    );
  }
}
