import ReduxThunk from "redux-thunk";
import { applyMiddleware } from "redux";

const middlewares = applyMiddleware(ReduxThunk);

export default middlewares;