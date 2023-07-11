import { PieceType, TeamType } from "../../constant";
import { bishopMove, getPossibleBishopMove } from "./rules/Bishop";
import { getPossibleQKingMove, kingMove } from "./rules/King";
import { getPossibleKnightMove, knightMove } from "./rules/Knight";
import { getPossiblePawnMove, pawnMove } from "./rules/Pawn";
import { getPossibleQueenMove, queenMove } from "./rules/Queen";
import { getPossibleRookMove, rookMove } from "./rules/Rook";

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
      default:
        validMove = false;
    }
    return validMove;
  }

  getValidMove(piece, boardState) {
    switch (piece.type) {
      case PieceType.PAWN:
        return getPossiblePawnMove(piece, boardState);

      case PieceType.KNIGHT:
        return getPossibleKnightMove(piece, boardState);

      case PieceType.BISHOP:
        return getPossibleBishopMove(piece, boardState);

      case PieceType.ROOK:
        return getPossibleRookMove(piece, boardState);

      case PieceType.QUEEN:
        return getPossibleQueenMove(piece, boardState);

      case PieceType.KING:
        return getPossibleQKingMove(piece, boardState);

      default:
        return [];
    }
  }
}
