import { PieceType, TeamType } from "../../constant";

export default class Referee {
  titleIsOccupied(x, y, boardState) {
    console.log("checing if title is occupied.....");
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y
    );
    if (piece) {
      return true;
    }
    return false;
  }

  titleIsOccupiedByOpponent(x, y, boardState, team) {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y && p.team !== team
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

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

  isValidMove(initialPosition, desiredPosition, type, team, boardState) {
    console.log("refereee is checking the move....");
    // MOVEMENT LOGIC

    if (type === PieceType.PAWN) {
      const specialRow = team === TeamType.OUR ? 1 : 6;
      const pawnDirection = team === TeamType.OUR ? 1 : -1;

      if (
        initialPosition.x === desiredPosition.x &&
        initialPosition.y === specialRow &&
        desiredPosition.y - initialPosition.y === 2 * pawnDirection
      ) {
        if (
          !this.titleIsOccupied(
            desiredPosition.x,
            desiredPosition.y,
            boardState
          ) &&
          !this.titleIsOccupied(
            desiredPosition.x,
            desiredPosition.y - pawnDirection,
            boardState
          )
        ) {
          return true;
        }
      } else if (
        initialPosition.x === desiredPosition.x &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (
          !this.titleIsOccupied(
            desiredPosition.x,
            desiredPosition.y,
            boardState
          )
        ) {
          return true;
        }
      }

      // ATTACK LOGIC
      else if (
        desiredPosition.x - initialPosition.x === -1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (
          this.titleIsOccupiedByOpponent(
            desiredPosition.x,
            desiredPosition.y,
            boardState,
            team
          )
        ) {
          return true;
        }
      } else if (
        desiredPosition.x - initialPosition.x === 1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (
          this.titleIsOccupiedByOpponent(
            desiredPosition.x,
            desiredPosition.y,
            boardState,
            team
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
