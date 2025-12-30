import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function AddPersonForm() {
  const { people, setPeople } = useApp();
  const [name, setName] = useState("");

  const add = () => {
    const value = name.trim();
    if (!value) return;

    const id = crypto.randomUUID();

    setPeople([
      ...people,
      {
        id,
        name: value,
        avatar: `https://robohash.org/${id}.png?set=set3`
      }
    ]);

    setName("");
  };

  return (
    <div className="row">
      <input
        className="input"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nombre"
      />
      <button className="btn primary" onClick={add}>
        Añadir
      </button>
    </div>
  );
}
