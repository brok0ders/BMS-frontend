import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import CompanyForm from "./CompanyForm";
import { Add } from "@mui/icons-material";
import Companies from "../../components/Company/Companies";
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
          justifyContent: "end",
          alignItems: "center",
          mb: "1rem",
          fontWeight: "bold",
          fontSize: "1.2rem",
          color: "#334155",
        }}
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            bgcolor: "#334155",
            "&:hover": {
              bgcolor: "#64748B",
            },
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
