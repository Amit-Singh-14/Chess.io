import { samePosition } from "../../../constant";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied } from "./General";

// KING MOVEMENT
export const kingMove = (initialPosition, desiredPosition, team, boardState) => {
  for (let i = 1; i < 2; i++) {
    let multiplierX =
      desiredPosition.x < initialPosition.x ? -1 : desiredPosition.x > initialPosition.x ? 1 : 0;

    let multiplierY =
      desiredPosition.y < initialPosition.y ? -1 : desiredPosition.y > initialPosition.y ? 1 : 0;

    let passPosition = {
      x: initialPosition.x + i * multiplierX,
      y: initialPosition.y + i * multiplierY,
    };
    if (samePosition(passPosition, desiredPosition)) {
      if (tileIsEmptyOrOccupiedByOpponent(passPosition, boardState, team)) {
        return true;
      }
    } else {
      if (tileIsOccupied(passPosition, boardState)) {
        break;
      }
    }
  }
  return false;
};
