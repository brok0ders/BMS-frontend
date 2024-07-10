// src/components/RevenueChart.js
import React from "react";
import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4000 },
  { month: "May", revenue: 3000 },
  { month: "Jun", revenue: 2000 },
  { month: "Jul", revenue: 4000 },
  { month: "Aug", revenue: 3000 },
  { month: "Sep", revenue: 4000 },
  { month: "Oct", revenue: 5000 },
  { month: "Nov", revenue: 3000 },
  { month: "Dec", revenue: 4000 },
];

const RevenueChart = () => {
  // Map data to extract months and revenue
  const months = data.map((item) => item.month);
  const revenue = data.map((item) => item.revenue);

  return (
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
  );
};

export default RevenueChart;
