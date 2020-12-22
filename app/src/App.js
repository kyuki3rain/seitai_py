import "./App.css";
import React from "react";
import eel from "./eel";
import TetriPage from "./tetrimino/tetriPage"
import Graph from "./Graph";


const render_data = async (func) => {
  const result = await eel.get_result()();
  func(result);
};

const setFlagsFunction = (func) => {
  let id = setInterval(
    () => {
      render_data(func)
    }
  , 200);
  return () => {clearInterval(id)};
};

function App({setMode}) {
  return (
    <div class="row">
      <Graph setFlagsFunction={setFlagsFunction}></Graph>
      <TetriPage setFlagsFunction={setFlagsFunction} setMode={setMode}></TetriPage>
    </div>
  );
}

export default App;
