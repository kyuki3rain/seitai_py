import "./App.css";
import React, { useState, useEffect } from "react";
import eel from "./eel";

const Init = ({ setMode, children }) => {
  const [ports, setPorts] = useState();
  const [selectValue, setSelectValue] = useState();

  const get_ports = async () => {
    const new_ports = await eel.get_ports()();
    setPorts(new_ports);
  };

  useEffect(() => {
    get_ports();
  }, []);
  if (ports) {
    return (
      <>
        <div>
          <div class="row">
            <div>port select</div>
            <select value={selectValue} onChange={setSelectValue}>
              {ports.map((port) => (
                <option value={port}>{port}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              eel.set_args({ port: selectValue });
              setMode("app");
            }}
          >
            start
          </button>
        </div>
      </>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Init;
