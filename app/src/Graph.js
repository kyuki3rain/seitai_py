import "./App.css";
import React, { useState } from "react";
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

function Graph() {
  const nameList = ["a", "b", "c", "d", "e"];
  const defaultDataList = nameList.map((name) => ({
    name: name,
    data: [],
  }));
  const [dataList, setDataList] = useState(defaultDataList);

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

  useInterval(() => {
    render_data();
  }, 100);

  if (dataList) {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: 200, height: 150 }}>
          <RealtimeLineChart dataList={[dataList[0]]} />
        </div>
        <div style={{ width: 200, height: 150 }}>
          <RealtimeLineChart dataList={[dataList[1]]} />
        </div>
        <div style={{ width: 200, height: 150 }}>
          <RealtimeLineChart dataList={[dataList[2]]} />
        </div>
        <div style={{ width: 200, height: 150 }}>
          <RealtimeLineChart dataList={[dataList[3]]} />
        </div>
        <div style={{ width: 200, height: 150 }}>
          <RealtimeLineChart dataList={[dataList[4]]} />
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}

export default Graph;
