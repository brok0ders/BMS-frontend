import React, { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import UpdateCompanyForm from "../../pages/Company/UpdateCompanyForm";
const CompanyCard = ({ id, name, totalBrands }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="flex flex-col gap-2  py-5 px-5 relative glass-effect border  border-gray-100">
      <h2 className="text-xl text-center font-semibold">{name}</h2>
      <p className="text-[1.1rem]  text-center font-semibold">
        Total Brands:{" "}
        <span className="text-[1rem]  text-gray-500">{totalBrands}</span>
      </p>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          alignItems: "center",
          cursor: "pointer",
          margin: "12% 0 0 8%",
        }}
      >
        <Box
          sx={{
            position: "",
            bottom: 17,
            right: 20,
            background: "rgba(0, 0, 0,0.05)",
            borderRadius: 5,
            width: 30,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              minWidth: 1,
              width: 30,
              borderRadius: 5,
            }}
            color="error"
          >
            <Delete sx={{ fontSize: 18 }} />
          </Button>
        </Box>
        <Box
          sx={{
            position: "",
            bottom: 17,
            right: 20,
            background: "rgba(0, 0, 0,0.05)",
            borderRadius: 5,
            width: 30,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              minWidth: 1,
              width: 30,
              borderRadius: 5,
            }}
            onClick={handleOpen}
          >
            <Edit sx={{ fontSize: 18 }} />
          </Button>
        </Box>
      </Box>
      <UpdateCompanyForm id={id} onClose={handleClose} open={open} />
    </div>
  );
};

export default CompanyCard;
