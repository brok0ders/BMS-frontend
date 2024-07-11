// src/components/LiquorChart.js
import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";
import BillContext from "../../../context/bill/billContext";

const LiquorChart = () => {
  // Map data to extract Liquor names and sales

  const [liquorChartData, setliquorChartData] = useState([]);
  const { getLiquorChart } = useContext(BillContext);
  // get the chart data

  const getliquorChartData = async () => {
    try {
      const data = await getLiquorChart();
      setliquorChartData(data);
    } catch (error) {
      console.log(error);
      setliquorChartData();
    }
  };

  let sales;
  let Liquors;
  if (liquorChartData && liquorChartData.length > 0) {
    sales = liquorChartData?.map((item) => item.totalQuantity);
    Liquors = liquorChartData?.map((item) => item.brand);
  }

  useEffect(() => {
    getliquorChartData();
  }, []);

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
