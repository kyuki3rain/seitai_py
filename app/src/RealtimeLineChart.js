import React from "react";
import Chart from "react-apexcharts";

const RealtimeLineChart = (props) => {
  const options = {
    chart: {
      height: 500,
      width: 750,
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          enabled: true,
        },
      },
    },
    xaxis: {
      type: "datetime",
      range: 2,
    },
    yaxis: {
      show: false,
      min: 0,
      max: 200,
      labels: {
        formatter: (val) => val.toFixed(0),
      },
    },
  };
  return <Chart type="line" options={options} series={props.dataList} />;
};

export default RealtimeLineChart;
