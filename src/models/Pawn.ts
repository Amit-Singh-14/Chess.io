import { PieceType, TeamType } from "../Types";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Pawn extends Piece{
    enPassant?: boolean;
    
    constructor(position: Position , team: TeamType , enPassant? : boolean ,possibleMove : Position[] = []){
       super(position, PieceType.PAWN,team, possibleMove);
       this.enPassant = enPassant;
    }

    clone(): Pawn{
        return new Pawn(this.position.clone(), this.team, this.enPassant, this.possibleMoves?.map(m => m.clone()));
    }
} 