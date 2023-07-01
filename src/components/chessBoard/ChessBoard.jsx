import React, { useRef } from "react";
import "./chessBoard.css";
import Tile from "../tiles/Tile";

// chessboard axix
const horixontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

// all pieces location array
const pieces = [];

// inserting both white and black pawn at their postions
for (let j = 0; j < 8; j++) {
  pieces.push({ image: "assets/image/b_pawn.png", x: 1, y: j });
  pieces.push({ image: "assets/image/w_pawn.png", x: 6, y: j });
}

// inserting rest pf the pieces at their postions
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

// main function
function ChessBoard() {
  // chessBoard with all pieces toh render
  let board = [];
  // chessBoard referance for the movement ristriction of pieces outside the board
  const chessBoardRef = useRef(null);

  let activePiece = null;

  // when chess piece is clicked set the activepiece to the perticular piece
  function getPiece(e) {
    const element = e.target;
    if (element.classList.contains("chess-piece")) {
      activePiece = element;
    }
  }
  //movement of the piece
  function movePiece(e) {
    if (activePiece && chessBoardRef) {
      // chess board board cordinates
      const minX = parseInt(chessBoardRef.current.offsetLeft) - 25;
      const minY = parseInt(chessBoardRef.current.offsetTop) - 25;
      const maxX = parseInt(chessBoardRef.current.offsetLeft) + 528;
      const maxY = parseInt(chessBoardRef.current.offsetTop) + 525;

      //mouse x and y postions
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      activePiece.style.left =
        x < minX
          ? x > maxX
            ? `${maxX}px`
            : `${minX}px`
          : x > maxX
          ? `${maxX}px`
          : `${x}px`;

      activePiece.style.top =
        y < minY
          ? y > maxY
            ? `${maxY}px`
            : `${minY}px`
          : y > maxY
          ? `${maxY}px`
          : `${y}px`;
    }
  }

  // when moveup set the activepiece to null
  function dropPiece(e) {
    if (activePiece) {
      activePiece = null;
    }
  }

  // inserting the pieces in correct order according to the cordinates in the board array to render
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
          }
        });
        board.push(
          <Tile
            xindex={xindex}
            yindex={yindex}
            key={`${xindex}, ${yindex}`}
            number={num}
            image={image}
          />
        );
      });
    });

  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => getPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      className="chessboard"
      ref={chessBoardRef}
    >
      {board}
    </div>
  );
}

export default ChessBoard;
