import { scanReceiptWithGemini } from "./receiptScanner.js";

/* global process */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const result = await scanReceiptWithGemini(
      req.body?.image,
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_MODEL
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error("Receipt scan error", error);
    const isConfigurationError = error.message.startsWith("Falta configurar");
    const isInvalidImage = error.message.startsWith("Envía una imagen");
    return res.status(isConfigurationError || isInvalidImage ? 400 : 502)
      .json({ error: error.message });
  }
}
