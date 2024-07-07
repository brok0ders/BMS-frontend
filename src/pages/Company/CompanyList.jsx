import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import CompanyForm from "./CompanyForm";
import { Add } from "@mui/icons-material";
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
        py: { sm: "1rem", md: "2rem", lg: "3rem" },
        px: { sm: "1rem", md: "2rem", lg: "3rem" },
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
      <CompanyForm open={open} onClose={handleClose} />
    </Box>
  );
};

export default CompanyList;
