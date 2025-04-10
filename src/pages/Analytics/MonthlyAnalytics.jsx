// import React, { useEffect, useState } from "react";
// import API from "../../utils/API";
// import {
//   Box,
//   MenuItem,
//   FormControl,
//   Select,
//   InputLabel,
//   TextField,
// } from "@mui/material";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import { toast } from "react-toastify";
// import AnalyticsCard from "./AnalyticsCard";

// const DateRangeAnalytics = () => {
//   const [loading, setLoading] = useState(false);
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [billType, setBillType] = useState("liquor");
//   const [sizesData, setSizesData] = useState([]);

//   // Get first day of current month as default fromDate
//   const defaultFromDate = new Date();
//   defaultFromDate.setDate(1);

//   // Get current date as default toDate
//   const defaultToDate = new Date();

//   const [fromDate, setFromDate] = useState(defaultFromDate);
//   const [toDate, setToDate] = useState(defaultToDate);

//   const getAnalyticsData = async () => {
//     try {
//       setLoading(true);
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           authorization: localStorage.getItem("token"),
//         },
//       };

//       // Format dates for API request (YYYY-MM-DD)
//       const formattedFromDate = fromDate.toISOString().split("T")[0];
//       const formattedToDate = toDate.toISOString().split("T")[0];

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
//     getAnalyticsData();
//   }, [billType]);

//   // Handle date changes
//   const handleFromDateChange = (newDate) => {
//     setFromDate(newDate);
//   };

//   const handleToDateChange = (newDate) => {
//     setToDate(newDate);
//   };

//   // Handle filter application
//   const applyFilters = () => {
//     getAnalyticsData();
//   };

//   // Format date for display
//   const formatDateForDisplay = (date) => {
//     return date ? new Date(date).toLocaleDateString() : "";
//   };

//   return (
//     <div className="pt-20">
//       <div>
//         <Box className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-8">
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <FormControl sx={{ m: 1 }}>
//               <DatePicker
//                 label="From Date"
//                 value={fromDate}
//                 onChange={handleFromDateChange}
//                 renderInput={(params) => <TextField {...params} />}
//                 inputFormat="MM/dd/yyyy"
//               />
//             </FormControl>

//             <FormControl sx={{ m: 1 }}>
//               <DatePicker
//                 label="To Date"
//                 value={toDate}
//                 onChange={handleToDateChange}
//                 renderInput={(params) => <TextField {...params} />}
//                 inputFormat="MM/dd/yyyy"
//                 minDate={fromDate}
//               />
//             </FormControl>
//           </LocalizationProvider>

//           <FormControl sx={{ m: 1 }}>
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
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Apply Filters"}
//             </button>
//           </Box>
//         </Box>
//       </div>

//       <h4 className="my-5 text-xl underline text-center font-bold">
//         Data for period:{" "}
//         <span className="text-sky-800 font-bold">
//           {formatDateForDisplay(fromDate)} to {formatDateForDisplay(toDate)}
//         </span>
//       </h4>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//         <AnalyticsCard
//           name={"Revenue"}
//           value={analyticsData?.totalRevenue?.toFixed(2) || "0.00"}
//           icon={"/images/salary.png"}
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

// export default DateRangeAnalytics;

import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import { Box, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import AnalyticsCard from "./AnalyticsCard";

const DateRangeAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [billType, setBillType] = useState("liquor");
  const [sizesData, setSizesData] = useState([]);

  // Default date range: first day of current month to today
  const today = dayjs();
  const firstDayOfMonth = dayjs().startOf("month");
  const [dateRange, setDateRange] = useState([firstDayOfMonth, today]);

  const getAnalyticsData = async () => {
    if (!dateRange[0] || !dateRange[1]) {
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
      const formattedFromDate = dateRange[0].format("YYYY-MM-DD");
      const formattedToDate = dateRange[1].format("YYYY-MM-DD");

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
    if (dateRange[0] && dateRange[1]) {
      getAnalyticsData();
    }
  }, [billType]);

  // Handle filter application
  const applyFilters = () => {
    getAnalyticsData();
  };

  // Format date range for display
  const formatDateRangeForDisplay = () => {
    if (!dateRange[0] || !dateRange[1]) return "No date range selected";
    return `${dateRange[0].format("MMM D, YYYY")} to ${dateRange[1].format(
      "MMM D, YYYY"
    )}`;
  };

  return (
    <div className="pt-20">
      <div>
        <Box className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center mb-8">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateRangePicker"]} sx={{ m: 1 }}>
              <DateRangePicker
                localeText={{ start: "From Date", end: "To Date" }}
                value={dateRange}
                format="DD/MM/YYYY"
                onChange={(newValue) => setDateRange(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>

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
              disabled={loading || !dateRange[0] || !dateRange[1]}
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

export default DateRangeAnalytics;
