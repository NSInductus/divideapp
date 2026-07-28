// Centralized prompt so it can be iterated on without touching the UI or API wiring.
export const RECEIPT_EXTRACTION_PROMPT = `
Analiza la imagen de una cuenta/ticket de restaurante y devuelve exclusivamente los
conceptos cobrados que se puedan repartir entre comensales. Los tickets pueden estar
borrosos, usar abreviaturas, tener varios idiomas, cantidades o no incluir un total.

Reglas importantes:
- Cada elemento de "items" representa una línea cobrable: nombre legible o la mejor
  reconstrucción posible y el precio total de esa línea en euros.
- Si una línea indica cantidad x precio, usa el importe total de la línea. Conserva la
  cantidad en el nombre solo cuando ayude a identificarla (por ejemplo, "2 x cerveza").
- Excluye cabeceras, dirección, fecha, número de ticket, IVA desglosado, métodos de pago,
  cambio, descuentos ya reflejados y líneas de TOTAL/SUBTOTAL/BASE imponible.
- Incluye servicio, propina o suplemento solo si aparece como un cargo independiente.
- Usa punto decimal en los precios. No inventes conceptos ni importes: omite lo ilegible.
- "receiptTotal" es el total final visible si lo hay; si no, null. "currency" será
  "EUR" salvo que el ticket indique claramente otra moneda. "confidence" refleja la
  fiabilidad global de la lectura (0 a 1).
- Devuelve los nombres aptos para mostrarlos a una persona, no códigos internos.
`;
