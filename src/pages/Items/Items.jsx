import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import PageContainer from "../../components/layout/PageContainer";
import AddItemForm from "../../components/items/AddItemForm";
import ItemCard from "../../components/items/ItemCard";
import { useApp } from "../../context/AppContext";
import {
  calculateTotals,
  calculateItemsTotal,
  sumTotals
} from "../../utils/totals";

export default function Items() {
  const { people, items, setItems } = useApp();
  const nav = useNavigate();

  const totals = calculateTotals(people, items);

  const totalCuenta = calculateItemsTotal(items);
  const totalRepartido = sumTotals(totals);
  const difference = totalCuenta - totalRepartido;

  const canFinalize =
    items.length > 0 &&
    Math.abs(difference) < 0.01;

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <PageContainer>
      <Header title="Platos" back />

      <AddItemForm />

      {items.map((item, index) => (
        <ItemCard
          key={index}
          item={item}
          index={index}
          onRemove={removeItem}
        />
      ))}

      <h2 className="subtitle">Resultado provisional</h2>

      {people.map(p => (
        <div key={p.id}>
          {p.name}: <b>{totals[p.id].toFixed(2)}€</b>
        </div>
      ))}

      <div className="items-total-check">
        <div>Total cuenta: <b>{totalCuenta.toFixed(2)} €</b></div>
        <div>Total repartido: <b>{totalRepartido.toFixed(2)} €</b></div>

        {Math.abs(difference) >= 0.01 && (
          <div style={{ color: "#c0392b", marginTop: 6 }}>
            ⚠️ Faltan repartir {difference.toFixed(2)} €
          </div>
        )}
      </div>

      <button
        className="btn primary big"
        onClick={() => nav("/result")}
        disabled={!canFinalize}
      >
        Finalizar
      </button>
    </PageContainer>
  );
}
