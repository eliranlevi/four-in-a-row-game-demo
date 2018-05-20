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
     <p className='caption'>{ `With ♥ by Eliran Levi` }</p>
  </div>
);

export default App;