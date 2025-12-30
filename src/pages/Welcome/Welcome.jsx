import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";

export default function Welcome() {
  const nav = useNavigate();

  return (
    <PageContainer>
      <h1 className="title">DIVIDEAPP</h1>
      <h2 className="subtitle">Reparte la cuenta entre amigos 🍻</h2>

      <button className="btn primary big" onClick={() => nav("/people")}>
        Comenzar
      </button>
    </PageContainer>
  );
}
