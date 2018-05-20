import constants from "./constatns";
import getColumnsCount from "./getColumnsCount";

const getFreeColumns = moves => {
  const columnsCount = getColumnsCount(moves);
  const columns = Object.keys(columnsCount);

  return columns.filter(key => (
    columnsCount[key] < constants.boardSize
  ));
};

export default getFreeColumns;