import constants from './constatns';
import getColumnsCount from './getColumnsCount';

const isBoardFull = moves => {
  const boardSize = Math.pow(constants.boardSize, 2);
  
  return moves.length >= boardSize;
};

const isAnyColumnOverloaded = moves => {
  const columnsCount = getColumnsCount(moves);
  const columns = Object.keys(columnsCount);

  return columns.some(key => +columnsCount[key] > constants.boardSize)
};

const isValidMove = moves => (
  ! (isBoardFull(moves) || isAnyColumnOverloaded(moves))
);

export default isValidMove;