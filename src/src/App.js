import "./App.css";
import React, { useState, useEffect } from "react";
import Start from "./start";
import { eel } from "./eel.js";

function App() {
  const [mode, setMode] = useState();
  useEffect(() => {
    eel.expose(setMode);
  }, []);

  let Main = <></>;

  if (mode === "start") {
    Main = Start;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Main></Main>
      </header>
    </div>
  );
}

export default App;
