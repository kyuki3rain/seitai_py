import "./App.css";
import eel from "./eel";
import React, { useState, useEffect } from "react";
import Init from "./Init";
import App from "./App";
import Graph from "./graph";

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
