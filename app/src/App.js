import "./App.css";
import React, { useEffect, useState } from "react";
import eel from "./eel";
import useInterval from "use-interval";

function App() {
  const [flags, setFlags] = useState();

  const render_data = async () => {
    const result = await eel.get_result()();
    setFlags(result);
  };

  useEffect(() => {
    console.log("app load!");
    eel.start_app();
  }, []);

  useInterval(() => {
    render_data();
  }, 1000);
  if (flags) {
    return (
      <>
        <div
          style={{
            height: 400,
            width: 1000,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {flags.map((flag) => {
            const color = flag >= 0.5 ? "red" : "white";
            return (
              <div
                style={{ width: 190, height: 190, backgroundColor: color }}
              ></div>
            );
          })}
        </div>
      </>
    );
  } else {
    return <div>loading...</div>;
  }
}

export default App;
