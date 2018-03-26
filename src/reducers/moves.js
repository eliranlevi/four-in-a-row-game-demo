import { USER_DID_MOVE, USER_RESET_GAME, REMOVE_LAST_MOVE } from "../actionTypes/common";

const moves = (state = [], action) => {
  switch (action.type) {
    case USER_DID_MOVE: {
      return action.nextMoves;
    }
    case USER_RESET_GAME: {
      return [];
    }
    case REMOVE_LAST_MOVE: {
      return state.slice(0, state.length - 1);
    }
    default: {
      return state;
    }
  }
};

export default moves;