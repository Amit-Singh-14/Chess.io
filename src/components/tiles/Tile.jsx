import "./Tile.css";
import React from "react";

function Tile({ number, image, highlight }) {
  // setting classname acording to the piece color
  const className = [
    "tile",
    number % 2 === 0 && "black-tile",
    number % 2 !== 0 && "white-tile",
    highlight && "tile-highlight",
    image && "chess-piece-tile",
  ]
    .filter(Boolean)
    .join(" ");

  const team = image?.includes("w_");
  // console.log(team);

  const imageclass = ["chess-piece", team ? "white" : "black"].filter(Boolean).join(" ");

  // console.log(highlight);
  return (
    <div className={className}>
      {image && <div style={{ backgroundImage: `url(${image})` }} className={imageclass}></div>}
    </div>
  );
}
export default Tile;
