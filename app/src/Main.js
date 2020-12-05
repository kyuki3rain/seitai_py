import "./App.css";
import eel from "./eel";
import React, { useState, useEffect } from "react";
import Init from "./Init";
import App from "./App";
import Graph from "./graph";
import useInterval from "use-interval";

function Main() {
  const [mode, setMode] = useState();
  const get_mode = async () => {
    console.log("get_mode ok!");
    const new_mode = await eel.get_mode()();
    console.log(new_mode);
    setMode(new_mode);
  };

  useEffect(() => {
    get_mode();
  }, []);
  useEffect(()=>{
    if(mode === "cal"){
      eel.start_app();
    }
  },[mode])
  useInterval(() => {
    if (mode == "cal") {
      get_mode();
    }
  }, 1000);

  if (mode === "init") {
    return <Init setMode={setMode}></Init>;
  }
  if (mode === "app") {
    return (
      <div>
        <App></App>
        <Graph></Graph>
      </div>
    );
  }

  return <div>loading...</div>;
}

export default Main;
