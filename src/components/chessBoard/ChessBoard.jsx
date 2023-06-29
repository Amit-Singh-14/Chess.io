import React from "react";
import "./chessBoard.css";
import Tile from "../tiles/Tile";

const horixontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

var i = 0;

const pieces = [];

for (let j = 0; j < 8; j++) {
  pieces.push({ image: "assets/image/b_pawn.png", x: 1, y: j });
  pieces.push({ image: "assets/image/w_pawn.png", x: 6, y: j });
}

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const x = p === 0 ? 0 : 7;
  pieces.push({ image: `assets/image/${type}_king.png`, x: x, y: 4 });
  pieces.push({ image: `assets/image/${type}_queen.png`, x: x, y: 3 });
  pieces.push({ image: `assets/image/${type}_knight.png`, x: x, y: 1 });
  pieces.push({ image: `assets/image/${type}_rook.png`, x: x, y: 0 });
  pieces.push({ image: `assets/image/${type}_bishop.png`, x: x, y: 2 });
  pieces.push({ image: `assets/image/${type}_knight.png`, x: x, y: 5 });
  pieces.push({ image: `assets/image/${type}_rook.png`, x: x, y: 7 });
  pieces.push({ image: `assets/image/${type}_bishop.png`, x: x, y: 6 });
}
function ChessBoard() {
  let board = [];
  verticalAxis
    .slice()
    .reverse()
    .forEach((x, xindex) => {
      horixontalAxis.forEach((y, yindex) => {
        const num = xindex + yindex;
        let image = null;

        pieces.forEach((p) => {
          if (p.x === xindex && p.y === yindex) {
            image = p.image;
            // console.log(image);
          }
        });
        board.push(
          <Tile xindex={xindex} yindex={yindex} number={num} image={image} />
        );
      });
    });

  return <div className="chessboard">{board}</div>;
}

export default ChessBoard;
