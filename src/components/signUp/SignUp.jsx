import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import "./signup.css";
function SignUp({ setGameStart }) {
  const handleLogin = () => {
    document.querySelector(".App").classList.remove("blur");
    setGameStart(true);
  };

  return (
    <div className="sign">
      <div className="sign-form">
        <h1>Sign Up</h1>
        <form action="">
          <div className="email input">
            <BiUser fontSize={20} />
            <input type="email" placeholder="email address" />
          </div>
          <div className="user input">
            <BiUser fontSize={20} />
            <input type="text" placeholder="username" />
          </div>
          <div className="pass input">
            <RiLockPasswordLine fontSize={20} />
            <input type="text" placeholder="username" />
          </div>
          <button className="signup-into" onClick={handleLogin}>
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
