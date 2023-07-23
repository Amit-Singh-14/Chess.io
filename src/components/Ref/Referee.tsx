import { useEffect, useRef, useState } from "react";
import { initialBoard } from "../../Constants";
import { bishopMove, kingMove, knightMove, pawnMove, queenMove, rookMove } from "../referee/rules";
import Chessboard from "../chessBoard/ChessBoard";
import { Piece } from "../../models/Piece";
import { Position } from "../../models/Position";
import { PieceType, TeamType } from "../../Types";
import { Pawn } from "../../models/Pawn";
import { Board } from "../../models/Board";

export default function Referee() {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    board.calculateAllMoves();
  });

  function playMove(playedPiece: Piece, destination: Position): boolean {
    // if playing piece doesnt have any moves
    if (playedPiece.possibleMoves === undefined) return false;

    // prevent the inactive team from playing
    // team turn
    if (playedPiece.team === TeamType.OUR && board.totalTurn % 2 !== 1) return false;
    if (playedPiece.team === TeamType.OPPONENT && board.totalTurn % 2 !== 0) return false;

    let playedMoveIsValid = false;

    const validMove = playedPiece.possibleMoves?.some((m) => m.samePosition(destination));

    if (!validMove) return false;

    const enPassantMove = isEnPassantMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    );

    setBoard((prevBoard) => {
      // playing a move
      const cloneBoard = board.copy();
      cloneBoard.totalTurn += 1;
      playedMoveIsValid = cloneBoard.playMove(validMove, enPassantMove, playedPiece, destination);
      return cloneBoard;
    });

    // this is for promoting a pawn
    let promotionRow = playedPiece.team === TeamType.OUR ? 7 : 0;

    if (destination.y === promotionRow && playedPiece.isPawn) {
      modalRef.current?.classList.remove("hidden");
      setPromotionPawn((prevPiece) => {
        const clonePlayedPiece = playedPiece.clone();
        clonePlayedPiece.position = destination.clone();
        return clonePlayedPiece;
      });
    }
    return playedMoveIsValid;
  }

  function isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ) {
    const pawnDirection = team === TeamType.OUR ? 1 : -1;

    if (type === PieceType.PAWN) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = board.pieces.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            (p as Pawn).enPassant
        );
        if (piece) {
          return true;
        }
      }
    }

    return false;
  }

  //TODO
  //Pawn promotion!
  //Prevent the king from moving into danger!
  //Add castling!
  //Add check!
  //Add checkmate!
  //Add stalemate!
  function isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ) {
    let validMove = false;
    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMove(initialPosition, desiredPosition, team, board.pieces);
        break;
      case PieceType.KNIGHT:
        validMove = knightMove(initialPosition, desiredPosition, team, board.pieces);
        break;
      case PieceType.BISHOP:
        validMove = bishopMove(initialPosition, desiredPosition, team, board.pieces);
        break;
      case PieceType.ROOK:
        validMove = rookMove(initialPosition, desiredPosition, team, board.pieces);
        break;
      case PieceType.QUEEN:
        validMove = queenMove(initialPosition, desiredPosition, team, board.pieces);
        break;
      case PieceType.KING:
        validMove = kingMove(initialPosition, desiredPosition, team, board.pieces);
    }

    return validMove;
  }

  function promotePawn(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return;
    }

    setBoard((prev) => {
      const cloneBoard = board.copy();
      cloneBoard.pieces = cloneBoard.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(promotionPawn)) {
          results.push(new Piece(piece.position.clone(), pieceType, piece.team));
        } else {
          results.push(piece);
        }
        return results;
      }, [] as Piece[]);

      cloneBoard.calculateAllMoves();
      return cloneBoard;
    });

    modalRef.current?.classList.add("hidden");
  }

  function promotionTeamType() {
    return promotionPawn?.team === TeamType.OUR ? "w" : "b";
  }

  // 1 -> white turn
  // 2 -> black turn
  return (
    <>
      <p style={{ color: "white", fontSize: "24px" }}>{board.totalTurn}</p>
      <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
        <div className="modal-body">
          <img
            onClick={() => promotePawn(PieceType.ROOK)}
            src={`/assets/images/${promotionTeamType()}_rook.png`}
            alt=""
          />
          <img
            onClick={() => promotePawn(PieceType.BISHOP)}
            src={`/assets/images/${promotionTeamType()}_bishop.png`}
            alt=""
          />
          <img
            onClick={() => promotePawn(PieceType.KNIGHT)}
            src={`/assets/images/${promotionTeamType()}_knight.png`}
            alt=""
          />
          <img
            onClick={() => promotePawn(PieceType.QUEEN)}
            src={`/assets/images/${promotionTeamType()}_queen.png`}
            alt=""
          />
        </div>
      </div>
      <Chessboard playMove={playMove} pieces={board.pieces} />
    </>
  );
}
