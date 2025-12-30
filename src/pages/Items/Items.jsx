import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import PageContainer from "../../components/layout/PageContainer";
import AddItemForm from "../../components/items/AddItemForm";
import ItemCard from "../../components/items/ItemCard";
import { useApp } from "../../context/AppContext";
import { calculateTotals } from "../../utils/totals";

export default function Items() {
  const { people, items } = useApp();
  const nav = useNavigate();

  const totals = calculateTotals(people, items);

  return (
    <PageContainer>
      <Header title="Platos" back />

      <AddItemForm />

      {items.map((it, i) => (
        <ItemCard key={i} item={it} index={i} />
      ))}

      <h2 className="subtitle">Resultado provisional</h2>

      {people.map(p => (
        <div key={p.id}>
          {p.name}: <b>{totals[p.id].toFixed(2)}€</b>
        </div>
      ))}

      <button className="btn primary big" onClick={() => nav("/result")}>
        Finalizar
      </button>
    </PageContainer>
  );
}
