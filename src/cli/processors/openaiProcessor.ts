import OpenAI from "openai";
import { ImageProcessorStrategy } from "../types.ts";

export class OpenAIProcessor implements ImageProcessorStrategy {
  private readonly client: OpenAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error(
        "OPENAI_API_KEY environment variable is not set. Make sure you have created a .env file with your API key.",
      );
    }
    this.client = new OpenAI({ apiKey });
  }

  async processImage(imageBuffer: Buffer): Promise<string> {
    try {
      // Convert the image to base64
      const base64Image = imageBuffer.toString("base64");

      const response = await this.client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "This is a handwritten chess game protocol. Please analyze it and convert it to PGN format that is embedded into markdown. Include all moves, results, and any metadata if visible (player names, date, event, etc.). If you see any ambiguous or unclear moves, please make your best guess and add a comment. The pgn section in the markdown must be a valid PGN.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
      });

      return (
        response.choices[0]?.message?.content ??
        "By some reason, the OpenAI API did not return a valid response. Please try again later or check your API key."
      );
    } catch (error) {
      throw new Error(
        `OpenAI API error: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}
