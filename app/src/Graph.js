import "./App.css";
import React, { useEffect, useState } from "react";
import eel from "./eel";
import useInterval from "use-interval";
import RealtimeLineChart from "./RealtimeLineChart";

const addData = (data, time, new_data) => {
  if (data.length > 50) data.shift();
  return [
    ...data,
    {
      x: time,
      y: new_data,
    },
  ];
};

function Graph({setFlagsFunction}) {
  const nameList = ["a", "b", "c"];
  const defaultDataList = nameList.map((name) => ({
    name: name,
    data: [],
  }));
  const [dataList, setDataList] = useState(defaultDataList);
  const [flags, setFlags] = useState();
  const [delay, setDelay] = useState(100);

  const render_data = async () => {
    const new_data = await eel.get_data()();
    console.log(new_data);
    setDataList(
      dataList.map((val, i) => {
        // ラベルごとにデータを更新する
        return {
          name: val.name,
          data: addData(val.data, new_data[0], new_data[i + 1]),
        };
      })
    );
  };

  useEffect(()=>{
    let clear_func = setFlagsFunction(setFlags);
    setDelay(100);
    return () => {
      clear_func();
      setDelay(null);
    };
  },[]);

  useInterval(() => {
    render_data(setFlags);
  }, delay);

  if (dataList && flags) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "crenter", justifyContent: "space-around", height: 600 }}>
        <div style={{ width: 200, height: 150, backgroundColor: flags[0] ? "red" : "white"}}>
          <RealtimeLineChart dataList={[dataList[0]]} />
        </div>
        <div style={{ width: 200, height: 150, backgroundColor: flags[1] ? "red" : "white" }}>
          <RealtimeLineChart dataList={[dataList[1]]} />
        </div>
        <div style={{ width: 200, height: 150, backgroundColor: flags[2] ? "red" : "white" }}>
          <RealtimeLineChart dataList={[dataList[2]]} />
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}

export default Graph;
