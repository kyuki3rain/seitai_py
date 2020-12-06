import "./App.css";
import eel from "./eel";
import React, { useState, useEffect } from "react";
import Init from "./Init";
import App from "./App";
import Graph from "./Graph";
import useInterval from "use-interval";

function Main() {
  const [mode, setModeState] = useState();
  const get_mode = async () => {
    const new_mode = await eel.get_mode()();
    console.log("get_mode ok!");
    console.log(new_mode);
    setMode(new_mode);
  };

  const setMode = (new_mode) => {
    setModeState(new_mode);
    eel.set_args({mode: new_mode});
  }

  useEffect(() => {
    get_mode();
  }, []);
  useEffect(()=>{
    if(mode !== "init"){
      eel.start_app();
    }
  },[mode])
  useInterval(() => {
    if (mode === "calibration") {
      get_mode();
    }
  }, 1000);

  if (mode === "init") {
    return <Init setMode={setMode}></Init>;
  }
  if (mode === "application") {
    return (
      <div>
        <App setMode={setMode}></App>
        {/* <Graph></Graph> */}
      </div>
    );
  }
  if(mode === "calibration"){
    return <div>calibration now...</div>
  }

  return <div>loading...</div>;
}

export default Main;
