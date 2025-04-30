import React, { useEffect, useState, useRef } from "react";
import API from "../../utils/API";
import { Box, MenuItem, FormControl, Select } from "@mui/material";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import AnalyticsCard from "./AnalyticsCard";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import {
  Calendar,
  Wine,
  Beer,
  DollarSign,
  BarChart2,
  Tag,
  Percent,
  Package,
  Loader,
  ChevronDown,
} from "lucide-react";

const MonthlyAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [billType, setBillType] = useState("liquor");
  const [sizesData, setSizesData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  // Default date range: first day of current month to today
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(new Date().setDate(1)), // First day of current month
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const getAnalyticsData = async () => {
    if (!dateState[0].startDate || !dateState[0].endDate) {
      toast.warning("Please select a valid date range");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };

      // Format dates for API request (YYYY-MM-DD)
      const formattedFromDate = dayjs(dateState[0].startDate).format(
        "YYYY-MM-DD"
      );
      const formattedToDate = dayjs(dateState[0].endDate).format("YYYY-MM-DD");

      const { data } = await API.get(
        `/bill/analytics/monthly?billType=${billType}&fromDate=${formattedFromDate}&toDate=${formattedToDate}&aggregate=true`,
        config
      );

      // Process sizes data
      const sizesArray = Object.entries(data?.data?.sizes || {}).map(
        ([size, total]) => ({ size, total })
      );

      const sortedArray = sizesArray.sort((a, b) => {
        // Extract numerical values from the size strings
        const sizeA = parseInt(a.size.replace(/\D/g, ""), 10);
        const sizeB = parseInt(b.size.replace(/\D/g, ""), 10);
        return sizeB - sizeA;
      });

      setSizesData(sortedArray);
      setAnalyticsData(data?.data);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      toast.warning("No Data Found");
      setAnalyticsData(null);
      setSizesData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnalyticsData();
  }, [billType]);

  // Handle filter application
  const applyFilters = () => {
    setShowDatePicker(false);
    getAnalyticsData();
  };

  // Handle clicks outside the date picker to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [datePickerRef]);

  // Format date range for display
  const formatDateRangeForDisplay = () => {
    if (!dateState[0].startDate || !dateState[0].endDate)
      return "No date range selected";

    return `${format(dateState[0].startDate, "MMM d, yyyy")} to ${format(
      dateState[0].endDate,
      "MMM d, yyyy"
    )}`;
  };

  // Format currency for INR
  const formatCurrency = (value) => {
    if (value === undefined || value === null) return "₹0.00";

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(parseFloat(value));
  };

  // Choose color theme based on billType
  const cardColor = billType === "liquor" ? "purple" : "green";

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Monthly Analytics
          </h1>
          <p className="text-gray-500 mt-1">
            View revenue and sales data across custom date ranges
          </p>
        </div>
        <div className="mt-4 md:mt-0 px-4 py-2 bg-blue-50 text-blue-700 rounded-full inline-flex items-center">
          {billType === "liquor" ? (
            <>
              <Wine size={18} className="mr-2" />
              <span>Liquor Analytics</span>
            </>
          ) : (
            <>
              <Beer size={18} className="mr-2" />
              <span>Beer Analytics</span>
            </>
          )}
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Date Range Picker */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="bg-white border border-gray-300 rounded-lg py-2.5 px-4 w-full text-left shadow-sm hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <Calendar size={16} className="text-gray-500 mr-2" />
                  {formatDateRangeForDisplay()}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform ${
                    showDatePicker ? "transform rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {showDatePicker && (
              <div
                ref={datePickerRef}
                className="absolute z-10 mt-1 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
              >
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDateState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dateState}
                  rangeColors={["#3b82f6"]}
                  months={1}
                  direction="vertical"
                />
                <div className="p-3 bg-gray-50 border-t flex justify-end">
                  <button
                    onClick={applyFilters}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Apply Range
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Product Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Type
            </label>
            <FormControl fullWidth variant="outlined">
              <Select
                value={billType}
                onChange={(e) => setBillType(e.target.value)}
                className="rounded-lg bg-white"
                displayEmpty
              >
                <MenuItem value="liquor" className="flex items-center gap-2">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Wine size={16} className="text-purple-600" />
                    Liquor
                  </Box>
                </MenuItem>
                <MenuItem value="beer" className="flex items-center gap-2">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Beer size={16} className="text-green-600" />
                    Beer
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Apply Button */}
          <div className="flex items-end">
            <button
              onClick={applyFilters}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center"
              disabled={
                loading || !dateState[0].startDate || !dateState[0].endDate
              }
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin mr-2" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <BarChart2 size={16} className="mr-2" />
                  <span>Generate Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Date Range Display */}
      <div className="bg-gray-50 rounded-lg p-4 mb-8 border border-gray-200 text-center">
        <span className="text-gray-500 font-medium mr-2">Report Period:</span>
        <span className="text-blue-700 font-semibold">
          {formatDateRangeForDisplay()}
        </span>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* No Data State */}
      {!loading && !analyticsData && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-gray-400 mb-4">
            <BarChart2 size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No Data Available
          </h3>
          <p className="text-gray-500">
            Try changing your filters or selecting a different date range
          </p>
        </div>
      )}

      {/* Analytics Cards */}
      {!loading && analyticsData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Main metrics */}
          <AnalyticsCard
            name="Total Revenue"
            value={formatCurrency(analyticsData?.totalRevenue || 0)}
            icon={"/images/salary.png"}
            color="blue"
          />
          <AnalyticsCard
            name="Excise Duty"
            value={formatCurrency(analyticsData?.totalExcise || 0)}
            icon={"/images/pay.png"}
            color="red"
          />
          <AnalyticsCard
            name="Pratifal"
            value={formatCurrency(analyticsData?.totalPratifal || 0)}
            icon={<BarChart2 className="text-purple-600" />}
            color="purple"
          />
          <AnalyticsCard
            name="TCS"
            value={formatCurrency(analyticsData?.totalTcs || 0)}
            icon={<Percent className="text-green-600" />}
            color="green"
          />

          {/* Size breakdown heading */}
          {sizesData.length > 0 && (
            <div className="col-span-full mt-4 mb-2">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                Size Distribution
              </h2>
            </div>
          )}

          {/* Size cards */}
          {sizesData.length > 0 &&
            sizesData.map((size) => (
              <AnalyticsCard
                key={size.size}
                name={`${size.size} Size`}
                value={size.total}
                icon={<Package className="text-gray-600" />}
                color={cardColor}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default MonthlyAnalytics;
