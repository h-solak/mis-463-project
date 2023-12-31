import { Box, Grid } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import React, { useState, useEffect } from "react";

const GenrePieChart = ({ data }) => {
  // const [chartData, setChartData] = useState({});
  // Count the genres
  const genreCounts = data.reduce((acc, curr) => {
    const existingGenre = acc.find((item) => item.label === curr.genre);

    if (existingGenre) {
      existingGenre.value += 1;
    } else {
      acc.push({ label: curr.genre, value: 1 });
    }

    return acc;
  }, []);

  return (
    <PieChart
      series={[
        {
          data: genreCounts,
        },
      ]}
      height={250}
    />
  );
};

export default GenrePieChart;
