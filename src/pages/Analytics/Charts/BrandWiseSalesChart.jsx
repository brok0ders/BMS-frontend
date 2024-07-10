import React from "react";
import Chart from "react-apexcharts";

const salesData = [283, 94];

const BrandWiseSalesChart = () => {
  const series = salesData.map((item) => item);

  const options = {
    chart: {
      type: "pie",
    },
    labels: ["Beer", "liquor"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="py-5 pb-10">
      <Chart options={options} series={series} type="pie" width="350" />
    </div>
  );
};

export default BrandWiseSalesChart;
