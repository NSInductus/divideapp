import { useRef, useState } from "react";
import { fileToDataUrl, scanReceipt } from "../../services/receiptScanner";

const emptyItem = () => ({ name: "", price: "" });

export default function ReceiptImport({ onImport }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [editableItems, setEditableItems] = useState([]);

  const selectFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Elige una imagen del ticket.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("La foto pesa más de 10 MB. Haz una foto con menor resolución.");
      return;
    }

    setError("");
    setResult(null);
    try {
      const image = await fileToDataUrl(file);
      setPreview(image);
      setScanning(true);
      const data = await scanReceipt(image);
      setResult(data);
      setEditableItems(data.items.map(item => ({ name: item.name, price: String(item.price) })));
    } catch (scanError) {
      setError(scanError.message);
    } finally {
      setScanning(false);
    }
  };

  const updateItem = (index, field, value) => {
    setEditableItems(items => items.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const importItems = () => {
    const items = editableItems
      .map(item => ({ name: item.name.trim(), price: Number(item.price) }))
      .filter(item => item.name && Number.isFinite(item.price) && item.price >= 0);
    if (!items.length) {
      setError("Revisa que haya al menos un plato con nombre y precio.");
      return;
    }
    onImport(items);
    setResult(null);
    setPreview("");
    setEditableItems([]);
  };

  return (
    <section className="receipt-import" aria-labelledby="receipt-title">
      <div>
        <h2 id="receipt-title" className="subtitle">Añadir desde una foto</h2>
        <p className="receipt-copy">Fotografía o sube la cuenta. Revisarás los platos antes de añadirlos.</p>
      </div>
      <input
        ref={inputRef}
        className="visually-hidden"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={selectFile}
      />
      <button className="btn secondary" type="button" onClick={() => inputRef.current?.click()} disabled={scanning}>
        {scanning ? "Leyendo ticket…" : "Foto o galería"}
      </button>
      {preview && <img className="receipt-preview" src={preview} alt="Vista previa del ticket seleccionado" />}
      {error && <p className="form-error" role="alert">{error}</p>}

      {result && (
        <div className="receipt-review">
          <div className="receipt-review-header">
            <strong>Revisa la lectura</strong>
            {result.receiptTotal !== null && <span>Total detectado: {result.receiptTotal.toFixed(2)} €</span>}
          </div>
          {editableItems.map((item, index) => (
            <div className="receipt-item-row" key={index}>
              <input className="input" value={item.name} aria-label={`Nombre del plato ${index + 1}`} onChange={e => updateItem(index, "name", e.target.value)} />
              <input className="input price" type="number" min="0" step="0.01" value={item.price} aria-label={`Precio de ${item.name || `plato ${index + 1}`}`} onChange={e => updateItem(index, "price", e.target.value)} />
              <button className="item-remove inline-remove" type="button" aria-label={`Eliminar ${item.name || "plato"}`} onClick={() => setEditableItems(items => items.filter((_, i) => i !== index))}>×</button>
            </div>
          ))}
          <button className="btn small" type="button" onClick={() => setEditableItems(items => [...items, emptyItem()])}>Añadir línea</button>
          <button className="btn primary" type="button" onClick={importItems}>Añadir {editableItems.length} platos</button>
        </div>
      )}
    </section>
  );
}
