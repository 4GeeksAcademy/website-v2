import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Chart from "react-google-charts";
const labelCustom = styled.div`
  font-family: "Lato";

  font-size: 5px;
  color: red;
`;
// const data = [["Task", "Years"], ["Work", 26], ["Eat", 30], ["Commute", 44]];
const options = {
  title: "Ages",
  pieHole: 0.5,
  is3D: false,
};
export const Charts = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadChartData = async (propData) => {
      var dataArray = [];
      if (propData) {
        for (let i of propData.dataArray) {
          dataArray.push(i);
        }
        for (let x = 0; x < dataArray.length; x++) {
          if (x > 0) {
            dataArray[x][1] = parseInt(dataArray[x][1]);
          }
        }
      }
      setData(dataArray);
    };
    loadChartData(props);
  }, []);

  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="250px"
      data={data ? data : null}
      options={{
        legend: "none",
        pieHole: 0.5,
        is3D: false,
        // slices: {
        //     0: {color: "yellow"},
        //     1: {color: "red"},
        //     2: {color: "blue"}
        // },
        animation: {
          startup: true,
          easing: "linear",
          duration: 5500,
        },
      }}
    />
  );
};
