import constants from "../constants";
import {
  USER_DID_MOVE,
  USER_SET_MODE,
  USER_MOVE_FAILED,
  USER_RESET_GAME,
} from "../actionTypes/common";
import { isLastMove, getMoves } from "../selectors/common";
import store from "../store";

export const getNextMove = (userMove = []) => (
  async dispatch => {
    const state = store.getState();
    const moves = getMoves(state)
    const isFinalMove = isLastMove(state);
    let nextMoves = moves.concat(userMove);
  
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
