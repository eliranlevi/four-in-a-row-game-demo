import { connect } from "react-redux";
import Board from "../components/Board";
import {
  getBoardSize,
  getMovesByColumn,
  isUserEven,
  isUserMoveFailed,
  getWinner,
  isBoardFull,
  isGameOver,
} from "../selectors/common";
import { getNextMove, resetGame } from "../actions/common";

const mapStateToProps = state => ({
  moves: getMovesByColumn(state),
  boardSize: getBoardSize(state),
  isUserEven: isUserEven(state),
  isUserMoveFailed: isUserMoveFailed(state),
  winner: getWinner(state),
  isBoardFull: isBoardFull(state),
  isGameOver: isGameOver(state),
});

export default connect(mapStateToProps, {
  getNextMove,
  resetGame,
})(Board);