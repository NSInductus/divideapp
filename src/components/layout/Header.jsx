import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function Header({ title, back }) {
  const nav = useNavigate();
  const { reset } = useApp();

  return (
    <div className="header">
      {back && (
        <button className="btn small" onClick={() => nav(-1)}>
          ← Volver
        </button>
      )}

      <h2 className="header-title">{title}</h2>

      <button className="btn small danger" onClick={() => {
        reset();
        nav("/");
      }}>
        Nueva cuenta
      </button>
    </div>
  );
}
