import { samePosition } from "../../../constant";
import {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from "./General";

// QUEEN MOVEMENT
export const queenMove = (initialPosition, desiredPosition, team, boardState) => {
  for (let i = 1; i < 8; i++) {
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

export const getPossibleQueenMove = (queen, boardState) => {
  const possibleMove = [];
  // top
  for (let i = 1; i < 8; i++) {
    const destination = { x: queen.position.x, y: queen.position.y + i };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  // bottom
  for (let i = 1; i < 8; i++) {
    const destination = { x: queen.position.x, y: queen.position.y - i };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  // right
  for (let i = 1; i < 8; i++) {
    const destination = { x: queen.position.x + i, y: queen.position.y };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  // left
  for (let i = 1; i < 8; i++) {
    const destination = { x: queen.position.x - i, y: queen.position.y };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }

  // upper right
  for (let i = 1; i < 8; i++) {
    const destination = { x: queen.position.x + i, y: queen.position.y + i };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  // upper left
  for (let i = 1; i < 8; i++) {
    const destination = { x: queen.position.x - i, y: queen.position.y - i };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  // bottom right
  for (let i = 1; i < 8; i++) {
    const destination = { x: queen.position.x + i, y: queen.position.y - i };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  // bottom left
  for (let i = 1; i < 8; i++) {
    const destination = { x: queen.position.x - i, y: queen.position.y + i };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  return possibleMove;
};
