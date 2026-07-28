import { useApp } from "../../context/AppContext";

export default function PeopleList() {
  const { people, setPeople, items, setItems } = useApp();

  const removePerson = (personId) => {
    setPeople(people.filter(person => person.id !== personId));
    setItems(items.map(item => {
      const { [personId]: _removedPart, ...remainingParts } = item.parts || {};
      return { ...item, parts: remainingParts };
    }));
  };

  return (
    <div className="people-list">
      {people.map(p => (
        <div key={p.id} className="person-chip">
          <img src={p.avatar} className="avatar" />
          {p.name}
          <button
            className="person-remove"
            type="button"
            aria-label={`Eliminar a ${p.name}`}
            title={`Eliminar a ${p.name}`}
            onClick={() => removePerson(p.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
