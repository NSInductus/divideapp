import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function AddItemForm() {
  const { items, setItems } = useApp();
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");

  const add = () => {
    if (!itemName.trim() || !price) return;

    setItems([
      ...items,
      {
        name: itemName.trim(),
        price: parseFloat(price),
        parts: {}   // 👈 importante
      }
    ]);

    setItemName("");
    setPrice("");
  };

  return (
    <div className="row">
      <input
        className="input"
        value={itemName}
        onChange={e => setItemName(e.target.value)}
        placeholder="Nombre del plato"
      />

      <input
        className="input price"
        value={price}
        type="number"
        onChange={e => setPrice(e.target.value)}
        placeholder="€"
      />

      <button className="btn primary" onClick={add}>
        Añadir
      </button>
    </div>
  );
}
