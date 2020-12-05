import "./App.css";
import React, { useState, useEffect } from "react";
import eel from "./eel";

const modes = ["init", "app", "cal"]
const data_modes = ["serial", "test"]

const Init = ({ setMode, children }) => {
  const [ports, setPorts] = useState();
  const [selectValue, setSelectValue] = useState();
  const [dataValue, setDataValue] = useState("test");
  const [modeValue, setModeValue] = useState("cal");
  const [dataLength, setDataLength] = useState(1);

  const get_ports = async () => {
    const new_ports = await eel.get_ports()();
    setPorts(new_ports);
    setSelectValue(new_ports[0]);
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
            <select value={selectValue} onChange={(e)=>{
              setSelectValue(e.target.value)
            }}>
              {ports.map((port) => (
                <option value={port}>{port}</option>
              ))}
            </select>
          </div>
          <div class="row">
            <div>datamode select</div>
            <select value={dataValue} onChange={(e) =>{
              setDataValue(e.target.value)
              }}>
              {data_modes.map((data_mode) => (
                <option value={data_mode}>{data_mode}</option>
              ))}
            </select>
          </div>
          <div class="row">
            <div>mode select</div>
            <select value={modeValue} onChange={(e) => {
              setModeValue(e.target.value)
              }}>
              {modes.map((mode) => (
                <option value={mode}>{mode}</option>
              ))}
            </select>
          </div>
          <div class="row">
            <div>mode select</div>
            <input type="textarea" value={dataLength} onChange={(e) => {
              setDataLength(Number(e.target.value))
            }}></input>
          </div>
          <button
            onClick={() => {
              eel.set_args({ 
                port: selectValue,
                data_mode: dataValue,
                mode: modeValue,
                data_length: dataLength
               });
               setMode(modeValue);
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
