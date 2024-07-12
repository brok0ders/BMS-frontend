import React from "react";
import Chart from "react-apexcharts";

const BrandWiseSalesChart = ({ beer, liquor }) => {
  const salesData = [beer, liquor];
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
      <h3 className="text-center text-xl md:text-3xl pb-5">
        Liquor v/s Beer Sales
      </h3>
      <Chart options={options} series={series} type="pie" width="350" />
    </div>
  );
};

export default BrandWiseSalesChart;
