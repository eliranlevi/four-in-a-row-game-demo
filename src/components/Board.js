import React, { Component } from "react";
import BoardCol from "./BoardCol";
import MessageBar from "./MessageBar";
import { isEven } from "../helpers";
import "../styles/board.css";

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: this.createBoard(props.boardSize),
    };
  }

  createBoard(size) {
    return Array(size).fill().map((r, ind) => ind)
  }

  getColumnMoves = columnNum => {
    return this.props.moves.reduce((acc, move, index) => {
      const moveBy = this.isUserMove(index) ? "User" : "PC";
    
      move === columnNum && acc.push(moveBy);

      return acc;
    }, []);
  }

  isUserMove = moveIndex => {
    return (this.props.isUserEven && isEven(moveIndex)) || 
           (!this.props.isUserEven && !isEven(moveIndex));
  }

  isBoardFull = () => {
    return this.props.moves.length === Math.pow(this.props.boardSize, 2);
  }

  reset = () => {
    this.props.resetGame();
  }

  render() {
    return (
      <div className={"board"}>
        <h1>9DT</h1>
        <MessageBar isUserMoveFailed={this.props.isUserMoveFailed}
                    isBoardFull={this.isBoardFull()}
                    reset={this.reset} 
                    winner={this.props.winner} />
        <div className={"board-columns"}>
          {this.state.board.map(num => (
            <BoardCol key={num}
                      num={num}
                      isGameOver={this.isBoardFull() || this.props.winner}
                      onUserClick={lastMove => this.props.getNextMove(this.props.moves, [lastMove])}
                      moves={this.getColumnMoves(num)}
                      colSize={this.props.boardSize} />
          ))}
        </div>
      </div>
    );
  }
}

export default Board;