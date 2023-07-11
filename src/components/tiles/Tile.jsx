import "./Tile.css";
import React from "react";

function Tile({ number, image, xindex, yindex, highlight }) {
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

  // console.log(highlight);
  return (
    <div className={className}>
      {image && <div style={{ backgroundImage: `url(${image})` }} className="chess-piece"></div>}
    </div>
  );
}
export default Tile;
