import { createSelector } from "reselect";
import { isUserMove, isEven, reduceMove, getWinnerName } from "../helpers";

const getGame = state => state.game;

export const getMoves = state => state.moves;

export const getMode = createSelector(getGame, game => game.mode);
export const getBoardSize = createSelector(getGame, game => game.size);
export const isUserEven = createSelector(getGame, game => game.isEven);
export const isUserMoveFailed = createSelector(getGame, game => game.isFailed);

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
  [getMovesByColumn, getBoardSize],
  (movesByColumn, boardSize) => {
    const columns = Object.values(movesByColumn);
    const revColumns = [...columns].reverse();
    let column = columns[0];
    let rowBy = column[0];
    let noWinner = '';
    let count = 0;

    for (let i = 0; i < column.length; i++) {
      if (columns[i][i] === rowBy) {
        count++;
      }

      if (count === boardSize) {
        return rowBy;
      }
    }

    column = revColumns[0];
    rowBy = column[0];
    count = 0;

    for (let i = 0; i < column.length; i++) {
      if (revColumns[i][i] === rowBy) {
        count++;
      }

      if (count === boardSize) {
        return rowBy;
      }
    }

    return noWinner;
  }
);

export const getRowWinner = createSelector(
  [getMovesByColumn, getBoardSize],
  (movesByColumn, boardSize) => {
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
  [getMovesByColumn, getBoardSize],
  (movesByColumn, boardSize) => {
    const noWinner = '';

    for (let i = 0; i < boardSize; i++) {
      const column = movesByColumn[i];
      const columnBy = column[0];
      let count  = 0;

      for (let j = 0; j < column.length; j++) {
        if (column[j] === columnBy) {
          count++;
        }

        if (count === boardSize) {
          return columnBy;
        }
      }
    }

    return noWinner;
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