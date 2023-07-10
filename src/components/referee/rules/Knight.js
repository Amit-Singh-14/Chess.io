import { tileIsEmptyOrOccupiedByOpponent } from "./General";

// Knight movement/attack logic
export const knightMove = (initialPosition, desiredPosition, team, boardState) => {
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      // TOP AND BOTTOM SIDE MOVEMENT
      if (desiredPosition.y - initialPosition.y === 2 * i) {
        if (desiredPosition.x - initialPosition.x === j) {
          if (tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
            return true;
          }
          // console.log("upper/bottom left/right ");
        }
        // RIGHT AND LEFT SIDE MOVEMENT
      } else if (desiredPosition.x - initialPosition.x === 2 * i) {
        if (desiredPosition.y - initialPosition.y === j) {
          if (tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
            return true;
          }
        }
      }
    }
  }
  return false;
};
