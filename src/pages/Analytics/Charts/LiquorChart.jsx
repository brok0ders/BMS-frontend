// src/components/LiquorChart.js
import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";
import BillContext from "../../../context/bill/billContext";

const LiquorChart = () => {
  const [liquorChartData, setliquorChartData] = useState([]);
  const { getLiquorChart } = useContext(BillContext);

  const getliquorChartData = async () => {
    try {
      const data = await getLiquorChart();
      setliquorChartData(data);
    } catch (error) {
      console.log(error);
      setliquorChartData([]);
    }
  };

  let sales = [];
  let Liquors = [];
  if (liquorChartData && liquorChartData.length > 0) {
    sales = liquorChartData.map((item) => item.totalQuantity);
    Liquors = liquorChartData.map((item) => item.brand);
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
        columnWidth: "60",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: Liquors,
      labels: {
        show: false,
      },
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
    responsive: [
      {
        breakpoint: 768, // devices with width less than 768px
        options: {
          plotOptions: {
            bar: {
              columnWidth: "50",
            },
          },
        },
      },
      {
        breakpoint: 480, // devices with width less than 480px
        options: {
          plotOptions: {
            bar: {
              columnWidth: "40",
            },
          },
        },
      },
    ],
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
