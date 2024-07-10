// src/components/LiquorChart.js
import React from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";

const data = [
  { Liquor: "Liquor A", sales: 120 },
  { Liquor: "Liquor B", sales: 95 },
  { Liquor: "Liquor C", sales: 80 },
  { Liquor: "Liquor D", sales: 75 },
  { Liquor: "Liquor E", sales: 60 },
];

const LiquorChart = () => {
  // Map data to extract Liquor names and sales
  const Liquors = data.map((item) => item.Liquor);
  const sales = data.map((item) => item.sales);

  const options = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        borderRadiusApplication: "end",
        columnWidth: "45%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: Liquors,
    },
    yaxis: {
      title: {
        text: "Sales",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " sales";
        },
      },
    },
  };

  const series = [
    {
      name: "Sales",
      data: sales,
      color: "#734f96",
    },
  ];

  return (
    <Box sx={{ width: "100%", py: 5 }}>
      <h1 className="text-3xl px-10 font-semibold">Top Liquor Brands</h1>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={450}
      />
    </Box>
  );
};

export default LiquorChart;
