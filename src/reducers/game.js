import { 
  USER_SET_MODE, 
  USER_DID_MOVE, 
  USER_MOVE_FAILED, 
  USER_RESET_GAME, 
} from "../actionTypes/common";

const game = (state = { mode: '', isEven: true, size: 4, isFailed: false }, action) => {
  switch (action.type) {
    case USER_SET_MODE: {
      return {
        ...state,
        mode: action.mode,
        isEven: action.isEven,
      };
    }
    case USER_DID_MOVE: {
      return {
        ...state,
        isFailed: false,
      };
    }
    case USER_MOVE_FAILED: {
      return {
        ...state,
        isFailed: true,
      };
    }
    case USER_RESET_GAME: {
      return {
        mode: '',
        size: 4,
        isFailed: false,
        isEven: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default game;