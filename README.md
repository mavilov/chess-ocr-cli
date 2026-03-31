# Chess OCR

A tool that converts chess game protocols from images, for example taken by phone, to PGN format for further analysis. The conversion is done using AI vision services. Currently, only the OpenAI API is fully supported.

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Copy the template.env file to .env and fill in your API keys:

# chess-ocr-cli

This repository contains two related projects in the `src/` folder:

- `src/cli` — the command-line conversion utility that converts chess game protocols from images to PGN using AI vision services.
- `src/mobile` — a React Native / Expo mobile app that lets you photograph scoresheets and convert them to PGN on-device.

Choose the subproject you want to use and follow the instructions below.

## Repository layout

- [src/cli](src/cli/package.json): CLI tool (TypeScript)
- [src/mobile](src/mobile/package.json): Mobile Expo app
- `template.env`: Example environment variables (copy to each subproject as described below)

## CLI — Installation & Usage

1. Install dependencies for the CLI:

```bash
cd src/cli
npm install
```

2. Create a `.env` file for the CLI (copy from repository root):

```bash
cp ../../template.env .env
# then edit .env and set OPENAI_API_KEY
```

3. Run in development mode (uses `ts-node`):

```bash
npm run dev -- -i path/to/image.jpg -o out.md
```

4. Build and install the CLI globally (optional):

```bash
npm run build
npm link
# now you can run: chess-ocr-cli -i image.jpg -o out.md
```

Notes:

- The dev/start scripts run the TypeScript source directly with `ts-node`.
- The `build` script compiles to `dist/` and the package `bin` entry points to `dist/index.js`.

## Mobile — Installation & Usage

1. Install dependencies for the mobile app:

```bash
cd src/mobile
npm install
```

2. Start the Expo dev server:

```bash
npm start
# or use: npx expo start
```

Scan the QR code with Expo Go on your phone (or use tunnel mode with `npx expo start --tunnel`).

## Environment Variables

The repository includes `template.env` with example variables:

```
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here // TODO: reserved for next versions and currently not in use
```

Copy `template.env` into each subproject directory as `.env` and set the values before running the CLI or mobile app.

## Example CLI command

Run the CLI from `src/cli`:

```bash
cd src/cli
npm run dev -- -i ./sample/game1.jpg -o ./sample/game1.md
```

## Support & Roadmap

- Currently implemented: OpenAI Vision API integration for image analysis and PGN output.
- Planned: Gemini Vision integration, batch processing, and additional output formats.

If any instructions need adjustment for your environment, tell me which OS or toolchain you're using and I will update the README accordingly.

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
