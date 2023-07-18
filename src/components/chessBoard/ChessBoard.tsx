import { useRef, useState } from "react";
import "./chessBoard.css";
import Tile from "../tiles/Tile";
import {
  VERTICAL_AXIS,
  HORIZONTAL_AXIS,
  GRID_SIZE,
  Piece,
  Position,
  samePosition,
} from "../../Constants";


interface Props {
  playMove: (piece: Piece, position: Position) => boolean;
  pieces: Piece[];
}
export default function Chessboard({playMove, pieces} : Props) {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 });
  const chessboardRef = useRef<HTMLDivElement>(null);
 

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const grabY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 600) / GRID_SIZE)
      );
      setGrabPosition({ x: grabX, y: grabY });
      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      setActivePiece(element);
    }
  }
  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 35;
      const y = e.clientY - 35;
      activePiece.style.position = "absolute";
      //If x is smaller than minimum amount
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      }
      //If x is bigger than maximum amount
      else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      }
      //If x is in the constraints
      else {
        activePiece.style.left = `${x}px`;
      }
      //If y is smaller than minimum amount
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      }
      //If y is bigger than maximum amount
      else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      }
      //If y is in the constraints
      else {
        activePiece.style.top = `${y}px`;
      }
    }
  }
  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 600) / GRID_SIZE)
      );
      const currentPiece = pieces.find((p) =>
        samePosition(p.position, grabPosition)
      );

      if (currentPiece) {
        var succes = playMove(currentPiece, {x, y});

        if(!succes) {
          //RESETS THE PIECE POSITION
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }
      setActivePiece(null);
    }
  }

  let board = [];
  // inserting the pieces in correct order according to the cordinates in the board array to render
   for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      const number = j + i + 2;
      const piece = pieces.find((p) =>
        samePosition(p.position, { x: i, y: j })
      );
      let image = piece ? piece.image : undefined;
      let currentPiece = activePiece != null ? pieces.find(p => samePosition(p.position, grabPosition)) : undefined;
      let highlight = currentPiece?.possibleMoves ? 
      currentPiece.possibleMoves.some(p => samePosition(p, {x: i, y: j})) : false;
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
    ref={chessboardRef}
  >
    {board}
  </div>
</>
);
}

