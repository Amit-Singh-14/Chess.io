import { PieceType, TeamType } from "../constant";

export class Piece {
  constructor({ image, position, type, team }) {
    this.image = image;
    this.position = position;
    this.type = type;
    this.team = team;
  }
}
