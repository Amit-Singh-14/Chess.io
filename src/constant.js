export const horixontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const Grid_size = 75;
export function samePosition(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}
export const PieceType = {
  PAWN: 0,
  BISHOP: 1,
  KNIGHT: 2,
  ROOK: 3,
  QUEEN: 4,
  KING: 5,
};

export const TeamType = {
  OPPONENT: 0,
  OUR: 1,
};

export const initialBoardState = [
  {
    image: `assets/images/b_rook.png`,
    position: {
      x: 0,
      y: 7,
    },
    type: PieceType.ROOK,
    team: TeamType.OPPONENT,
    possibleMoves: [],
  },
  {
    image: `assets/images/b_knight.png`,
    position: {
      x: 1,
      y: 7,
    },
    type: PieceType.KNIGHT,
    team: TeamType.OPPONENT,
    possibleMoves: [],
  },
  {
    image: `assets/images/b_bishop.png`,
    position: {
      x: 2,
      y: 7,
    },
    type: PieceType.BISHOP,
    team: TeamType.OPPONENT,
    possibleMoves: [],
  },
  {
    image: `assets/images/b_queen.png`,
    position: {
      x: 3,
      y: 7,
    },
    type: PieceType.QUEEN,
    team: TeamType.OPPONENT,
    possibleMoves: [],
  },
  {
    image: `assets/images/b_king.png`,
    position: {
      x: 4,
      y: 7,
    },
    type: PieceType.KING,
    team: TeamType.OPPONENT,
    possibleMoves: [],
  },
  {
    image: `assets/images/b_bishop.png`,
    position: {
      x: 5,
      y: 7,
    },
    type: PieceType.BISHOP,
    team: TeamType.OPPONENT,
    possibleMoves: [],
  },
  {
    image: `assets/images/b_knight.png`,
    position: {
      x: 6,
      y: 7,
    },
    type: PieceType.KNIGHT,
    possibleMoves: [],
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/b_rook.png`,
    position: {
      x: 7,
      y: 7,
    },
    type: PieceType.ROOK,
    possibleMoves: [],
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/b_pawn.png`,
    position: {
      x: 0,
      y: 6,
    },
    type: PieceType.PAWN,
    possibleMoves: [],
    team: TeamType.OPPONENT,
    enPassant: false,
  },
  {
    image: `assets/images/b_pawn.png`,
    position: {
      x: 1,
      y: 6,
    },
    type: PieceType.PAWN,
    possibleMoves: [],
    team: TeamType.OPPONENT,
    enPassant: false,
  },
  {
    image: `assets/images/b_pawn.png`,
    position: {
      x: 2,
      y: 6,
    },
    type: PieceType.PAWN,
    possibleMoves: [],
    team: TeamType.OPPONENT,
    enPassant: false,
  },
  {
    image: `assets/images/b_pawn.png`,
    position: {
      x: 3,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
    possibleMoves: [],
    enPassant: false,
  },
  {
    image: `assets/images/b_pawn.png`,
    position: {
      x: 4,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
    possibleMoves: [],
    enPassant: false,
  },
  {
    image: `assets/images/b_pawn.png`,
    position: {
      x: 5,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
    possibleMoves: [],
    enPassant: false,
  },
  {
    image: `assets/images/b_pawn.png`,
    position: {
      x: 6,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
    possibleMoves: [],
    enPassant: false,
  },
  {
    image: `assets/images/b_pawn.png`,
    position: {
      x: 7,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
    enPassant: false,
    possibleMoves: [],
  },

  {
    image: `assets/images/w_rook.png`,
    position: {
      x: 0,
      y: 0,
    },
    type: PieceType.ROOK,
    team: TeamType.OUR,
    possibleMoves: [],
  },
  {
    image: `assets/images/w_knight.png`,
    position: {
      x: 1,
      y: 0,
    },
    type: PieceType.KNIGHT,
    team: TeamType.OUR,
    possibleMoves: [],
  },
  {
    image: `assets/images/w_bishop.png`,
    position: {
      x: 2,
      y: 0,
    },
    type: PieceType.BISHOP,
    possibleMoves: [],
    team: TeamType.OUR,
  },
  {
    image: `assets/images/w_queen.png`,
    position: {
      x: 3,
      y: 0,
    },
    type: PieceType.QUEEN,
    team: TeamType.OUR,
    possibleMoves: [],
  },
  {
    image: `assets/images/w_king.png`,
    position: {
      x: 4,
      y: 0,
    },
    type: PieceType.KING,
    possibleMoves: [],
    team: TeamType.OUR,
  },
  {
    image: `assets/images/w_bishop.png`,
    position: {
      x: 5,
      y: 0,
    },
    type: PieceType.BISHOP,
    team: TeamType.OUR,
    possibleMoves: [],
  },
  {
    image: `assets/images/w_knight.png`,
    position: {
      x: 6,
      y: 0,
    },
    type: PieceType.KNIGHT,
    team: TeamType.OUR,
    possibleMoves: [],
  },
  {
    image: `assets/images/w_rook.png`,
    position: {
      x: 7,
      y: 0,
    },
    type: PieceType.ROOK,
    possibleMoves: [],
    team: TeamType.OUR,
  },
  {
    image: `assets/images/w_pawn.png`,
    position: {
      x: 0,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.OUR,
    possibleMoves: [],
    enPassant: false,
  },
  {
    image: `assets/images/w_pawn.png`,
    position: {
      x: 1,
      y: 1,
    },
    type: PieceType.PAWN,
    possibleMoves: [],
    team: TeamType.OUR,
    enPassant: false,
  },
  {
    image: `assets/images/w_pawn.png`,
    position: {
      x: 2,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.OUR,
    possibleMoves: [],
    enPassant: false,
  },
  {
    image: `assets/images/w_pawn.png`,
    position: {
      x: 3,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.OUR,
    possibleMoves: [],
    enPassant: false,
  },
  {
    image: `assets/images/w_pawn.png`,
    position: {
      x: 4,
      y: 1,
    },
    type: PieceType.PAWN,
    possibleMoves: [],
    team: TeamType.OUR,
    enPassant: false,
  },
  {
    image: `assets/images/w_pawn.png`,
    position: {
      x: 5,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.OUR,
    enPassant: false,
    possibleMoves: [],
  },
  {
    image: `assets/images/w_pawn.png`,
    position: {
      x: 6,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.OUR,
    possibleMoves: [],
    enPassant: false,
  },
  {
    image: `assets/images/w_pawn.png`,
    position: {
      x: 7,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.OUR,
    possibleMoves: [],
    enPassant: false,
  },
];
