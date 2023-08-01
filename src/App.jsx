import Referee from "./components/Ref/Referee";
import { useRef, useState } from "react";
import "./app.css";
import StartUp from "./components/Startup/StartUp";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";

function App() {
  const disable = useRef(null);
  const [gameStart, setGameStart] = useState(false);
  const [toggle, setToggle] = useState(true);
  return (
    <>
      {!gameStart &&
        (toggle ? (
          <Login setToggle={setToggle} setGameStart={setGameStart} />
        ) : (
          <SignUp setGameStart={setGameStart} />
        ))}
      <div className="App">
        {!gameStart && (
          <div className="startup">
            {/* sidebar */}
            <StartUp disable={disable} setGameStart={setGameStart} />
          </div>
        )}
        <div className="disable" ref={disable}></div>
        <Referee gameStart={gameStart} />
      </div>
    </>
  );
}

export default App;
