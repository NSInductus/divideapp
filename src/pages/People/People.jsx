import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import PageContainer from "../../components/layout/PageContainer";
import AddPersonForm from "../../components/people/AddPersonForm";
import PeopleList from "../../components/people/PeopleList";
import { useApp } from "../../context/AppContext";

export default function People() {
  const { people } = useApp();
  const nav = useNavigate();

  return (
    <PageContainer>
      <Header title="Comensales" />

      <AddPersonForm />
      <PeopleList />

      {people.length > 0 && (
        <button className="btn primary big" onClick={() => nav("/items")}>
          Comenzar cuenta
        </button>
      )}
    </PageContainer>
  );
}
