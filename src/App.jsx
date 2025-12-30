import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { AppProvider } from "./context/AppContext";
import "./styles/globals.css";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppProvider>
  );
}
