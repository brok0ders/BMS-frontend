import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import AnalyticsCard from "./AnalyticsCard";
import { DollarSign, Package, Wine, Beer, Calendar } from "lucide-react";

const DateWiseReports = () => {
  const [totalPrice, setTotalPrice] = useState();
  const [billType, setBillType] = useState("liquor");
  const [sizesData, setSizesData] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    // Format today's date in Indian format
    const today = new Date();
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };
    setCurrentDate(today.toLocaleDateString("en-IN", options));
  }, []);

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

  // Choose color theme based on billType
  const cardColor = billType === "liquor" ? "purple" : "green";

  // Format currency for total price in Indian Rupees
  const formatCurrency = (value) => {
    if (value === undefined || value === null) return "₹0.00";

    // Format as Indian currency with commas in the Indian numbering system
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      {/* Header Section with refined styling and improved date display */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Daily Sales Analytics
          </h1>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar size={14} className="mr-1" />
            {currentDate}
          </div>
        </div>

        <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mt-3 md:mt-0">
          {billType === "liquor" ? "Liquor Sales" : "Beer Sales"}
        </div>
      </div>

      {/* Filter Section with improved styling */}
      <Box className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <FormControl fullWidth sx={{ maxWidth: 300 }}>
          <InputLabel id="product-type-select-label">
            Select Liquor/Beer
          </InputLabel>
          <Select
            required
            value={billType}
            label="Select Liquor/Beer"
            name="billType"
            labelId="product-type-select-label"
            onChange={(e) => setBillType(e.target.value)}
            className="bg-white"
          >
            <MenuItem
              key="liquor"
              value="liquor"
              className="flex items-center gap-2"
            >
              <Wine size={16} className="text-purple-600" />
              Liquor
            </MenuItem>
            <MenuItem
              key="beer"
              value="beer"
              className="flex items-center gap-2"
            >
              <Beer size={16} className="text-green-600" />
              Beer
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Main sales card */}
        <AnalyticsCard
          name={"Today Sales"}
          value={formatCurrency(totalPrice)}
          icon={<DollarSign className="text-blue-600" />}
          color="blue"
        />

        {/* Size cards with package icon */}
        {sizesData.length > 0 &&
          sizesData?.map((size) => {
            return (
              <AnalyticsCard
                key={size.size}
                name={size.size}
                value={size.total}
                icon={<Package className="text-gray-600" />}
                color={cardColor}
              />
            );
          })}
      </div>

      {/* Empty state for when there's no data */}
      {sizesData.length === 0 && totalPrice === undefined && (
        <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
          No data available for the selected product type.
        </div>
      )}
    </div>
  );
};

export default DateWiseReports;
