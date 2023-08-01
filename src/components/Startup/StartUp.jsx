import "./startup.css";
function StartUp({ disable, setGameStart }) {
  function handleclick() {
    disable.current.classList.add("hidden");
    setGameStart(true);
  }

  function blurBackground() {
    document.querySelector(".App").classList.add("blur");
    setTimeout(() => {
      document.querySelector(".login")?.classList.remove("hidden");
    }, 500);
  }
  return (
    <div className="sidebar">
      <div className="heading">
        <h1>Chess.io</h1>
        <p className="play">Play chess online</p>
        <p className="multi">multiplayer game !!!!</p>
      </div>
      <button id="online" onClick={blurBackground}>
        play Online
      </button>
      <button id="offline" onClick={handleclick}>
        play offfline 1v1
      </button>
    </div>
  );
}

export default StartUp;
