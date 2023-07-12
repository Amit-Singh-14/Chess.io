import { useEffect, useRef, useState } from "react";
import ChessBoard from "../chessBoard/ChessBoard";
import { PieceType, TeamType, initialBoardState, samePosition } from "../../constant";
import { getPossiblePawnMove, pawnMove } from "../referee/rules/Pawn";
import { getPossibleKnightMove, knightMove } from "../referee/rules/Knight";
import { bishopMove, getPossibleBishopMove } from "../referee/rules/Bishop";
import { getPossibleRookMove, rookMove } from "../referee/rules/Rook";
import { getPossibleQueenMove, queenMove } from "../referee/rules/Queen";
import { getPossibleQKingMove, kingMove } from "../referee/rules/King";

function Referee() {
  const [pieces, setPieces] = useState(initialBoardState);
  const [promotionPawn, setPromotionPawn] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    updatePossibleMove();
  }, []);

  function updatePossibleMove() {
    setPieces((currentPiece) => {
      return currentPiece.map((p) => {
        p.possibleMoves = getValidMove(p, currentPiece);
        return p;
      });
    });
  }

  function playMove(playedPiece, destination) {
    const validMove = isValidMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    );

    const enPassantMove = isEnPassantMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    );

    const pawnDirection = playedPiece.team === TeamType.OUR ? 1 : -1;

    if (enPassantMove) {
      const updatePieces = pieces.reduce((result, piece) => {
        if (samePosition(piece.position, playedPiece.position)) {
          piece.enPassant = false;
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          result.push(piece);
        } else if (
          !samePosition(piece.position, { x: destination.x, y: destination.y - pawnDirection })
        ) {
          if (piece.type === PieceType.PAWN) {
            piece.enPassant = false;
          }
          result.push(piece);
        }
        return result;
      }, []);
      updatePossibleMove();
      setPieces(updatePieces);
    }

    // valid move
    else if (validMove) {
      const updatedPieces = pieces.reduce((result, piece) => {
        if (samePosition(piece.position, playedPiece.position)) {
          if (
            Math.abs(playedPiece.position.y - destination.y) === 2 &&
            piece.type === PieceType.PAWN
          ) {
            piece.enPassant = true;
          } else {
            piece.enPassant = false;
          }
          piece.position.x = destination.x;
          piece.position.y = destination.y;

          let promotionRow = piece.team === TeamType.OUR ? 7 : 0;

          if (destination.y === promotionRow && piece.type === PieceType.PAWN) {
            // console.log("this piece is ready for pormtoion");
            modalRef.current.classList.remove("hidden");
            setPromotionPawn(piece);
          }
          result.push(piece);
        } else if (!samePosition(piece.position, { x: destination.x, y: destination.y })) {
          if (piece.type === PieceType.PAWN) {
            piece.enPassant = false;
          }
          result.push(piece);
        }
        return result;
      }, []);
      updatePossibleMove();
      setPieces(updatedPieces);
    } else {
      return false;
    }
    return true;
  }

  function isEnPassantMove(initialPosition, desiredPosition, type, team) {
    const pawnDirection = team === TeamType.OUR ? 1 : -1;
    if (type === PieceType.PAWN) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = pieces.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.enPassant
        );
        if (piece) {
          return true;
        }
      }
    }
    return false;
  }

  function isValidMove(initialPosition, desiredPosition, type, team) {
    let validMove = false;

    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMove(initialPosition, desiredPosition, team, pieces);
        break;

      case PieceType.KNIGHT:
        validMove = knightMove(initialPosition, desiredPosition, team, pieces);
        break;

      case PieceType.BISHOP:
        validMove = bishopMove(initialPosition, desiredPosition, team, pieces);
        break;

      case PieceType.ROOK:
        validMove = rookMove(initialPosition, desiredPosition, team, pieces);
        break;

      case PieceType.QUEEN:
        validMove = queenMove(initialPosition, desiredPosition, team, pieces);
        break;

      case PieceType.KING:
        validMove = kingMove(initialPosition, desiredPosition, team, pieces);
        break;
      default:
        validMove = false;
    }
    return validMove;
  }

  function getValidMove(piece) {
    switch (piece.type) {
      case PieceType.PAWN:
        return getPossiblePawnMove(piece, pieces);

      case PieceType.KNIGHT:
        return getPossibleKnightMove(piece, pieces);

      case PieceType.BISHOP:
        return getPossibleBishopMove(piece, pieces);

      case PieceType.ROOK:
        return getPossibleRookMove(piece, pieces);

      case PieceType.QUEEN:
        return getPossibleQueenMove(piece, pieces);

      case PieceType.KING:
        return getPossibleQKingMove(piece, pieces);

      default:
        return [];
    }
  }
  function promotePawn(pieceType) {
    const updatedPieces = pieces.reduce((result, piece) => {
      if (samePosition(piece.position, promotionPawn.position)) {
        piece.type = pieceType;
        const teamType = piece.team === TeamType.OUR ? "w" : "b";

        let image = "";
        switch (pieceType) {
          case PieceType.ROOK:
            image = "rook";
            break;
          case PieceType.QUEEN:
            image = "queen";
            break;
          case PieceType.KNIGHT:
            image = "knight";
            break;
          case PieceType.BISHOP:
            image = "bishop";
            break;

          default:
        }
        piece.image = `assets/images/${teamType}_${image}.png`;
      }
      result.push(piece);
      return result;
    }, []);
    updatePossibleMove();
    setPieces(updatedPieces);
    modalRef.current.classList.add("hidden");
  }

  // promotionteam type
  function promotionTeamType() {
    return promotionPawn?.team === TeamType.OUR ? "w" : "b";
  }

  return (
    <>
      <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
        <div className="modal-body">
          <img
            onClick={() => promotePawn(PieceType.ROOK)}
            src={`/assets/images/${promotionTeamType()}_rook.png`}
            alt="sdfsdfsdf"
          />
          <img
            onClick={() => promotePawn(PieceType.QUEEN)}
            src={`/assets/images/${promotionTeamType()}_queen.png`}
            alt="sdfsdfsdf"
          />
          <img
            onClick={() => promotePawn(PieceType.BISHOP)}
            src={`/assets/images/${promotionTeamType()}_bishop.png`}
            alt="sdfsdfsdf"
          />
          <img
            onClick={() => promotePawn(PieceType.KNIGHT)}
            src={`/assets/images/${promotionTeamType()}_knight.png`}
            alt="sdfsdfsdf"
          />
        </div>
      </div>
      <ChessBoard playMove={playMove} pieces={pieces} />
    </>
  );
}

export default Referee;
