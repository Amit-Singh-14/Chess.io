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
        this.checkKingMoves();
    }

    checkKingMoves() {
        const king = this.pieces.find(p => p.isKing && p.team === TeamType.OPPONENT);

        if (king?.possibleMoves === undefined) return;

        // Simulate king moves
        for (const move of king.possibleMoves) {
            const simulatedBoard = this.copy();

            const pieceAtDestination = simulatedBoard.pieces.find(p => p.samePosition(move));

            // If there is a piece at the destination remove it
            if (pieceAtDestination !== undefined) {
                simulatedBoard.pieces = simulatedBoard.pieces.filter(p => !p.samePosition(move));
            }

            // We tell the compiler that the simulated king is always present
            const simulatedKing = simulatedBoard.pieces.find(p => p.isKing && p.team === TeamType.OPPONENT);
            simulatedKing!.position = move;

            for (const enemy of simulatedBoard.pieces.filter(p => p.team === TeamType.OUR)) {
                enemy.possibleMoves = simulatedBoard.getValidMoves(enemy, simulatedBoard.pieces);
            }

            let safe = true;

            // Determine if the move is safe
            for (const p of simulatedBoard.pieces) {
                if (p.team === TeamType.OPPONENT) continue;

                if (p.isPawn) {
                    const possiblePawnMoves = simulatedBoard.getValidMoves(p, simulatedBoard.pieces);

                    if (possiblePawnMoves?.some(ppm => ppm.x !== p.position.x
                        && ppm.samePosition(move))) {
                        safe = false;
                        break;
                    }
                } else if (p.possibleMoves?.some(p => p.samePosition(move))) {
                    safe = false;
                    break;
                }
            }

            // Remove the move from possibleMoves
            if (!safe) {
                king.possibleMoves = king.possibleMoves?.filter(m => !m.samePosition(move))
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
    
    playMove(validMove : boolean,enPassantMove: boolean,playedPiece: Piece,
        destination : Position): boolean{

            console.log(playedPiece);
            
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

        return new Board(this.pieces.map(p =>  p.clone()));
    }


}