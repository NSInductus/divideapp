import { useState, useRef } from "react";
import ParticipantsSelector from "./ParticipantsSelector";
import EditPartsModal from "./EditPartsModal";
import { useApp } from "../../context/AppContext";

export default function ItemCard({ item, index }) {
  const { items, setItems } = useApp();
  const [showModal, setShowModal] = useState(false);
  const pressTimer = useRef(null);

  const handlePressStart = () => {
    pressTimer.current = setTimeout(() => {
      const copy = [...items];
      const currentItem = copy[index];

      // 🔥 SOLO la primera vez
      if (!currentItem.hasCustomParts) {
        const initialParts = {};

        // Si estaba activo (verde) → 1
        Object.entries(currentItem.parts || {}).forEach(
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
