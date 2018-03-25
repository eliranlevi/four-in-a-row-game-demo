import { USER_DID_MOVE, USER_RESET_GAME } from "../actionTypes/common";

const moves = (state = [], action) => {
  switch (action.type) {
    case USER_DID_MOVE: {
      return action.nextMoves;
    }
    case USER_RESET_GAME: {
      return [];
    }
    default: {
      return state;
    }
  }
};

export default moves;