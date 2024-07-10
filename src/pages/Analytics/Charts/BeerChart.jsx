// src/components/BeerChart.js
import React from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";

const data = [
  { beer: "Beer A", sales: 120 },
  { beer: "Beer B", sales: 95 },
  { beer: "Beer C", sales: 80 },
  { beer: "Beer D", sales: 75 },
  { beer: "Beer E", sales: 60 },
];

const BeerChart = () => {
  // Map data to extract beer names and sales
  const beers = data.map((item) => item.beer);
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
      categories: beers,
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
      color: "#FF5733",
    },
  ];

  return (
    <Box sx={{ width: "100%", py: 5 }}>
      <h1 className="text-3xl px-10 font-semibold">Top Beer Brands</h1>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={450}
      />
    </Box>
  );
};

export default BeerChart;
