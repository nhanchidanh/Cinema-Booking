import { Pie } from "@ant-design/plots";
import React from "react";

const PieChart = ({ data }) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: "percent",
    colorField: "title",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};
export default PieChart;
