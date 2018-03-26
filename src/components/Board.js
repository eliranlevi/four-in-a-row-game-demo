import React, { Component } from "react";
import BoardCol from "./BoardCol";
import MessageBar from "./MessageBar";
import "../styles/board.css";

class Board extends Component {
  getColumnMoves = columnNum => {
    return this.props.moves[columnNum];
  }

  reset = () => {
    this.props.resetGame();
  }

  render() {
    return (
      <div className={"board"}>
        <h1>9DT</h1>
        <MessageBar isUserMoveFailed={this.props.isUserMoveFailed}
                    isBoardFull={this.props.isBoardFull}
                    reset={this.reset} 
                    winner={this.props.winner} />
        <div className={"board-columns"}>
          {Object.values(this.props.moves).map((col, index) => (
            <BoardCol key={index}
                      num={index}
                      isGameOver={this.props.isGameOver}
                      onUserClick={lastMove => this.props.getNextMove([lastMove])}
                      moves={col}
                      colSize={this.props.boardSize} />
          ))}
        </div>
      </div>
    );
  }
}

export default Board;