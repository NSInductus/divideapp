import { Routes, Route } from "react-router-dom";
import Welcome from "../pages/Welcome/Welcome";
import People from "../pages/People/People";
import Items from "../pages/Items/Items";
import Result from "../pages/Result/Result";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/people" element={<People />} />
      <Route path="/items" element={<Items />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}
