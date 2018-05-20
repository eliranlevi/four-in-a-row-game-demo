import getFreeColumns from "./getFreeColumns";

const addMove = moves => {
  const freeColumns = getFreeColumns(moves);
  const moveIndex = Math.ceil(Math.random() * (freeColumns.length - 1));

  return moves.concat([
    +freeColumns[moveIndex]
  ]);
};

export default addMove;