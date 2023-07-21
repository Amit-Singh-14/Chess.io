import { PieceType, TeamType } from "../Types";
import { getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossiblePawnMoves, getPossibleQueenMoves, getPossibleRookMoves } from "../components/referee/rules";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Board{

    pieces: Piece[];

    constructor(pieces: Piece[]){
        this.pieces = pieces;
    }

    calculateAllMoves(){    
        for(const piece of this.pieces){
            piece.possibleMoves =  this.getValidMoves(piece,this.pieces);
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
    
    playMove(validMove : boolean,
        enPassantMove: boolean,
        playedPiece: Piece,
        destination : Position): boolean{
        const pawnDirection = playedPiece.team === TeamType.OUR ? 1 : -1;
        if (enPassantMove) {
            this.pieces = this.pieces.reduce((results, piece) => {
                if (piece.samePiecePosition(playedPiece)) {
                    if(piece.isPawn)
                    (piece as Pawn).enPassant = false;
                    piece.position.x = destination.x;
                    piece.position.y = destination.y;
                    results.push(piece);
                } else if (
                    !piece.samePosition(new Position(destination.x, destination.y - pawnDirection) )
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
                        Math.abs(playedPiece.position.y - destination.y) === 2 &&
                        piece.isPawn

                    piece.position.x = destination.x;
                    piece.position.y = destination.y;


                    results.push(piece);
                } else if (!piece.samePosition((destination) )) {
                    if (piece.isPawn) {
                        (piece as Pawn).enPassant = false;
                    }
                    results.push(piece);
                }

                return results;
            }, [] as Piece[]);

           this.calculateAllMoves();
            return true
        } else {
            return false;
        }
    }


    copy(): Board{
        // return new Board(this.pieces);

        // const piecesClone = [];
        // for(const piece of this.pieces){{
        //     piecesClone.push(piece.clone());
        // }}

        return new Board(this.pieces.map(p =>  p.clone()));
    }


}