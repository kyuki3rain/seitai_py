import "./App.css";
import { eel } from "./eel.js";
import React, { useState, useEffect } from "react";

function Start() {
  const [options, setOptions] = useState();
  const [value, setValue] = useState();
  const setOption = (arr, selectedName) => {
    const new_options = arr.map((name) => {
      return <option value={name}>{name}</option>;
    });
    setValue(selectedName);
    setOptions(new_options);
  };
  useEffect(() => {
    eel.expose(setOption);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <select name="number" value={value}>
          {options}
        </select>
        <button
          onClick={() => {
            eel.setArgs({
              value,
            });
          }}
        >
          start
        </button>
      </header>
    </div>
  );
}

export default Start;
