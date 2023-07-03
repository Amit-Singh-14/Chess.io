import { PieceType } from "../chessBoard/ChessBoard";
import { Team } from "../chessBoard/ChessBoard";

export default class Referee {
  titleIsOccupied(x, y, boardState) {
    console.log("checing if title is occupied.....");
    const piece = boardState.find((p) => p.x === x && p.y === y);
    if (piece) {
      return true;
    }
    return false;
  }

  isValidMove(px, py, x, y, type, team, boardState) {
    console.log("refereee is checking the move....");
    // console.log(px, py, x, y, type, team);

    if (type === PieceType.PAWN) {
      const specialRow = team === Team.BLACK ? 1 : 6;
      const pawnDirection = team === Team.BLACK ? 1 : -1;

      if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
        if (
          !this.titleIsOccupied(y, x, boardState) &&
          !this.titleIsOccupied(y - pawnDirection, x, boardState)
        ) {
          return true;
        }
      } else if (px === x && y - py === pawnDirection) {
        if (!this.titleIsOccupied(y, x, boardState)) {
          return true;
        }
      }
    }
    return false;
  }
}
