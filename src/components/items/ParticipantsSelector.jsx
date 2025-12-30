import { useApp } from "../../context/AppContext";

export default function ParticipantsSelector({ itemIndex }) {
  const { people, items, setItems } = useApp();
  const item = items[itemIndex];

  const toggle = (personId) => {
    const copy = [...items];

    if (copy[itemIndex].people.includes(personId)) {
      copy[itemIndex].people = copy[itemIndex].people.filter(p => p !== personId);
    } else {
      copy[itemIndex].people.push(personId);
    }

    setItems(copy);
  };

  const selectAll = () => {
    const copy = [...items];
    copy[itemIndex].people = people.map(p => p.id);
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
            (item.people.includes(p.id) ? " active" : "")
          }
        >
          <img src={p.avatar} className="avatar-small" />
          {p.name}
        </button>
      ))}
    </div>
  );
}
