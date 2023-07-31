import Referee from "./components/Ref/Referee";
import { useRef } from "react";
import "./app.css";
import StartUp from "./components/Startup/StartUp";
import Login from "./components/login/Login";
function App() {
  const disable = useRef(null);
  return (
    <>
      <Login />
      <div className="App">
        <div className="startup">
          <StartUp disable={disable} />
        </div>
        <div className="disable" ref={disable}></div>
        <Referee />
      </div>
    </>
  );
}

export default App;
