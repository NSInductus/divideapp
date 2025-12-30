import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [people, setPeople] = useState([]);
  const [items, setItems] = useState([]);

  const reset = () => {
    setPeople([]);
    setItems([]);
  };

  return (
    <AppContext.Provider value={{ people, setPeople, items, setItems, reset }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
