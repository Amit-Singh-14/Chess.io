import { PieceType } from "../chessBoard/ChessBoard";
import { TeamType } from "../chessBoard/ChessBoard";

export default class Referee {
  titleIsOccupied(x, y, boardState) {
    console.log("checing if title is occupied.....");
    const piece = boardState.find((p) => p.x === x && p.y === y);
    if (piece) {
      return true;
    }
    return false;
  }

  titleIsOccupiedByOpponent(x, y, boardState, team) {
    const piece = boardState.find(
      (p) => p.x === x && p.y === y && p.team !== team
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isEnPassantMove(px, py, x, y, type, team, boardState) {
    const pawnDirection = team === TeamType.OUR ? 1 : -1;
    console.log(pawnDirection, team, type);
    if (type === PieceType.PAWN) {
      if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
        const piece = boardState.find(
          (p) => p.x === x && p.y === y - pawnDirection && p.enPassant
        );
        if (piece) {
          return true;
        }
      }
    }
    return false;
  }

  isValidMove(px, py, x, y, type, team, boardState) {
    console.log("refereee is checking the move....");
    // MOVEMENT LOGIC
    // console.log(type, team);
    if (type === PieceType.PAWN) {
      const specialRow = team === TeamType.OUR ? 1 : 6;
      const pawnDirection = team === TeamType.OUR ? 1 : -1;
      // console.log(specialRow, pawnDirection);

      if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
        if (
          !this.titleIsOccupied(x, y, boardState) &&
          !this.titleIsOccupied(x, y - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (px === x && y - py === pawnDirection) {
        if (!this.titleIsOccupied(x, y, boardState)) {
          return true;
        }
      }

      // ATTACK LOGIC
      else if (x - px === -1 && y - py === pawnDirection) {
        if (this.titleIsOccupiedByOpponent(x, y, boardState, team)) {
          console.log("you can attack");
          return true;
        }
      } else if (x - px === 1 && y - py === pawnDirection) {
        if (this.titleIsOccupiedByOpponent(x, y, boardState, team)) {
          console.log("you can attack");
          return true;
        }
      }
    }
    return false;
  }
}
