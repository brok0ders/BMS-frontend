import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import CompanyForm from "./CompanyForm";
import { Add } from "@mui/icons-material";
import Companies from "../../components/Company/Companies";
import CompanyTabs from "../../components/Company/CompanyTabs";
const CompanyList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        py: { sm: "1rem", md: "2rem", lg: "2rem" },
        px: { sm: "1rem", md: "2rem", lg: "3rem" }, 
      }}
    >
      <h1 className="text-center text-5xl font-bold text-slate-700 mb-5">
        All Companies
      </h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "1rem",
          fontWeight: "bold",
          fontSize: "1.2rem",
          color: "#334155",
        }}
      >
        <CompanyTabs />
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            minWidth: "12rem",
            py: 1,
          }}
          onClick={handleOpen}
        >
          Add Company
        </Button>
      </Box>
      <CompanyForm open={open} onClose={handleClose} />
      <Companies />
    </Box>
  );
};

export default CompanyList;
