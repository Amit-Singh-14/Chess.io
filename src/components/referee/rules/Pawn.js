import { TeamType } from "../../../constant";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./General";
// PAWN MOVEMENT/ATTACK LOGIC
export const pawnMove = (initialPosition, desiredPosition, team, boardState) => {
  const specialRow = team === TeamType.OUR ? 1 : 6;
  const pawnDirection = team === TeamType.OUR ? 1 : -1;

  if (
    initialPosition.x === desiredPosition.x &&
    initialPosition.y === specialRow &&
    desiredPosition.y - initialPosition.y === 2 * pawnDirection
  ) {
    if (
      !tileIsOccupied(desiredPosition, boardState) &&
      !tileIsOccupied({ x: desiredPosition.x, y: desiredPosition.y - pawnDirection }, boardState)
    ) {
      return true;
    }
  } else if (
    initialPosition.x === desiredPosition.x &&
    desiredPosition.y - initialPosition.y === pawnDirection
  ) {
    if (!tileIsOccupied(desiredPosition, boardState)) {
      return true;
    }
  }

  // ATTACK LOGIC
  else if (
    (desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) &&
    desiredPosition.y - initialPosition.y === pawnDirection
  ) {
    if (tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
      return true;
    }
  }
  return false;
};

export const getPossiblePawnMove = (pawn, boardState) => {
  const possibleMove = [];

  const pawnDirection = pawn.team === TeamType.OUR ? 1 : -1;
  const specialRow = pawn.team === TeamType.OUR ? 1 : 6;

  if (!tileIsOccupied({ x: pawn.position.x, y: pawn.position.y + pawnDirection }, boardState)) {
    possibleMove.push({ x: pawn.position.x, y: pawn.position.y + pawnDirection });

    if (
      pawn.position.y === specialRow &&
      !tileIsOccupied({ x: pawn.position.x, y: pawn.position.y + pawnDirection * 2 }, boardState)
    ) {
      possibleMove.push({ x: pawn.position.x, y: pawn.position.y + pawnDirection * 2 });
    }
  }
  // console.log(possibleMove, pawn);
  return possibleMove;
};
