import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import AnalyticsCard from "./AnalyticsCard";

const DateWiseReports = () => {
  const [totalPrice, setTotalPrice] = useState();
  const [billType, setBillType] = useState("liquor");
  const [sizesData, setSizesData] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };

  const getDailyReport = async () => {
    try {
      const { data } = await API.get(
        `/bill/analytics/daily?billType=${billType}`,
        config
      );
      setTotalPrice(data.data?.totalPrice);
      const sizesArray = Object.entries(data?.data?.sizeQuantities).map(
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
      console.log("Daily reports: \n\n", data);
    } catch (error) {
      console.log(error);
      setDailyReport();
    }
  };

  useEffect(() => {
    if (billType) {
      getDailyReport();
    }
  }, [billType]);

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold mb-4">Daily Sales Analytics</h1>
      <Box className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-10">
        <FormControl sx={{ m: 1 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Select Liqour/Beer
          </InputLabel>
          <Select
            required
            fullWidth
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        <AnalyticsCard
          name={"Today Sales"}
          value={totalPrice?.toFixed(2)}
          icon={"/images/budget.png"}
        />

        {sizesData.length > 0 &&
          sizesData?.map((size) => {
            return (
              <AnalyticsCard
                key={size.size}
                name={size.size}
                value={size.total}
                icon={"/images/packages.png"}
              />
            );
          })}
      </div>
    </div>
  );
};

export default DateWiseReports;
