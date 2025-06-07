#!/usr/bin/env node
import { Command } from "commander";
import { createProcessors, processImage } from "./imageProcessor.ts";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

const packageJson = fs.readFileSync("../package.json");
const { version } = JSON.parse(packageJson.toString());

dotenv.config();

const processors = createProcessors({
  openaiApiKey: process.env.OPENAI_API_KEY,
  // geminiApiKey: process.env.GEMINI_API_KEY,
});

const program = new Command();

program
  .name("chess-ocr-cli")
  .description(
    "Converts chess game protocols from images to PGN format using Open AI Vision API.",
  )
  .version(version)
  .requiredOption("-i, --input <path>", "Input image file path")
  .requiredOption(
    "-o, --output <path>",
    "Output Markdown file path with embedded PGN",
  )
  .option("-m, --mode <mode>", "API mode (openai, gemini (TODO))", "openai")
  .action(async (options) => {
    try {
      // Validate input file exists
      const inputPath = path.resolve(options.input);
      if (!fs.existsSync(inputPath)) {
        console.error(`Error: Input file '${options.input}' does not exist`);
        process.exit(1);
      }

      // Process the image
      const pgn = await processImage(inputPath, processors, options.mode);

      // Write output
      const outputPath = path.resolve(options.output);
      fs.writeFileSync(outputPath, pgn);
      console.log(
        `Successfully converted game to PGN inside the Markdown file: ${outputPath}`,
      );
    } catch (error) {
      console.error(
        "Error:",
        error instanceof Error ? error.message : String(error),
      );
      process.exit(1);
    }
  });

program.parse();
