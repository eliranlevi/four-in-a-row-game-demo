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

export const getMovesByColumn = createSelector(
  [getMoves, isUserEven, getBoardSize],
  (moves, isUserEven, boardSize) => {
    const movesByColumn = moves.reduce((acc, move, index) => {
      const moveBy = isUserMove(isUserEven, isEven(index)) ? "User" : "PC";
      
      acc[move] ? acc[move].push(moveBy) : acc[move] = [moveBy];

      return acc;
    }, {});

    for (let i = 0; i < boardSize; i++) {
      const colArr = movesByColumn[i] || [];
      const diff = boardSize - colArr.length;
      const diffArr = Array(diff).fill('');

      movesByColumn[i] = colArr.concat(diffArr);
    }

    return movesByColumn;
  }
);

export const getDiagonalWinner = createSelector(
  [getMovesByColumn, isUserEven, getBoardSize],
  (movesByColumn, isUserEven, boardSize) => {
    const columns = Object.values(movesByColumn);
    const revColumns = columns.reverse();
    let noWinner = '';

    for (let i = 0; i < boardSize; i++) {
      const column = columns[i];
      const rowBy = column[0];
      let count  = 0;

      for (let j = 0; j < column.length; j++) {
        if (columns[j][j] === rowBy) {
          count++;
        }

        if (count === boardSize) {
          return rowBy;
        }
      }
    }

    for (let i = 0; i < boardSize; i++) {
      const column = revColumns[i];
      const rowBy = column[i];
      let count  = 0;

      for (let j = 0; j < column.length; j++) {
        if (revColumns[j][j] === rowBy) {
          count++;
        }

        if (count === boardSize) {
          return rowBy;
        }
      }
    }

    return noWinner;
  }
);

export const getRowWinner = createSelector(
  [getMovesByColumn, isUserEven, getBoardSize],
  (movesByColumn, isUserEven, boardSize) => {
    const columns = Object.values(movesByColumn);
    let noWinner = '';

    for (let i = 0; i < boardSize; i++) {
      const column = columns[i];
      const rowBy = column[i];
      let count  = 0;

      for (let j = 0; j < column.length; j++) {
        if (columns[j][i] === rowBy) {
          count++;
        }

        if (count === boardSize) {
          return rowBy;
        }
      }
    }

    return noWinner;
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

export const isBoardFull = createSelector(
  [getMoves, getBoardSize],
  (moves, boardSize) => (
    moves.length === Math.pow(boardSize, 2)
  )
);

export const isGameOver = createSelector(
  [isBoardFull, getWinner],
  (isBoardFull, winner) => (
    winner !== '' || isBoardFull
  )
);