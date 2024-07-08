import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

const LiquorForm = () => {
  const [brandName, setBrandName] = useState("");
  const [stock, setStock] = useState({ Q: null, P: null, N: null });
  const [price, setPrice] = useState({ Q: null, P: null, N: null });
  const [companyName, setCompanyName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = {
        brandName,
        stock,
        price,
        company: "667767676769hgjg98787hg", // Replace with actual company ID
      };
      console.log(formdata);

      setBrandName("");
      setPrice({ Q: "", P: "", N: "" });
      setStock({ Q: "", P: "", N: "" });
      // Handle success (e.g., reset form, display success message)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getCompanyById = () => {
    setCompanyName("Company Name");
  };

  useEffect(() => {
    getCompanyById();
  }, []);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="w-full px-5 md:px-10 lg:px-20 py-10 md:py-16"
    >
      <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-900">
        Create Liquor Brand
      </h1>
      <Box className="pb-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
        <Box className="py-10">
          <h1 className="text-2xl font-semibold mb-5">Company</h1>
          <TextField
            required
            aria-readonly
            value={companyName}
            className="w-full "
            label="Company Name"
            variant="outlined"
          />
        </Box>
        <Box className="py-10">
          <h1 className="text-2xl font-semibold mb-5">Brand</h1>
          <TextField
            required
            onChange={(e) => setBrandName(e.target.value)}
            value={brandName}
            className="w-full "
            label="Brand Name"
            variant="outlined"
          />
        </Box>
      </Box>
      <h1 className="text-2xl font-semibold mb-3">Quarts</h1>
      <Box className="pb-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <TextField
          onChange={(e) => setStock({ ...stock, Q: e.target.value })}
          value={stock.Q}
          type="number"
          inputProps={{ min: 0 }}
          required
          label="Stock Q"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setPrice({ ...price, Q: e.target.value })}
          value={price.Q}
          type="number"
          inputProps={{ min: 0 }}
          required
          label="Price Q"
          variant="outlined"
        />
      </Box>
      <h1 className="text-2xl font-semibold mb-3">Pints</h1>
      <Box className="pb-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <TextField
          onChange={(e) => setStock({ ...stock, P: e.target.value })}
          value={stock.P}
          type="number"
          inputProps={{ min: 0 }}
          required
          label="Stock P"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setPrice({ ...price, P: e.target.value })}
          value={price.P}
          type="number"
          inputProps={{ min: 0 }}
          required
          label="Price P"
          variant="outlined"
        />
      </Box>
      <h1 className="text-2xl font-semibold mb-3">Nips</h1>
      <Box className="pb-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <TextField
          onChange={(e) => setStock({ ...stock, N: e.target.value })}
          value={stock.N}
          type="number"
          inputProps={{ min: 0 }}
          required
          label="Stock N"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setPrice({ ...price, N: e.target.value })}
          value={price.N}
          type="number"
          inputProps={{ min: 0 }}
          required
          label="Price N"
          variant="outlined"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          sx={{ fontSize: "1rem" }}
          type="submit"
          variant="contained"
          className=" p-4 !px-6"
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default LiquorForm;
