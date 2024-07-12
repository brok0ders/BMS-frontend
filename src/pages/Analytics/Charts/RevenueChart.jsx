// src/components/RevenueChart.js
import React, { useContext, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import BillContext from "../../../context/bill/billContext";

const RevenueChart = () => {
  const [revenueChartData, setRevenueChartData] = useState([]);
  const { getRevenueChart } = useContext(BillContext);

  const getrevenueChartData = async () => {
    try {
      const data = await getRevenueChart();
      setRevenueChartData(data);
    } catch (error) {
      console.log(error);
      setRevenueChartData([]);
    }
  };

  let revenue = [];
  let months = [];
  if (revenueChartData && revenueChartData.length > 0) {
    revenue = revenueChartData.map((item) => item.revenue);
    months = revenueChartData.map((item) => item.month);
  }

  useEffect(() => {
    getrevenueChartData();
  }, []);

  return (
    <>
      {revenueChartData.length > 0 && (
        <Box sx={{ width: "100%", height: 400, padding: "20px" }}>
          <h1 className="text-3xl font-semibold">Sales</h1>
          <LineChart
            borderRadius={6}
            xAxis={[
              {
                id: "months",
                data: months,
                scaleType: "band",
              },
            ]}
            yAxis={[
              {
                id: "revenue",
              },
            ]}
            series={[
              {
                data: revenue,
                color: "orange",
                label: "Revenue",
              },
            ]}
            margin={{ left: 60, right: 10, top: 20, bottom: 50 }}
          />
        </Box>
      )}
    </>
  );
};

export default RevenueChart;
