import React, { useRef, useState } from "react";
import "./chessBoard.css";
import Tile from "../tiles/Tile";
import { horixontalAxis, verticalAxis, samePosition } from "../../constant";

function ChessBoard({ playMove, pieces }) {
  const [grabPosition, setGrabPosition] = useState({ x: -1, y: -1 });
  const [activePiece, setActivePiece] = useState(null);

  const chessBoardRef = useRef(null);

  let board = [];

  function grabPiece(e) {
    // console.log(pieces);
    const chessboard = chessBoardRef.current;
    const element = e.target;

    if (element.classList.contains("chess-piece") && chessboard) {
      setGrabPosition({
        x: Math.floor((e.clientX - chessboard.offsetLeft) / 75),
        y: Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 600) / 75)),
      });

      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      setActivePiece(element);
    }
  }
  //movement of the piece
  function movePiece(e) {
    const chessBoard = chessBoardRef.current;
    if (activePiece && chessBoard) {
      // chess board board cordinates
      const minX = chessBoard.offsetLeft - 25;
      const minY = chessBoard.offsetTop - 25;
      const maxX = chessBoard.offsetLeft + 528;
      const maxY = chessBoard.offsetTop + 525;

      //mouse x and y postions
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";
      activePiece.style.left =
        x < minX ? (x > maxX ? `${maxX}px` : `${minX}px`) : x > maxX ? `${maxX}px` : `${x}px`;
      activePiece.style.top =
        y < minY ? (y > maxY ? `${maxY}px` : `${minY}px`) : y > maxY ? `${maxY}px` : `${y}px`;
    }
  }

  function dropPiece(e) {
    const chessboard = chessBoardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 75);
      const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 600) / 75));
      const currentPiece = pieces.find((p) => samePosition(p.position, grabPosition));

      if (currentPiece) {
        var success = playMove(currentPiece, { x, y });

        if (!success) {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("left");
          activePiece.style.removeProperty("top");
        }
      }
      setActivePiece(null);
    }
  }

  // inserting the pieces in correct order according to the cordinates in the board array to render
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horixontalAxis.length; i++) {
      const number = j + i + 2;
      const piece = pieces.find((p) => p.position.x === i && p.position.y === j);
      let image = piece ? piece.image : null;

      const currentPiece =
        activePiece != null
          ? pieces.find((p) => samePosition(p.position, grabPosition))
          : undefined;
      let highlight = currentPiece?.possibleMoves
        ? currentPiece.possibleMoves.some((p) => samePosition(p, { x: i, y: j }))
        : false;

      board.push(<Tile key={`${j},${i}`} image={image} number={number} highlight={highlight} />);
    }
  }
  return (
    <>
      <div
        onMouseMove={(e) => movePiece(e)}
        onMouseDown={(e) => grabPiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        id="chessboard"
        ref={chessBoardRef}
      >
        {board}
      </div>
    </>
  );
}

export default ChessBoard;
