export interface ImageProcessorStrategy {
  processImage(imageBuffer: Buffer): Promise<string>;
}
