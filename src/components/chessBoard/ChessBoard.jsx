import React, { useRef, useState } from "react";
import "./chessBoard.css";
import Tile from "../tiles/Tile";
import Referee from "../referee/Referee";

// chessboard axix
const horixontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

const initialBoardState = [];

export const PieceType = {
  PAWN: 0,
  BISHOP: 1,
  KNIGHT: 2,
  ROOK: 3,
  QUEEN: 4,
  KING: 5,
};

export const TeamType = {
  OPPONENT: 0,
  OUR: 1,
};

for (let p = 0; p < 2; p++) {
  const teamType = p === 0 ? TeamType.OPPONENT : TeamType.OUR;
  const type = teamType === TeamType.OPPONENT ? "b" : "w";
  const y = teamType === TeamType.OPPONENT ? 7 : 0;

  initialBoardState.push({
    image: `assets/image/${type}_rook.png`,
    x: 0,
    y,
    type: PieceType.ROOK,
    team: teamType,
  });
  initialBoardState.push({
    image: `assets/image/${type}_rook.png`,
    x: 7,
    y,
    type: PieceType.ROOK,
    team: teamType,
  });
  initialBoardState.push({
    image: `assets/image/${type}_knight.png`,
    x: 1,
    y,
    type: PieceType.KNIGHT,
    team: teamType,
  });
  initialBoardState.push({
    image: `assets/image/${type}_knight.png`,
    x: 6,
    y,
    type: PieceType.KNIGHT,
    team: teamType,
  });
  initialBoardState.push({
    image: `assets/image/${type}_bishop.png`,
    x: 2,
    y,
    type: PieceType.BISHOP,
    team: teamType,
  });
  initialBoardState.push({
    image: `assets/image/${type}_bishop.png`,
    x: 5,
    y,
    type: PieceType.BISHOP,
    team: teamType,
  });
  initialBoardState.push({
    image: `assets/image/${type}_queen.png`,
    x: 3,
    y,
    type: PieceType.QUEEN,
    team: teamType,
  });
  initialBoardState.push({
    image: `assets/image/${type}_king.png`,
    x: 4,
    y,
    type: PieceType.KING,
    team: teamType,
  });
}

for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "assets/image/b_pawn.png",
    x: i,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
    enPassant: false,
  });
}
for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "assets/image/w_pawn.png",
    x: i,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
    enPassant: false,
  });
}

// main function
function ChessBoard() {
  const [pieces, setPieces] = useState(initialBoardState);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [activePiece, setActivePiece] = useState(null);
  const referee = new Referee();
  const chessBoardRef = useRef(null);

  // chessBoard with all pieces toh render
  let board = [];

  // when chess piece is clicked set the activepiece to the perticular piece
  function grabPiece(e) {
    const chessboard = chessBoardRef.current;
    const element = e.target;
    if (element.classList.contains("chess-piece") && chessboard) {
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 75));
      setGridY(
        Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 600) / 75))
      );
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
    const chessboard = chessBoardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 75);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 600) / 75)
      );
      // console.log(x, y);
      const currentPiece = pieces.find((p) => p.x === gridX && p.y === gridY);
      // const attackPiece = pieces.find((p) => p.x === y && p.y === x);

      if (currentPiece) {
        // console.log(currentPiece.type, currentPiece.team, currentPiece.image);
        const validMove = referee.isValidMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const isEnPassantMove = referee.isEnPassantMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        );
        const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;

        if (isEnPassantMove) {
          const updatePieces = pieces.reduce((result, piece) => {
            if (piece.x === gridX && piece.y === gridY) {
              piece.enPassant = false;
              piece.x = x;
              piece.y = y;
              result.push(piece);
            } else if (!(piece.x === x && piece.y === y - pawnDirection)) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              result.push(piece);
            }
            return result;
          }, []);

          setPieces(updatePieces);
        } else if (validMove) {
          const updatedPieces = pieces.reduce((result, piece) => {
            if (piece.x === gridX && piece.y === gridY) {
              if (Math.abs(gridY - y) === 2 && piece.type === PieceType.PAWN) {
                piece.enPassant = true;
              } else {
                piece.enPassant = false;
              }
              piece.x = x;
              piece.y = y;
              // console.log(x, y, x, y, piece.x, piece.y);
              result.push(piece);
              // console.log(piece);
            } else if (!(piece.x === x && piece.y === y)) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              result.push(piece);
            }
            return result;
          }, []);

          setPieces(updatedPieces);
        } else {
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
      let image = null;
      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });
      board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
    }
  }
  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id="chessboard"
      ref={chessBoardRef}
    >
      {board}
    </div>
  );
}

export default ChessBoard;
