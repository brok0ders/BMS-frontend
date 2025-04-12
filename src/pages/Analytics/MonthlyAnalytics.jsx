// import React, { useEffect, useState } from "react";
// import API from "../../utils/API";
// import { Box, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
// import dayjs from "dayjs";
// import { toast } from "react-toastify";
// import AnalyticsCard from "./AnalyticsCard";
// import { DateRangePicker, DateRange } from "mui-daterange-picker";

// const MonthlyAnalytics = () => {
//   const [loading, setLoading] = useState(false);
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [billType, setBillType] = useState("liquor");
//   const [sizesData, setSizesData] = useState([]);
//   const [open, setOpen] = React.useState(false);
//   // Default date range: first day of current month to today
//   const today = dayjs();
//   const firstDayOfMonth = dayjs().startOf("month");
//   const [dateRange, setDateRange] = useState([firstDayOfMonth, today]);

//   const getAnalyticsData = async () => {
//     if (!dateRange[0] || !dateRange[1]) {
//       toast.warning("Please select a valid date range");
//       return;
//     }

//     try {
//       setLoading(true);
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           authorization: localStorage.getItem("token"),
//         },
//       };

//       // Format dates for API request (YYYY-MM-DD)
//       const formattedFromDate = dateRange[0].format("YYYY-MM-DD");
//       const formattedToDate = dateRange[1].format("YYYY-MM-DD");

//       const { data } = await API.get(
//         `/bill/analytics/monthly?billType=${billType}&fromDate=${formattedFromDate}&toDate=${formattedToDate}&aggregate=true`,
//         config
//       );

//       // Process sizes data
//       const sizesArray = Object.entries(data?.data?.sizes || {}).map(
//         ([size, total]) => ({
//           size,
//           total,
//         })
//       );

//       const sortedArray = sizesArray.sort((a, b) => {
//         // Extract numerical values from the size strings
//         const sizeA = parseInt(a.size.replace(/\D/g, ""), 10);
//         const sizeB = parseInt(b.size.replace(/\D/g, ""), 10);
//         return sizeB - sizeA;
//       });

//       setSizesData(sortedArray);
//       setAnalyticsData(data?.data);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       toast.warning("No Data Found");
//       setAnalyticsData(null);
//       setSizesData([]);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (dateRange[0] && dateRange[1]) {
//       getAnalyticsData();
//     }
//   }, [billType]);

//   // Handle filter application
//   const applyFilters = () => {
//     getAnalyticsData();
//   };

//   // Format date range for display
//   const formatDateRangeForDisplay = () => {
//     if (!dateRange[0] || !dateRange[1]) return "No date range selected";
//     return `${dateRange[0].format("MMM D, YYYY")} to ${dateRange[1].format(
//       "MMM D, YYYY"
//     )}`;
//   };

//   const toggle = () => {
//     setOpen(!open);
//   };

//   return (
//     <div className="pt-20">
//       <div>
//         <Box className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center mb-8">
//           <DateRangePicker
//             open={open}
//             toggle={toggle}
//             onChange={(range) => setDateRange(range)}
//           />

//           <FormControl>
//             <InputLabel id="bill-type-label">Select Liquor/Beer</InputLabel>
//             <Select
//               required
//               value={billType}
//               label="Select Liquor/Beer"
//               name="billType"
//               className="w-full"
//               onChange={(e) => setBillType(e.target.value)}
//             >
//               <MenuItem key="liquor" value="liquor">
//                 Liquor
//               </MenuItem>
//               <MenuItem key="beer" value="beer">
//                 Beer
//               </MenuItem>
//             </Select>
//           </FormControl>

//           <Box sx={{ m: 1, display: "flex", alignItems: "center" }}>
//             <button
//               onClick={applyFilters}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               disabled={loading || !dateRange[0] || !dateRange[1]}
//             >
//               {loading ? "Loading..." : "Apply Filters"}
//             </button>
//           </Box>
//         </Box>
//       </div>

