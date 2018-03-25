import { connect } from "react-redux";
import Board from "../components/Board";
import {
  getBoardSize,
  getBoardMoves,
  isUserEven,
  isUserMoveFailed,
  getWinner,
} from "../selectors/common";
import { getNextMove, resetGame } from "../actions/common";

const mapStateToProps = state => ({
  moves: getBoardMoves(state),
  boardSize: getBoardSize(state),
  isUserEven: isUserEven(state),
  isUserMoveFailed: isUserMoveFailed(state),
  winner: getWinner(state),
});

export default connect(mapStateToProps, {
  getNextMove,
  resetGame,
})(Board);