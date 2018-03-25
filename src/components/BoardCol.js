import React from "react";
import Token from "./Token";

const BoardCol = ({
  num,
  moves,
  colSize,
  onUserClick,
  isGameOver,
}) => (
  <div className={`board-column ${isGameOver && "disabled"}`}
       onClick={() => !isGameOver && onUserClick(num)}>
    <div className={"pad-token"}>
      <Token key={num} by={"User"} />
    </div>
    <div className={"column-tokens"}>
      {Array(colSize).fill().map((v, index) => (
        <Token key={index} by={moves[index] || ''} />
      ))}
    </div>
  </div>
);

export default BoardCol;