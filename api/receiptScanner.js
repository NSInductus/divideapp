import { RECEIPT_EXTRACTION_PROMPT } from "../prompts/receiptExtraction.js";

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["items", "receiptTotal", "currency", "confidence"],
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "price"],
        properties: {
          name: { type: "string" },
          price: { type: "number", minimum: 0 }
        }
      }
    },
    receiptTotal: { type: ["number", "null"], minimum: 0 },
    currency: { type: "string" },
    confidence: { type: "number", minimum: 0, maximum: 1 }
  }
};

function parseImageDataUrl(image) {
  const match = image.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  return match ? { mime_type: match[1], data: match[2] } : null;
}

export async function scanReceiptWithGemini(image, apiKey, model = "gemini-3-flash-preview") {
  const parsedImage = parseImageDataUrl(image ?? "");
  if (!parsedImage) throw new Error("Envía una imagen válida del ticket.");
  if (!apiKey) throw new Error("Falta configurar GEMINI_API_KEY en el servidor.");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: RECEIPT_EXTRACTION_PROMPT }] },
        contents: [{
          role: "user",
          parts: [
            { text: "Extrae los platos y precios de este ticket." },
            { inline_data: parsedImage }
          ]
        }],
        generationConfig: {
          responseMimeType: "application/json",
          responseJsonSchema: schema
        }
      })
    }
  );

  const payload = await response.json();
  if (!response.ok) {
    console.error("Gemini receipt scan error", payload);
    throw new Error("No se pudo analizar el ticket. Prueba con una foto más nítida.");
  }

  const output = payload.candidates?.[0]?.content?.parts
    ?.map(part => part.text || "")
    .join("");
  if (!output) throw new Error("Gemini no devolvió contenido.");
  return JSON.parse(output);
}
