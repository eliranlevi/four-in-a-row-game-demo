import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";
import preloadedState from "./preloadedState";
import middlewares from "./middlewares";

const store = createStore(
  rootReducer,
  preloadedState,
  middlewares,
);

export default store;