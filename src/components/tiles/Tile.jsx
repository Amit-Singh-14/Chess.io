import "./Tile.css";
import React from "react";

function Tile({ number, image, xindex, yindex }) {
  if (number & 1) {
    return (
      <div className="tile blacktile">
        <img src={image} />
      </div>
    );
  } else {
    return (
      <div className="tile whitetile">
        <img src={image} />
      </div>
    );
  }
}

export default Tile;
