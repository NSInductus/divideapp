import { useState, useRef } from "react";
import ParticipantsSelector from "./ParticipantsSelector";
import EditPartsModal from "./EditPartsModal";
import { useApp } from "../../context/AppContext";

export default function ItemCard({ item, index, onRemove }) {
  const { items, setItems } = useApp();
  const [showModal, setShowModal] = useState(false);
  const pressTimer = useRef(null);
  const pressStart = useRef({ x: 0, y: 0 });
  const pressMoved = useRef(false);

  const cancelPress = () => {
    pressTimer.current = setTimeout(() => {
      if (pressMoved.current) {
        return;
      }

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
    }, 1200);
  };

  const handlePressEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    pressMoved.current = false;
  };

  const handlePressStart = (event) => {
    pressMoved.current = false;
    if (event.touches?.[0]) {
      pressStart.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    }
    cancelPress();
  };

  const handlePressMove = (event) => {
    if (!event.touches?.[0] || pressMoved.current) return;

    const dx = Math.abs(event.touches[0].clientX - pressStart.current.x);
    const dy = Math.abs(event.touches[0].clientY - pressStart.current.y);
    if (dx > 10 || dy > 10) {
      pressMoved.current = true;
      handlePressEnd();
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
        onTouchMove={handlePressMove}
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
