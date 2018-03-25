import { connect } from "react-redux";
import { setMode, getNextMove } from "../actions/common";
import Start from "../components/Start";

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  setMode,
  getNextMove,
})(Start);