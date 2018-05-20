const getColumnsCount = moves => {
  return moves.reduce(
    (acc, move) => {
      acc[move]++;
      return acc;
    },
    { 0: 0, 1: 0, 2: 0, 3: 0 }
  )
};

export default getColumnsCount;