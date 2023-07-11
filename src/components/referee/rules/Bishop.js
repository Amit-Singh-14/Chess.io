import { samePosition } from "../../../constant";
import {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from "./General";

// BISHOP MOVEMENT
export const bishopMove = (initialPosition, desiredPosition, team, boardState) => {
  for (let i = 1; i < 8; i++) {
    //  MOVING TOP RIGHT
    if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
      let passPosition = {
        x: initialPosition.x + i,
        y: initialPosition.y + i,
      };

      // checkng if the move is valid for bishop
      if (samePosition(passPosition, desiredPosition)) {
        // checking if empty or occupied by opponet
        if (tileIsEmptyOrOccupiedByOpponent(passPosition, boardState, team)) {
          return true;
        }
      } else {
        // checking the pass tile beach mai koi piece toh nhi
        if (tileIsOccupied(passPosition, boardState)) {
          break;
        }
      }
    }

    // MOVING DOWN RIGHT
    if (desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
      let passPosition = {
        x: initialPosition.x + i,
        y: initialPosition.y - i,
      };

      // checkng if the move is valid for bishop
      if (samePosition(passPosition, desiredPosition)) {
        // checking if empty or occupied by opponet
        if (tileIsEmptyOrOccupiedByOpponent(passPosition, boardState, team)) {
          return true;
        }
      } else {
        // checking the pass tile beach mai koi piece toh nhi
        if (tileIsOccupied(passPosition, boardState)) {
          break;
        }
      }
    }

    // MOVING BOTTOM LEFT
    if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
      let passPosition = {
        x: initialPosition.x - i,
        y: initialPosition.y - i,
      };

      // checkng if the move is valid for bishop
      if (samePosition(passPosition, desiredPosition)) {
        // checking if empty or occupied by opponet
        if (tileIsEmptyOrOccupiedByOpponent(passPosition, boardState, team)) {
          return true;
        }
      } else {
        // checking the pass tile beach mai koi piece toh nhi
        if (tileIsOccupied(passPosition, boardState)) {
          break;
        }
      }
    }
    //MOVING TOP LEFT
    if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
      let passPosition = {
        x: initialPosition.x - i,
        y: initialPosition.y + i,
      };

      // checkng if the move is valid for bishop
      if (samePosition(passPosition, desiredPosition)) {
        // checking if empty or occupied by opponet
        if (tileIsEmptyOrOccupiedByOpponent(passPosition, boardState, team)) {
          return true;
        }
      } else {
        // checking the pass tile beach mai koi piece toh nhi
        if (tileIsOccupied(passPosition, boardState)) {
          break;
        }
      }
    }
  }
  return false;
};

export const getPossibleBishopMove = (bishop, boardState) => {
  const possibleMove = [];

  // upper right
  for (let i = 1; i < 8; i++) {
    const destination = { x: bishop.position.x + i, y: bishop.position.y + i };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  // upper left
  for (let i = 1; i < 8; i++) {
    const destination = { x: bishop.position.x - i, y: bishop.position.y - i };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  // bottom right
  for (let i = 1; i < 8; i++) {
    const destination = { x: bishop.position.x + i, y: bishop.position.y - i };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }
  // bottom left
  for (let i = 1; i < 8; i++) {
    const destination = { x: bishop.position.x - i, y: bishop.position.y + i };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMove.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
      possibleMove.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMove;
};
