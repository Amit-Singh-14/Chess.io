import { samePosition } from "../../../constant";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied } from "./GeneralRules";

// ROOK MOVEMENT
export const rookMove = (initialPosition, desiredPosition, team, boardState) => {
  if (desiredPosition.x === initialPosition.x) {
    // rook horizonatal and vertical movement
    for (let i = 1; i < 8; i++) {
      let multiplier = desiredPosition.y < initialPosition.y ? -1 : 1;
      let passPosition = {
        x: initialPosition.x,
        y: initialPosition.y + i * multiplier,
      };
      if (samePosition(passPosition, desiredPosition)) {
        if (tileIsEmptyOrOccupiedByOpponent(passPosition, boardState, team)) {
          return true;
        }
        break;
      } else {
        if (tileIsOccupied(passPosition, boardState)) {
          break;
        }
      }
    }
  } else if (desiredPosition.y === initialPosition.y) {
    // console.log("moving horizontal");

    for (let i = 1; i < 8; i++) {
      let multiplier = desiredPosition.x < initialPosition.x ? -1 : 1;
      let passPosition = {
        x: initialPosition.x + i * multiplier,
        y: initialPosition.y,
      };
      if (samePosition(passPosition, desiredPosition)) {
        if (tileIsEmptyOrOccupiedByOpponent(passPosition, boardState, team)) {
          return true;
        }
        break;
      } else {
        if (tileIsOccupied(passPosition, boardState)) {
          break;
        }
      }
    }
  }

  return false;
};
