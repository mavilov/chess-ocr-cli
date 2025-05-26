# chess-ocr-cli

A command-line tool that converts chess game protocols from images to PGN format using AI vision services.

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Copy the template.env file to .env and fill in your API keys:

```bash
cp template.env .env
```

4. Build the project:

```bash
npm run build
```

5. Link the CLI tool globally (optional):

```bash
npm link
```

## Usage

```bash
chess-ocr-cli --input <image-file> --output <pgn-file> [--mode <api-mode>]
```

### Options

-   `-i, --input <path>`: Path to the input image file (required)
-   `-o, --output <path>`: Path to save the output PGN file (required)
-   `-m, --mode <mode>`: API mode to use (default: "openai"). Supported modes: "openai" (Gemini support coming soon).
-   `-V, --version`: Output the version number
-   `-h, --help`: Display help for command

### Example

```bash
chess-ocr-cli --input game1.jpg --output game1.pgn --mode openai
```

## Environment Variables

To use this tool, you'll need an OpenAI API key:

1. Go to https://platform.openai.com/api-keys
2. Sign in or create an OpenAI account
3. Click "Create new secret key"
4. Copy the generated API key (make sure to save it as it won't be shown again)

Then create a `.env` file in the root directory with the following variables:

```
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here  # For future use
```

⚠️ Note: The OpenAI Vision API is not free. You will be charged based on the number of images processed. Check OpenAI's pricing page for current rates: https://openai.com/pricing

## Support

Currently supports:

-   OpenAI Vision API for image analysis
-   PGN format output
-   Handwritten chess game protocols

Coming soon:

-   Google Gemini Vision API support
-   Additional output formats
-   Batch processing
