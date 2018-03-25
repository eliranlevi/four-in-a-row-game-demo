import React from "react";

const MessageBar = ({
  isUserMoveFailed,
  isBoardFull,
  reset,
  winner,
}) => {
  const hasMessage = () => isUserMoveFailed || isBoardFull || winner;

  const boardFullMessage = (
    <div>
      <span className={"error"}>Game Over - No Winner </span>
      <button onClick={reset}>Play again</button>
    </div>
  );

  const moveNotAllowedMessage = (
    <span className={"error"}>Move is not allowed!</span>
  );

  const winnerMessage = (
    <div>
      <span className={winner === "User" ? "greet" : "error"}>{winner} won!</span>
      <button onClick={reset}>Play again</button>
    </div>
  );

  return (
    <div className={"message-bar"}>
      <h3 className={hasMessage() && "show"}>
        {
           winner
           ? winnerMessage
           : isBoardFull
           ? boardFullMessage
           : isUserMoveFailed 
           ? moveNotAllowedMessage
           : ''
        }
      </h3>
    </div>
  )
};

export default MessageBar;