import React, { useRef, useState } from "react";
import "./chessBoard.css";
import Tile from "../tiles/Tile";
import Referee from "../referee/Referee";
import {
  PieceType,
  TeamType,
  horixontalAxis,
  verticalAxis,
  initialBoardState,
  samePosition,
} from "../../constant";

function ChessBoard() {
  const [pieces, setPieces] = useState(initialBoardState);
  const [grabPosition, setGrabPosition] = useState({ x: -1, y: -1 });
  const [activePiece, setActivePiece] = useState(null);
  const [promotionPawn, setPromotionPawn] = useState(null);
  const referee = new Referee();
  const chessBoardRef = useRef(null);
  const modalRef = useRef(null);

  let board = [];

  function updateValidMoves() {
    setPieces((currentPiece) => {
      return currentPiece.map((p) => {
        p.possibleMoves = referee.getValidMove(p, currentPiece);
        return p;
      });
    });
  }

  function grabPiece(e) {
    updateValidMoves();
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
        const validMove = referee.isValidMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const isEnPassantMove = referee.isEnPassantMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;

        if (isEnPassantMove) {
          const updatePieces = pieces.reduce((result, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant = false;
              piece.position.x = x;
              piece.position.y = y;
              result.push(piece);
            } else if (!samePosition(piece.position, { x: x, y: y - pawnDirection })) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              result.push(piece);
            }
            return result;
          }, []);
          setPieces(updatePieces);
        }

        // valid move
        else if (validMove) {
          const updatedPieces = pieces.reduce((result, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              if (Math.abs(grabPosition.y - y) === 2 && piece.type === PieceType.PAWN) {
                piece.enPassant = true;
              } else {
                piece.enPassant = false;
              }
              piece.position.x = x;
              piece.position.y = y;

              let promotionRow = piece.team === TeamType.OUR ? 7 : 0;

              if (y === promotionRow && piece.type === PieceType.PAWN) {
                // console.log("this piece is ready for pormtoion");
                modalRef.current.classList.remove("hidden");
                setPromotionPawn(piece);
              }
              result.push(piece);
            } else if (!samePosition(piece.position, { x: x, y: y })) {
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

  function promotePawn(pieceType) {
    // console.log("promoting pawn");
    const updatedPieces = pieces.reduce((result, piece) => {
      if (samePosition(piece.position, promotionPawn.position)) {
        piece.type = pieceType;
        const teamType = piece.team === TeamType.OUR ? "w" : "b";

        let image = "";
        switch (pieceType) {
          case PieceType.ROOK:
            image = "rook";
            break;
          case PieceType.QUEEN:
            image = "queen";
            break;
          case PieceType.KNIGHT:
            image = "knight";
            break;
          case PieceType.BISHOP:
            image = "bishop";
            break;

          default:
        }
        piece.image = `assets/images/${teamType}_${image}.png`;
      }
      result.push(piece);
      return result;
    }, []);

    setPieces(updatedPieces);
    modalRef.current.classList.add("hidden");
  }

  // promotionteam type
  function promotionTeamType() {
    return promotionPawn?.team === TeamType.OUR ? "w" : "b";
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
      // console.log(currentPiece);
      let highlight = currentPiece?.possibleMoves
        ? currentPiece.possibleMoves.some((p) => samePosition(p, { x: i, y: j }))
        : false;

      board.push(<Tile key={`${j},${i}`} image={image} number={number} highlight={highlight} />);
    }
  }
  return (
    <>
      <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
        <div className="modal-body">
          <img
            onClick={() => promotePawn(PieceType.ROOK)}
            src={`/assets/images/${promotionTeamType()}_rook.png`}
            alt="sdfsdfsdf"
          />
          <img
            onClick={() => promotePawn(PieceType.QUEEN)}
            src={`/assets/images/${promotionTeamType()}_queen.png`}
            alt="sdfsdfsdf"
          />
          <img
            onClick={() => promotePawn(PieceType.BISHOP)}
            src={`/assets/images/${promotionTeamType()}_bishop.png`}
            alt="sdfsdfsdf"
          />
          <img
            onClick={() => promotePawn(PieceType.KNIGHT)}
            src={`/assets/images/${promotionTeamType()}_knight.png`}
            alt="sdfsdfsdf"
          />
        </div>
      </div>
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
