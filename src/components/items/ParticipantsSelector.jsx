import { useApp } from "../../context/AppContext";

export default function ParticipantsSelector({ itemIndex }) {
  const { people, items, setItems } = useApp();
  const item = items[itemIndex];

  if (!item || !item.parts) {
    return null;
  }

  const toggle = (personId) => {
    const copy = [...items];
    const currentParts = { ...copy[itemIndex].parts };

    if (currentParts[personId]) {
      delete currentParts[personId];
    } else {
      currentParts[personId] = 1;
    }

    copy[itemIndex].parts = currentParts;
    setItems(copy);
  };

  const selectAll = () => {
    const copy = [...items];
    const newParts = {};

    people.forEach(p => {
      newParts[p.id] = 1;
    });

    copy[itemIndex].parts = newParts;
    setItems(copy);
  };

  return (
    <div className="participants">
      <button className="btn small" onClick={selectAll}>
        Todos
      </button>

      {people.map(p => (
        <button
          key={p.id}
          onClick={() => toggle(p.id)}
          className={
            "participant-btn" +
            (item.parts[p.id] > 0 ? " active" : "") +
            (item.parts[p.id] > 1 ? " multi" : "")
          }
        >
          <img src={p.avatar} className="avatar-small" />
          {p.name}
        </button>
      ))}
    </div>
  );
}
