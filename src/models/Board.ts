import { PieceType, TeamType } from "../Types";
import {
  getCastlingMoves,
  getPossibleBishopMoves,
  getPossibleKingMoves,
  getPossibleKnightMoves,
  getPossiblePawnMoves,
  getPossibleQueenMoves,
  getPossibleRookMoves,
} from "../components/referee/rules";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Board {
  pieces: Piece[];
  totalTurn: number;

  constructor(pieces: Piece[], totalTurn: number) {
    this.pieces = pieces;
    this.totalTurn = totalTurn;
  }

  get currentTeam(): TeamType {
    return this.totalTurn % 2 === 0 ? TeamType.OPPONENT : TeamType.OUR;
  }

  calculateAllMoves() {
    for (const piece of this.pieces) {
      piece.possibleMoves = this.getValidMoves(piece, this.pieces);
    }

    // Calculating castling moves
    for (const king of this.pieces.filter((p) => p.isKing)) {
      if (king.possibleMoves === undefined) continue;

      king.possibleMoves = [...king.possibleMoves, ...getCastlingMoves(king, this.pieces)];
    }

    // if the current team moves are valid / if king danger cant move
    this.checkCurrentTeamMoves();

    // Remove the possible moves for the team that is not playing
    for (const piece of this.pieces.filter((p) => p.team !== this.currentTeam)) {
      piece.possibleMoves = [];
    }
  }

  checkCurrentTeamMoves() {
    // loop through all the current team pieces
    for (const piece of this.pieces.filter((p) => p.team === this.currentTeam)) {
      if (piece.possibleMoves === undefined) continue;

      //simulate all the piece moves
      for (const move of piece.possibleMoves) {
        const simulatedBoard = this.copy();

        // Remove the piece at the destination position
        simulatedBoard.pieces = simulatedBoard.pieces.filter((p) => !p.samePosition(move));

        // Get the piece of the cloned board
        const clonePiece = simulatedBoard.pieces.find((p) => p.samePiecePosition(piece))!;
        clonePiece.position = move.clone();

        // Get the king of the cloned board
        const cloneKing = simulatedBoard.pieces.find(
          (p) => p.isKing && p.team === simulatedBoard.currentTeam
        )!;

        // Loop through all enemy pieces, update their possible moves
        // And check if the current team's king will be in danger
        for (const enemy of simulatedBoard.pieces.filter(
          (p) => p.team !== simulatedBoard.currentTeam
        )) {
          enemy.possibleMoves = simulatedBoard.getValidMoves(enemy, simulatedBoard.pieces);

          if (enemy.isPawn) {
            if (
              enemy.possibleMoves.some(
                (m) => m.x !== enemy.position.x && m.samePosition(cloneKing.position)
              )
            ) {
              piece.possibleMoves = piece.possibleMoves?.filter((m) => !m.samePosition(move));
            }
          } else {
            if (enemy.possibleMoves.some((m) => m.samePosition(cloneKing.position))) {
              piece.possibleMoves = piece.possibleMoves?.filter((m) => !m.samePosition(move));
            }
          }
        }
      }
    }
  }

  getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
    switch (piece.type) {
      case PieceType.PAWN:
        return getPossiblePawnMoves(piece, boardState);
      case PieceType.KNIGHT:
        return getPossibleKnightMoves(piece, boardState);
      case PieceType.BISHOP:
        return getPossibleBishopMoves(piece, boardState);
      case PieceType.ROOK:
        return getPossibleRookMoves(piece, boardState);
      case PieceType.QUEEN:
        return getPossibleQueenMoves(piece, boardState);
      case PieceType.KING:
        return getPossibleKingMoves(piece, boardState);
      default:
        return [];
    }
  }

  playMove(
    validMove: boolean,
    enPassantMove: boolean,
    playedPiece: Piece,
    destination: Position
  ): boolean {
    console.log(playedPiece);

    const pawnDirection = playedPiece.team === TeamType.OUR ? 1 : -1;

    if (enPassantMove) {
      this.pieces = this.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          if (piece.isPawn) (piece as Pawn).enPassant = false;
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          piece.hasMoved = true;
          results.push(piece);
        } else if (
          !piece.samePosition(new Position(destination.x, destination.y - pawnDirection))
        ) {
          if (piece.type === PieceType.PAWN) {
            (piece as Pawn).enPassant = false;
          }
          results.push(piece);
        }

        return results;
      }, [] as Piece[]);

      this.calculateAllMoves();
      return true;
    } else if (validMove) {
      //UPDATES THE PIECE POSITION
      //AND IF A PIECE IS ATTACKED, REMOVES IT
      this.pieces = this.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          //SPECIAL MOVE
          (piece as Pawn).enPassant =
            Math.abs(playedPiece.position.y - destination.y) === 2 && piece.isPawn;
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          piece.hasMoved = true;

          results.push(piece);
        } else if (!piece.samePosition(destination)) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant = false;
          }
          results.push(piece);
        }

        return results;
      }, [] as Piece[]);

      this.calculateAllMoves();
      return true;
    } else {
      return false;
    }
  }

  copy(): Board {
    return new Board(
      this.pieces.map((p) => p.clone()),
      this.totalTurn
    );
  }
}
