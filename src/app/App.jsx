import "./App.css";
import { FormButton } from "../components";

function App() {
  return (
    <>
      <FormButton
        label="Register"
        handleClick={() => alert("Button Clicked!")}
      />
    </>
  );
}

export default App;
