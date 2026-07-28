/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);
const STORAGE_KEY = "divideapp-state";

const readStoredState = () => {
  if (typeof window === "undefined") {
    return { people: [], items: [] };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { people: [], items: [] };
    }

    const parsed = JSON.parse(raw);
    return {
      people: Array.isArray(parsed?.people) ? parsed.people : [],
      items: Array.isArray(parsed?.items) ? parsed.items : []
    };
  } catch {
    return { people: [], items: [] };
  }
};

export function AppProvider({ children }) {
  const initialState = readStoredState();
  const [people, setPeople] = useState(initialState.people);
  const [items, setItems] = useState(initialState.items);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ people, items }));
  }, [people, items]);

  const reset = () => {
    setPeople([]);
    setItems([]);
    window.localStorage.removeItem(STORAGE_KEY);
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
