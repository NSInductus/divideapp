import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";

export default function Welcome() {
  const nav = useNavigate();
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handleInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    const handleInstalled = () => {
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  return (
    <PageContainer>
      <h1 className="title">DIVIDEAPP</h1>
      <h2 className="subtitle">Reparte la cuenta entre amigos 🍻</h2>

      <div className="welcome-actions">
        <button className="btn primary big" onClick={() => nav("/people")}>
          Comenzar
        </button>

        {installPrompt && (
          <button className="btn secondary big" type="button" onClick={installApp}>
            Instalar DivideApp
          </button>
        )}
      </div>
    </PageContainer>
  );
}
