import { PieceType, TeamType, samePosition } from "../../constant";
import { bishopMove } from "./rules/BishopRule";
import {
  tileIsOccupied,
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupiedByOpponent,
} from "./rules/GeneralRules";
import { kingMove } from "./rules/KingRule";
import { knightMove } from "./rules/KnightRule";
import { pawnMove } from "./rules/PawnRule";
import { queenMove } from "./rules/QueenRule";
import { rookMove } from "./rules/RookRule";

export default class Referee {
  //FOR PAWN ENPASANT MOVE
  isEnPassantMove(initialPosition, desiredPosition, type, team, boardState) {
    const pawnDirection = team === TeamType.OUR ? 1 : -1;
    if (type === PieceType.PAWN) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = boardState.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.enPassant
        );
        if (piece) {
          return true;
        }
      }
    }
    return false;
  }

  // MAIN FUNCTION
  isValidMove(initialPosition, desiredPosition, type, team, boardState) {
    let validMove = false;

    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMove(initialPosition, desiredPosition, team, boardState);
        break;

      case PieceType.KNIGHT:
        validMove = knightMove(initialPosition, desiredPosition, team, boardState);
        break;

      case PieceType.BISHOP:
        validMove = bishopMove(initialPosition, desiredPosition, team, boardState);
        break;

      case PieceType.ROOK:
        validMove = rookMove(initialPosition, desiredPosition, team, boardState);
        break;

      case PieceType.QUEEN:
        validMove = queenMove(initialPosition, desiredPosition, team, boardState);
        break;

      case PieceType.KING:
        validMove = kingMove(initialPosition, desiredPosition, team, boardState);
        break;
    }

    return validMove;
  }
}
