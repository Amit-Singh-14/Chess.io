import React from "react";
import "./chessBoard.css";

const horixontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

function ChessBoard() {
  let board = [];
  verticalAxis
    .slice()
    .reverse()
    .forEach((x, xindex) => {
      horixontalAxis.forEach((y, yindex) => {
        const num = xindex + yindex;
        if (num & 1) {
          board.push(<span className="blacktile"></span>);
        } else {
          board.push(<span className="whitetile"></span>);
        }
      });
    });

  return <div className="chessboard">{board}</div>;
}

export default ChessBoard;
