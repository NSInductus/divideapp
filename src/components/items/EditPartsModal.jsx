import { useApp } from "../../context/AppContext";

export default function EditPartsModal({ itemIndex, onClose }) {
  const { people, items, setItems } = useApp();
  const item = items[itemIndex];

  const updatePart = (personId, delta) => {
    const copy = [...items];
    const current = copy[itemIndex].parts[personId] ?? 0;
    const next = Math.max(0, current + delta);

    copy[itemIndex].parts = {
      ...copy[itemIndex].parts,
      [personId]: next
    };

    setItems(copy);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>Reparto de {item.name}</h3>

        {people.map(p => (
          <div key={p.id} className="modal-row">
            <img src={p.avatar} className="avatar-small" />
            <span>{p.name}</span>

            <button onClick={() => updatePart(p.id, -1)}>−</button>
            <span className="part-value">
              {item.parts[p.id] ?? 0}
            </span>
            <button onClick={() => updatePart(p.id, 1)}>+</button>
          </div>
        ))}

        <button className="btn primary" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
