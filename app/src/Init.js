import "./App.css";
import React, { useState, useEffect } from "react";
import eel from "./eel";

const modes = ["application", "calibration", "create_data"]
const data_modes = ["serial", "test"]

const Init = ({ setMode }) => {
  const [ports, setPorts] = useState();
  const [selectValue, setSelectValue] = useState();
  const [dataValue, setDataValue] = useState("test");
  const [modeValue, setModeValue] = useState("application");
  const [dataLength, setDataLength] = useState(3);
  const [threshold, setThreshold] = useState(10);
  const [importFileName, setImportFileName] = useState("");
  const [flag, setFlag] = useState(null);

  const get_ports = async () => {
    const new_ports = await eel.get_ports()();
    setPorts(new_ports);
    setSelectValue(new_ports[0]);
  };

  const get_threshold = async () => {
    const new_threshold = await eel.get_threshold()();
    setThreshold(new_threshold);
  };
  const get_import_file_name = async () => {
    const new_import_file_name = await eel.get_import_file_name()();
    setImportFileName(new_import_file_name);
  };

  const validate = () => {
    console.log("validate start!")
    console.log(selectValue, dataValue, modeValue, importFileName, threshold);
    if(!selectValue && dataValue === "serial") return false;
    if(modeValue === "create_data" && dataValue === "test") return false;
    if(!dataLength) return false;
    if(modeValue === "create_data" && !importFileName) return false;
    if(dataValue === "test" && !importFileName) return false;
    if(!threshold && modeValue === "application") return false;

    return true;
  }

  useEffect(() => {
    get_ports();
    get_threshold();
    get_import_file_name();
    setFlag(null);
  }, []);
  if (ports) {
    return (
      <>
        <div class="column" style={{height: 450}}>
          <h1 style={{margin: 0}}>Options</h1>
          {flag === false ? <div style={{color: "red"}}>正しく動作しない設定になっています。もう一度確認してください。</div> : <></>}
          <div class="row" style={{width: 600}}>
            <div>port select</div>
            <select value={selectValue} class="input" onChange={(e)=>{
              setSelectValue(e.target.value)
            }}>
              {ports.map((port) => (
                <option value={port}>{port}</option>
              ))}
            </select>
          </div>
          <div class="row" style={{width: 600}}>
            <div class="title">datamode select</div>
            <select value={dataValue} class="input" onChange={(e) =>{
              setDataValue(e.target.value)
              }}>
              {data_modes.map((data_mode) => (
                <option value={data_mode}>{data_mode}</option>
              ))}
            </select>
          </div>
          <div class="row" style={{width: 600}}>
            <div class="title">mode select</div>
            <select value={modeValue} class="input" onChange={(e) => {
              setModeValue(e.target.value)
              }}>
              {modes.map((mode) => (
                <option value={mode}>{mode}</option>
              ))}
            </select>
          </div>
          <div class="row" style={{width: 600}}>
            <div class="title">data length</div>
            <input type="textarea" class="input" value={dataLength} onChange={(e) => {
              setDataLength(Number(e.target.value))
            }}></input>
          </div>
          <div class="row" style={{width: 600}}>
            <div class="title">threshold</div>
            <input type="textarea" class="input" value={threshold} onChange={(e) => {
              setThreshold(Number(e.target.value))
            }}></input>
          </div>

          <div class="row" style={{width: 600}}>
            <div class="title">file_name</div>
            <input type="textarea" class="input_long" value={importFileName} onChange={(e) => {
              setImportFileName(e.target.value)
            }}></input>
          </div>
          <button
            onClick={() => {
              const new_flag = validate();
              console.log(new_flag);
              setFlag(new_flag);
              if(new_flag){
                eel.set_args({ 
                  port: selectValue,
                  data_mode: dataValue,
                  mode: modeValue,
                  data_length: dataLength,
                  threshold: threshold,
                  import_file_name: importFileName
                 });
                 setMode(modeValue);
              }
              else{
                console.log("validate error!");
              }
            }}
            style={{height: 45, width: 300}}
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
