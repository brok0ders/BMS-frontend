import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

const BeerForm = () => {
  const [brandName, setBrandName] = useState("");
  const [stock500ml, setStock500ml] = useState("");
  const [stock650ml, setStock650ml] = useState("");
  const [price650ml, setPrice650ml] = useState("");
  const [price500ml, setPrice500ml] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = {
        brandName,
        stock500ml,
        stock650ml,
        price650ml,
        price500ml,
      };
      console.log(formdata);

      // Reset the states

      setBrandName("");
      setStock500ml("");
      setStock650ml("");
      setPrice650ml("");
      setPrice500ml("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="w-full px-5 md:px-10 lg:px-20 py-10 md:py-16"
    >
      <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-900">
        Create Beer Brand
      </h1>
      <Box className="py-10">
        <h1 className="text-2xl font-semibold mb-3">Brand</h1>
        <TextField
          required
          onChange={(e) => setBrandName(e.target.value)}
          value={brandName}
          id="outlined-basic"
          className="w-full md:w-fit"
          label="Brand Name"
          variant="outlined"
        />
      </Box>
      <h1 className="text-2xl font-semibold mb-3">500 ML</h1>
      <Box className="pb-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <TextField
          required
          onChange={(e) => setStock500ml(e.target.value)}
          value={stock500ml}
          type="number"
          id="outlined-basic"
          label="Stock 500ml"
          variant="outlined"
          inputProps={{ min: 0 }}
        />

        <TextField
          required
          onChange={(e) => setPrice500ml(e.target.value)}
          value={price500ml}
          type="number"
          id="outlined-basic"
          label="Price 500ml"
          variant="outlined"
          inputProps={{ min: 0 }}
        />
      </Box>
      <h1 className="text-2xl font-semibold mb-3">650 ML</h1>
      <Box className="pb-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <TextField
          required
          onChange={(e) => setStock650ml(e.target.value)}
          value={stock650ml}
          type="number"
          id="outlined-basic"
          label="Stock 650ml"
          variant="outlined"
          inputProps={{ min: 0 }}
        />
        <TextField
          required
          onChange={(e) => setPrice650ml(e.target.value)}
          value={price650ml}
          type="number"
          id="outlined-basic"
          label="Price 650ml"
          variant="outlined"
          inputProps={{ min: 0 }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          sx={{
            fontSize: "1rem",
          }}
          type="submit"
          variant="contained"
          className="!bg-slate-700 p-4 !px-6"
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default BeerForm;
