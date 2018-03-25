import React from "react";
import BoardContainer from "../containers/BoardContainer";
import StartContainer from "../containers/StartContainer";

const App = ({
  mode,
}) => (
  <div>
    {mode === 'PLAY' 
     ? <BoardContainer /> 
     : <StartContainer />}
  </div>
);

export default App;