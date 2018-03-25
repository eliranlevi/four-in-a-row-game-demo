import { createSelector } from "reselect";
import { isUserMove, isEven, reduceMove, getWinnerName } from "../helpers";

const getGame = state => state.game;

export const getMoves = state => state.moves;

export const getMode = createSelector(getGame, game => game.mode);
export const getBoardSize = createSelector(getGame, game => game.size);
export const isUserEven = createSelector(getGame, game => game.isEven);
export const isUserMoveFailed = createSelector(getGame, game => game.isFailed);

export const getUserMoves = createSelector(
  [getMoves, isUserEven],
  (moves, isUserEven) => {
    return moves.filter((move, moveIndex) => {
      const isMoveEven = isEven(moveIndex);
      return isUserMove(isUserEven, isMoveEven);
    });
  }
);

export const getPCMoves = createSelector(
  [getMoves, isUserEven],
  (moves, isUserEven) => {
    return moves.filter((move, moveIndex) => {
      const isMoveEven = isEven(moveIndex);
      return !isUserMove(isUserEven, isMoveEven);
    });
  }
);

export const getDiagonalWinner = () => '';

export const getRowWinner = createSelector(
  [getUserMoves, getPCMoves, isUserEven, getBoardSize],
  (userMoves, pcMoves, isUserEven, boardSize) => {
  }
);

export const getColumnWinner = createSelector(
  [getUserMoves, getPCMoves, isUserEven, getBoardSize],
  (userMoves, pcMoves, isUserEven, boardSize) => {
    const userSum = userMoves.reduce((acc, move) => reduceMove(acc, move, boardSize), {});
    const pcSum = pcMoves.reduce((acc, move) => reduceMove(acc, move, boardSize), {});
    const isUserWon = Object.values(userSum).find(v => v === true);
    const isPcWon = Object.values(pcSum).find(v => v === true);

    return getWinnerName(isUserWon, isPcWon);
  }
);

export const getWinner = createSelector(
  [getRowWinner, getColumnWinner, getDiagonalWinner],
  (rowWinner, columnWinner, diagonalWinner) => (
    rowWinner || columnWinner || diagonalWinner
  )
);

export const isLastMove = createSelector(
  [getMoves, getBoardSize],
  (moves, boardSize) => (
    moves.length === Math.pow(boardSize, 2) - 1
  )
);

export const getBoardMoves = createSelector(
  [getMoves, getWinner],
  (moves, winner) => (
    winner === 'User' 
    ? moves.slice(0, moves.length - 1)
    : moves
  )
);