export const isUserMove = (isUserEven, isMoveEven) => (
  (isUserEven && isMoveEven) || (!isUserEven && !isMoveEven)
);

export const isEven = num => (
  num % 2 === 0
);

export const reduceMove = (acc, move, boardSize) => {
  acc[move] = !acc[move] ? 1 : acc[move] + 1;

  if (acc[move] === boardSize) {
    acc[move] = true;
  }

  return acc;
};

export const getWinnerName = (isUserWon, isPcWon) => (
  isUserWon
   ? 'User'
   : isPcWon
   ? 'PC'
   : ''
);

export const getColumnMoves = (columnNum, moves) => (
  moves.filter(move => move === columnNum)
);