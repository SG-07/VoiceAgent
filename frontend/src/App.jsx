import Signup from "./components/auth/signup";
import "./App.css";

function App() {
  return <Signup onSubmit={(values) => console.log("Signup submitted", values)} />;
}

export default App;
