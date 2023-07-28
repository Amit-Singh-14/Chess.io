import "./login.css";
function Login({ disable }) {
  function handleclick() {
    disable.current.classList.add("hidden");
  }
  return (
    <div className="sidebar">
      <div className="heading">
        <h1>Chess.io</h1>
        <p className="play">Play chess online</p>
        <p className="multi">multiplayer game !!!!</p>
      </div>
      <button id="online" onClick={handleclick}>
        play Online
      </button>
      <button id="offline">play offfline 1v1</button>
    </div>
  );
}

export default Login;
