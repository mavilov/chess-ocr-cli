import fs from "fs";
import { ImageProcessorStrategy } from "./types";
import { OpenAIProcessor } from "./processors/openaiProcessor";
// TODO import { GeminiProcessor } from './processors/geminiProcessor';

interface ProcessorConfig {
  openaiApiKey?: string;
  // geminiApiKey?: string;
}

export function createProcessors(
  config: ProcessorConfig,
): Record<string, ImageProcessorStrategy> {
  return {
    openai: new OpenAIProcessor(config.openaiApiKey || ""),
    // gemini: new GeminiProcessor(),
  };
}

export async function processImage(
  imagePath: string,
  processors: Record<string, ImageProcessorStrategy>,
  mode: string = "openai",
): Promise<string> {
  const processor = processors[mode.toLowerCase()];
  if (!processor) {
    throw new Error(`Unsupported mode: ${mode}`);
  }

  const imageBuffer = fs.readFileSync(imagePath);
  return processor.processImage(imageBuffer);
}
