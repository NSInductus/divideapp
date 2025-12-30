import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import PageContainer from "../../components/layout/PageContainer";
import ResultList from "../../components/result/ResultList";
import { useApp } from "../../context/AppContext";
import { calculateTotals } from "../../utils/totals";
import { copyToClipboard, sendWhatsApp } from "../../utils/share";

export default function Result() {
  const { people, items, reset } = useApp();
  const nav = useNavigate();

  if (!people.length) {
    nav("/");
    return null;
  }

  const totals = calculateTotals(people, items);

  const resultText = people
    .map(p => `${p.name}: ${totals[p.id].toFixed(2)}€`)
    .join("\n");

  const newAccount = () => {
    reset();
    nav("/");
  };

  return (
    <PageContainer>
      <Header title="Resultado final" back />

      <ResultList />

      <div className="row">
        <button className="btn" onClick={() => copyToClipboard(resultText)}>
          Copiar
        </button>

        <button className="btn" onClick={() => sendWhatsApp(resultText)}>
          WhatsApp
        </button>

        <button className="btn danger" onClick={newAccount}>
          Nueva cuenta
        </button>
      </div>
    </PageContainer>
  );
}
