import { PieceType, TeamType, samePosition } from "../../constant";

export default class Referee {
  titleIsEmptyOrOccupiedByOpponent(position, boardState, team) {
    return (
      !this.titleIsOccupied(position, boardState) ||
      this.titleIsOccupiedByOpponent(position, boardState, team)
    );
  }

  titleIsOccupied(position, boardState) {
    console.log("checing if title is occupied.....");
    const piece = boardState.find((p) => samePosition(p.position, position));
    if (piece) {
      return true;
    }
    return false;
  }

  titleIsOccupiedByOpponent(position, boardState, team) {
    const piece = boardState.find(
      (p) => samePosition(p.position, position) && p.team !== team
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  //FOR PAWNS
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

    // MOVEMENT LOGIC PAWN
    if (type === PieceType.PAWN) {
      const specialRow = team === TeamType.OUR ? 1 : 6;
      const pawnDirection = team === TeamType.OUR ? 1 : -1;

      if (
        initialPosition.x === desiredPosition.x &&
        initialPosition.y === specialRow &&
        desiredPosition.y - initialPosition.y === 2 * pawnDirection
      ) {
        if (
          !this.titleIsOccupied(desiredPosition, boardState) &&
          !this.titleIsOccupied(
            { x: desiredPosition.x, y: desiredPosition.y - pawnDirection },
            boardState
          )
        ) {
          return true;
        }
      } else if (
        initialPosition.x === desiredPosition.x &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (!this.titleIsOccupied(desiredPosition, boardState)) {
          return true;
        }
      }

      // ATTACK LOGIC
      else if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (this.titleIsOccupiedByOpponent(desiredPosition, boardState, team)) {
          return true;
        }
      }
    }

    // MOVEMENT AND ATTACK LOGIC FOR KNIGHT
    else if (type === PieceType.KNIGHT) {
      for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {
          // TOP AND BOTTOM SIDE MOVEMENT
          if (desiredPosition.y - initialPosition.y === 2 * i) {
            if (desiredPosition.x - initialPosition.x === j) {
              if (
                this.titleIsEmptyOrOccupiedByOpponent(
                  desiredPosition,
                  boardState,
                  team
                )
              ) {
                return true;
              }
              console.log("upper/bottom left/right ");
            }
            // RIGHT AND LEFT SIDE MOVEMENT
          } else if (desiredPosition.x - initialPosition.x === 2 * i) {
            if (desiredPosition.y - initialPosition.y === j) {
              if (
                this.titleIsEmptyOrOccupiedByOpponent(
                  desiredPosition,
                  boardState,
                  team
                )
              ) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }
}
