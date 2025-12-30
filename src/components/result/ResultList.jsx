import { useApp } from "../../context/AppContext";
import { calculateTotals } from "../../utils/totals";

export default function ResultList() {
  const { people, items } = useApp();
  const totals = calculateTotals(people, items);

  return (
    <div className="result-list">
      {people.map(p => (
        <div key={p.id} className="result-row">
          <img
            src={p.avatar}
            className="avatar"
            alt={p.name}
          />
          <span className="result-name">{p.name}</span>
          <b>{totals[p.id].toFixed(2)}€</b>
        </div>
      ))}
    </div>
  );
}
