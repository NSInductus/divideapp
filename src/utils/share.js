export async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
  alert("Resultado copiado 👍");
}

export function sendWhatsApp(text) {
  const message = encodeURIComponent("💸 Resultado de la cuenta:\n\n" + text);
  window.open(`https://wa.me/?text=${message}`);
}