//       <h4 className="my-5 text-xl underline text-center font-bold">
//         Data for period:{" "}
//         <span className="text-sky-800 font-bold">
//           {formatDateRangeForDisplay()}
//         </span>
//       </h4>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//         <AnalyticsCard
//           name={"Revenue"}
//           value={analyticsData?.totalRevenue?.toFixed(2) || "0.00"}
//           icon={"/images/salary.png"}
//         />
//         <AnalyticsCard
//           name={"Excise Duty"}
//           value={analyticsData?.totalExcise?.toFixed(2) || "0.00"}
//           icon={"/images/pay.png"}
//         />
//         <AnalyticsCard
//           name={"Pratifal"}
//           value={analyticsData?.totalPratifal?.toFixed(2) || "0.00"}
//           icon={"/images/pay.png"}
//         />
//         <AnalyticsCard
//           name={"TCS"}
//           value={analyticsData?.totalTcs?.toFixed(2) || "0.00"}
//           icon={"/images/budget.png"}
//         />

//         {sizesData.length > 0 &&
//           sizesData?.map((size) => (
//             <AnalyticsCard
//               key={size.size}
//               name={size.size}
//               value={size.total}
//               icon={"/images/packages.png"}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default MonthlyAnalytics;

import React, { useEffect, useState, useRef } from "react";
import API from "../../utils/API";
import { Box, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import AnalyticsCard from "./AnalyticsCard";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

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
        ([size, total]) => ({
          size,
          total,
        })
      );

      const sortedArray = sizesArray.sort((a, b) => {
        // Extract numerical values from the size strings
        const sizeA = parseInt(a.size.replace(/\D/g, ""), 10);
        const sizeB = parseInt(b.size.replace(/\D/g, ""), 10);
        return sizeB - sizeA;
      });

      setSizesData(sortedArray);
      setAnalyticsData(data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.warning("No Data Found");
      setAnalyticsData(null);
      setSizesData([]);
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

  return (
    <div className="pt-20">
      <div>
        <Box className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center mb-8">
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="bg-white border border-gray-300 rounded-md py-2 px-4 w-full text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <div className="flex items-center justify-between">
                <span>{formatDateRangeForDisplay()}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </button>

            {showDatePicker && (
              <div
                ref={datePickerRef}
                className="absolute z-10 mt-1 bg-white shadow-lg rounded-md overflow-hidden"
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
                <div className="p-2 bg-gray-50 border-t flex justify-end">
                  <button
                    onClick={applyFilters}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          <FormControl>
            <InputLabel id="bill-type-label">Select Liquor/Beer</InputLabel>
            <Select
              required
              value={billType}
              label="Select Liquor/Beer"
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

          <Box sx={{ m: 1, display: "flex", alignItems: "center" }}>
            <button
              onClick={applyFilters}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={
                loading || !dateState[0].startDate || !dateState[0].endDate
              }
            >
              {loading ? "Loading..." : "Apply Filters"}
            </button>
          </Box>
        </Box>
      </div>

      <h4 className="my-5 text-xl underline text-center font-bold">
        Data for period:{" "}
        <span className="text-sky-800 font-bold">
          {formatDateRangeForDisplay()}
        </span>
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnalyticsCard
          name={"Revenue"}
          value={analyticsData?.totalRevenue?.toFixed(2) || "0.00"}
          icon={"/images/salary.png"}
        />
        <AnalyticsCard
          name={"Excise Duty"}
          value={analyticsData?.totalExcise?.toFixed(2) || "0.00"}
          icon={"/images/pay.png"}
        />
        <AnalyticsCard
          name={"Pratifal"}
          value={analyticsData?.totalPratifal?.toFixed(2) || "0.00"}
          icon={"/images/pay.png"}
        />
        <AnalyticsCard
          name={"TCS"}
          value={analyticsData?.totalTcs?.toFixed(2) || "0.00"}
          icon={"/images/budget.png"}
        />

        {sizesData.length > 0 &&
          sizesData?.map((size) => (
            <AnalyticsCard
              key={size.size}
              name={size.size}
              value={size.total}
              icon={"/images/packages.png"}
            />
          ))}
      </div>
    </div>
  );
};

export default MonthlyAnalytics;
