import { getMode } from "../selectors/common";
import { setMode } from "../actions/common";
import { connect } from "react-redux";
import App from "../components/App";

const mapStateToProps = state => ({
  mode: getMode(state),
});

export default connect(mapStateToProps, {
  setMode,
})(App);