import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ArrowBackIosNewOutlined } from "@mui/icons-material";
const BackButton = ({ url, className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url ?? -1);
  };
  return (
    <div className={`relative top-10 left-0 ` + className}>
      <Button
        onClick={handleClick}
        variant="outlined"
        startIcon={<ArrowBackIosNewOutlined />}
      >
        <span className="hidden md:block"> Back</span>
      </Button>
    </div>
  );
};

export default BackButton;
