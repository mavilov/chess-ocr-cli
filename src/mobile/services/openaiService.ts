const OPENAI_CHAT_URL = "https://api.openai.com/v1/chat/completions";

const SYSTEM_PROMPT =
  "This is a handwritten chess game protocol. Analyze it and convert " +
  "it to PGN format that is embedded into markdown. Include all moves, " +
  "results, and any metadata if visible (player names, date, event, etc.). " +
  "If you see any ambiguous or unclear moves, make your best guess " +
  "and add a comment. The pgn section in the markdown must be a valid PGN.";

/**
 * Sends a base64-encoded image to the OpenAI Vision API and returns
 * the PGN result as a string.
 *
 * @param base64Image - The image encoded as a base64 string (no data-URI prefix).
 * @param apiKey - The user's OpenAI API key.
 * @returns The model's response containing the PGN.
 * @throws If the API call fails or returns an unexpected shape.
 */
export async function processImageWithOpenAI(
  base64Image: string,
  apiKey: string,
): Promise<string> {
  const response = await fetch(OPENAI_CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-5-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: SYSTEM_PROMPT },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error(
      "The OpenAI API did not return a valid response. " +
        "Please try again or check your API key.",
    );
  }

  return content;
}
