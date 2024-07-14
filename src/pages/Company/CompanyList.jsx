import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import CompanyForm from "./CompanyForm";
import { Add } from "@mui/icons-material";
import Companies from "../../components/Company/Companies";
import CompanyTabs from "../../components/Company/CompanyTabs";
import BackButton from "../../components/BackButton";

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
        py: { xs: "1rem", sm: "1rem", md: "0rem", lg: "1rem" },
        px: { xs: "1rem", sm: "1rem", md: "2rem", lg: "3rem" },
      }}
    >
      <BackButton url={"/dashboard"} />
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-slate-700 mb-5">
        All Suppliers
      </h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
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
            minWidth: { xs: "100%", sm: "12rem" },
            py: 1,
            mt: { xs: 2, sm: 0 },
          }}
          onClick={handleOpen}
        >
          Add Supplier
        </Button>
      </Box>
      <CompanyForm open={open} onClose={handleClose} />
      <Companies />
    </Box>
  );
};

export default CompanyList;
