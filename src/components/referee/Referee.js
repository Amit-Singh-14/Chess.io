import { PieceType } from "../chessBoard/ChessBoard";
import { Team } from "../chessBoard/ChessBoard";

export default class Referee {
  isValidMove(px, py, x, y, type, team) {
    console.log("refereee is checking the move....");
    console.log(px, py, x, y, type, team);

    if (type === PieceType.PAWN) {
      if (team === Team.BLACK) {
        if (py == 1) {
          if (px == x && (y - py === 1 || y - py === 2)) {
            // console.log("valid move");
            return true;
          }
        } else {
          if (px === x && y - py === 1) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
