import React, { useState } from "react";
import API from "../../utils/API";
import { Box, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import { toast } from "react-toastify";

const months = [
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
  const [monthlyData, setMonthlyData] = useState({});
  const [billType, setBillType] = useState("liquor");
  const [month, setMonth] = useState();
  const getMonthlyAnalytics = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const { data } = await API.get(
        `/bill/analytics/monthly-data?billType=${billType}&month=${month}`,
        config
      );
      setMonthlyData(data?.data);
    } catch (error) {
      console.log(error);
      toast.warning("No Data Found");
      setMonthlyData();
    }
  };

  const handleChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div>
      <div>
        <Box className="px-3 grid grid-cols-1 sm:grid-cols-3 gap-10">
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
              label="Month Name"
              name="brand"
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
    </div>
  );
};

export default MonthlyAnalytics;
