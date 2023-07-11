import { TeamType, samePosition } from "../../../constant";
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

  const normalMove = { x: pawn.position.x, y: pawn.position.y + pawnDirection };
  const specialMove = { x: pawn.position.x, y: pawn.position.y + pawnDirection * 2 };
  const upperLeftAttack = { x: pawn.position.x - 1, y: pawn.position.y + pawnDirection };
  const upperRightAttack = { x: pawn.position.x + 1, y: pawn.position.y + pawnDirection };
  const leftPosition = { x: pawn.position.x - 1, y: pawn.position.y };
  const rightPosition = { x: pawn.position.x + 1, y: pawn.position.y };

  if (!tileIsOccupied(normalMove, boardState)) {
    possibleMove.push(normalMove);

    if (pawn.position.y === specialRow && !tileIsOccupied(specialMove, boardState)) {
      possibleMove.push(specialMove);
    }
  }

  if (tileIsOccupiedByOpponent(upperLeftAttack, boardState, pawn.team)) {
    possibleMove.push(upperLeftAttack);
  } else if (!tileIsOccupied(upperLeftAttack, boardState)) {
    const leftPiece = boardState.find((p) => samePosition(p.position, leftPosition));

    if (leftPiece != null && leftPiece.enPassant) {
      possibleMove.push(upperLeftAttack);
    }
  }

  if (tileIsOccupiedByOpponent(upperRightAttack, boardState, pawn.team)) {
    possibleMove.push(upperRightAttack);
  } else if (!tileIsOccupied(upperRightAttack, boardState)) {
    const rightPiece = boardState.find((p) => samePosition(p.position, rightPosition));

    if (rightPiece != null && rightPiece.enPassant) {
      possibleMove.push(upperRightAttack);
    }
  }

  // console.log(possibleMove, pawn);
  return possibleMove;
};
