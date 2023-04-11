import "./styles.css";
import { TitleBox } from "./TitleBox";
import { LeadersListBox } from "./LeadersComponent/MappedLeadersBox";

export default function App() {
  return (
    <div className="App">
      <div className="app-container">
        <TitleBox />
        <LeadersListBox />
      </div>
    </div>
  );
}
