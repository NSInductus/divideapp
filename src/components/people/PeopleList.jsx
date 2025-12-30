import { useApp } from "../../context/AppContext";

export default function PeopleList() {
  const { people } = useApp();

  return (
    <div className="people-list">
      {people.map(p => (
        <div key={p.id} className="person-chip">
          <img src={p.avatar} className="avatar" />
          {p.name}
        </div>
      ))}
    </div>
  );
}
