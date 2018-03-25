import constants from "../constants";
import {
  USER_DID_MOVE,
  USER_SET_MODE,
  USER_MOVE_FAILED,
  USER_RESET_GAME,
} from "../actionTypes/common";
import { isLastMove } from "../selectors/common";
import store from "../store";

export const getNextMove = (moves, userMove = []) => (
  async dispatch => {
    let nextMoves = moves.concat(userMove);
    const isFinalMove = isLastMove(store.getState());
  
    try {
      const resp = !isFinalMove && await fetch(constants.api(nextMoves));

      nextMoves = isFinalMove ? nextMoves : await resp.json();
      
      dispatch({
        type: USER_DID_MOVE,
        nextMoves,
      });
    } 
    catch (err) {
      dispatch({
        type: USER_MOVE_FAILED,
      });
    }
  }
);

export const setMode = ({ mode, isEven }) => (
  dispatch => (
    dispatch({
      type: USER_SET_MODE,
      mode,
      isEven,
    })
  )
)

export const resetGame = () => (
  dispatch => (
    dispatch({
      type: USER_RESET_GAME,
    })
  )
);
