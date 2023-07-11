import { samePosition } from "../../../constant";
import {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from "./General";

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

export const getPossibleQKingMove = (king, boardState) => {
  const possibleMove = [];
  // top
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.position.x, y: king.position.y + i };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  // bottom
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.position.x, y: king.position.y - i };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  // right
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.position.x + i, y: king.position.y };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  // left
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.position.x - 1, y: king.position.y };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsEmptyOrOccupiedByOpponent(destination, boardState, king.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }

  // upper right
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.position.x + i, y: king.position.y + i };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  // upper left
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.position.x - i, y: king.position.y - i };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  // bottom right
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.position.x + i, y: king.position.y - i };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  // bottom left
  for (let i = 1; i < 2; i++) {
    const destination = { x: king.position.x - i, y: king.position.y + i };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  return possibleMove;
};
