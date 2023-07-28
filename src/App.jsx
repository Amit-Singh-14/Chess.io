import Referee from "./components/Ref/Referee";
import { useRef } from "react";
import "./app.css";
import Login from "./components/login/Login";
function App() {
  const disable = useRef(null);
  return (
    <div className="App">
      <div className="login">
        <Login disable={disable} />
      </div>
      <div className="disable" ref={disable}></div>
      <Referee />
    </div>
  );
}

export default App;
