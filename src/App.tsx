import "./App.css";
import AppWrapper from "./components/AppWrapper/AppWrapper";
import Button from "./components/Common/Button";
import { ButtonType, Size } from "./constants";

function App() {
  return (
    <div className="App">
      <Button size={Size.LARGE} variant={ButtonType.OUTLINED}>
        Check this out
      </Button>
      <AppWrapper />
    </div>
  );
}

export default App;
