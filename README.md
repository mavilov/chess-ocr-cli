# chess-ocr-cli

A command-line tool that converts chess game protocols from images, for example taken by phone, to PGN format for further analysis. The conversion is done using AI vision services. Currently, only the OpenAI API is fully supported.

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

- `-i, --input <path>`: Path to the input image file (required)
- `-o, --output <path>`: Path to save the output PGN file (required)
- `-m, --mode <mode>`: API mode to use (default: "openai"). Supported modes: "openai" (Gemini support coming soon).
- `-V, --version`: Output the version number
- `-h, --help`: Display help for command

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

- OpenAI Vision API for image analysis
- PGN format output
- Handwritten chess game protocols

Coming soon:

- Google Gemini Vision API support
- Additional output formats
- Batch processing

## Mobile App

A React Native / Expo mobile app that lets you photograph handwritten chess scoresheets with your phone and convert them to PGN files.

### Features

- 📷 Take a photo or pick from gallery
- 🤖 AI-powered handwriting recognition via OpenAI Vision
- 📋 Copy PGN to clipboard
- 📤 Share PGN files via email, AirDrop, WhatsApp, etc.
- 🔑 API key stored securely on device

### Prerequisites

- Node.js (LTS)
- [Expo Go](https://expo.dev/go) app installed on your phone (available on App Store and Google Play)

### Setup

```bash
cd src/mobile
npm install
```

### Running Locally

```bash
cd src/mobile
npx expo start
```

Scan the QR code in the terminal with your phone:

- **iPhone**: Use the Camera app → tap the link to open in Expo Go
- **Android**: Open Expo Go → scan the QR code

> ⚠️ Your phone and computer must be on the same Wi-Fi network.

### Testing Over the Internet (No Same Wi-Fi Needed)

Use tunnel mode to share with anyone, anywhere:

```bash
npx expo start --tunnel
```

Send the QR code or the `exp://` URL to the other person. They scan it with Expo Go.

### Building a Standalone APK (Android)

To build an installable `.apk` you can share directly:

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

Add this to `src/mobile/eas.json` first:

```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    }
  }
}
```

When the build completes, you'll get a download link to share.

### First-Time Usage

1. Open the app → tap the ⚙️ gear icon to go to Settings
2. Enter your OpenAI API key and tap **Save**
3. Go back to the home screen
4. Tap **Take Photo** or **Pick from Gallery**
5. The AI will analyze the scoresheet and return PGN
6. Use **Copy** or **Share** to export the result
