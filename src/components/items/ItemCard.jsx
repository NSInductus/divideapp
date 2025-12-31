import { useState, useRef } from "react";
import ParticipantsSelector from "./ParticipantsSelector";
import EditPartsModal from "./EditPartsModal";
import { useApp } from "../../context/AppContext";

export default function ItemCard({ item, index, onRemove }) {
  const { items, setItems } = useApp();
  const [showModal, setShowModal] = useState(false);
  const pressTimer = useRef(null);

  const handlePressStart = () => {
    pressTimer.current = setTimeout(() => {
      const copy = [...items];
      const currentItem = copy[index];

      if (!currentItem.parts) {
        currentItem.parts = {};
      }

      if (!currentItem.hasCustomParts) {
        const initialParts = {};

        Object.entries(currentItem.parts).forEach(
          ([personId, value]) => {
            initialParts[personId] = value > 0 ? 1 : 0;
          }
        );

        currentItem.parts = initialParts;
        currentItem.hasCustomParts = true;
        setItems(copy);
      }

      setShowModal(true);
    }, 600);
  };

  const handlePressEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (window.confirm(`¿Eliminar "${item.name}"?`)) {
      onRemove(index);
    }
  };

  return (
    <>
      <div
        className="item-card"
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        {/* ❌ BOTÓN BORRAR */}
        <button className="item-remove" onClick={handleRemove}>
          ✕
        </button>

        <b>{item.name}</b> — {item.price}€

        <ParticipantsSelector itemIndex={index} />

        <div className="item-hint">
          Mantén pulsado para editar cantidades
        </div>
      </div>

      {showModal && (
        <EditPartsModal
          itemIndex={index}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
