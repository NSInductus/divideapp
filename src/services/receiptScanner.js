export async function scanReceipt(image) {
  let response;
  try {
    response = await fetch("/api/scan-receipt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image })
    });
  } catch {
    throw new Error("No se pudo conectar con el servicio de lectura de tickets.");
  }

  const body = await response.text();
  let data = null;
  try {
    data = body ? JSON.parse(body) : null;
  } catch {
    // An error page from the deployment is not JSON. Show an actionable message below.
  }

  if (!response.ok) {
    throw new Error(
      data?.error || `El servicio de lectura no está disponible ahora (error ${response.status}).`
    );
  }
  if (!data) {
    throw new Error("El servicio devolvió una respuesta vacía. Revisa la configuración de Gemini en Vercel.");
  }
  return data;
}

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => resolve(reader.result);
      image.onload = () => {
        const maxDimension = 1800;
        const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.84));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
