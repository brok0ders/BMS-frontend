import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useSearchParams } from "react-router-dom";

export default function ColorTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  useEffect(() => {
    if (!tab) {
      setSearchParams({ tab: "all" });
    }
  }, []);

  const handleChange = (event, newValue) => {
    setSearchParams({ tab: newValue });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={tab} onChange={handleChange} selectionFollowsFocus>
        <Tab value="all" label="All" />

        <Tab value="beer" label="Beer Companies" />
        <Tab value="liquor" label="Liquor Companies" />
      </Tabs>
    </Box>
  );
}
