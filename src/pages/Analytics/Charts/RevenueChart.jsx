// src/components/RevenueChart.js
import React, { useContext, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import BillContext from "../../../context/bill/billContext";

const RevenueChart = () => {
  const [revenueChartData, setRevenueChartData] = useState([]);
  const { getRevenueChart } = useContext(BillContext);
  // get the chart data

  const getrevenueChartData = async () => {
    try {
      const data = await getRevenueChart();
      setRevenueChartData(data);
    } catch (error) {
      console.log(error);
      setRevenueChartData();
    }
  };
  let revenue;
  let months;
  if (revenueChartData && revenueChartData.length > 0) {
    revenue = revenueChartData?.map((item) => item.revenue);
    months = revenueChartData?.map((item) => item.month);
  }

  useEffect(() => {
    getrevenueChartData();
  }, []);

  // Map data to extract months and revenue

  return (
    <>
      {revenueChartData.length > 0 && (
        <Box sx={{ width: "100%", height: 400 }}>
          <h1 className="text-3xl font-semibold">Sales</h1>
          <LineChart
            borderRadius={6}
            xAxis={[
              {
                id: "barCategories",
                data: months,
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: revenue,
                color: "orange",
                label: "Revenue",
                barWidth: 0.5, // Reduce the width of the bars
              },
            ]}
          />
        </Box>
      )}
    </>
  );
};

export default RevenueChart;
