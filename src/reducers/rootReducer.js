import { combineReducers } from "redux";
import moves from "./moves";
import game from "./game";

const rootReducer = combineReducers({
  moves,
  game,
});

export default rootReducer;