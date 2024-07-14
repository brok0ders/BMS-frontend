import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import { Box, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import { toast } from "react-toastify";
import AnalyticsCard from "./AnalyticsCard";

const months = [
  { name: "All Months", value: 0 },
  { name: "January", value: 1 },
  { name: "February", value: 2 },
  { name: "March", value: 3 },
  { name: "April", value: 4 },
  { name: "May", value: 5 },
  { name: "June", value: 6 },
  { name: "July", value: 7 },
  { name: "August", value: 8 },
  { name: "September", value: 9 },
  { name: "October", value: 10 },
  { name: "November", value: 11 },
  { name: "December", value: 12 },
];

const MonthlyAnalytics = () => {
  const [loading, seLoading] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);
  const [billType, setBillType] = useState("liquor");
  const [sizesData, setSizesData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const getMonthlyAnalytics = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(
        `/bill/analytics/monthly?billType=${billType}&month=${month}`,
        config
      );
      console.log(data?.data?.sizes);
      const sizesArray = Object.entries(data?.data?.sizes).map(
        ([size, total]) => ({
          size,
          total,
        })
      );
      const sortedArray = sizesArray.sort((a, b) => {
        // Extract numerical values from the size strings
        const sizeA = parseInt(a.size.replace("ml", ""), 10);
        const sizeB = parseInt(b.size.replace("ml", ""), 10);
        return sizeB - sizeA;
      });
      setSizesData(sortedArray);
      setMonthlyData(data?.data);
    } catch (error) {
      console.log(error);
      toast.warning("No Data Found");
      setMonthlyData();
      setSizesData([]);
    }
  };

  const handleChange = (e) => {
    setMonth(e.target.value);
  };

  useEffect(() => {
    getMonthlyAnalytics();
  }, [month, billType]);

  return (
    <div className="pt-20">
      <div>
        <Box className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Select Month
            </InputLabel>
            <Select
              required
              value={month}
              label="Month Name"
              name="brand"
              className="w-full"
              onChange={handleChange}
            >
              {months?.map((m) => (
                <MenuItem key={m.value} value={m.value}>
                  {m.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Select Liqour/Beer
            </InputLabel>
            <Select
              required
              value={billType}
              label="Select Liqour/Beer"
              name="billType"
              className="w-full"
              onChange={(e) => setBillType(e.target.value)}
            >
              <MenuItem key="liquor" value="liquor">
                Liquor
              </MenuItem>
              <MenuItem key="beer" value="beer">
                Beer
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <h4 className="my-5 text-xl underline text-center font-bold">
        Month: Data for{" "}
        <span className="text-sky-800 font-bold">
          {" "}
          {months.find((month) => month.value === monthlyData?.month)?.name}
        </span>
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnalyticsCard
          name={"Revenue"}
          value={monthlyData?.totalRevenue?.toFixed(2)}
        />
        <AnalyticsCard
          name={"Pratifal"}
          value={monthlyData?.totalPratifal?.toFixed(2)}
        />
        <AnalyticsCard name={"TCS"} value={monthlyData?.totalTcs?.toFixed(2)} />

        {sizesData.length > 0 &&
          sizesData?.map((size) => {
            return (
              <AnalyticsCard
                key={size.size}
                name={size.size}
                value={size.total}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MonthlyAnalytics;
