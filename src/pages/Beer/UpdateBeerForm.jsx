import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
const UpdateBeerForm = () => {
  const [brandName, setBrandName] = useState("");
  const [stock500ml, setStock500ml] = useState("");
  const [stock650ml, setStock650ml] = useState("");
  const [price650ml, setPrice650ml] = useState("");
  const [price500ml, setPrice500ml] = useState("");
  const [companyName, setCompanyName] = useState("");

  const { id } = useParams();
  console.log(id);
  const getBeerData = async () => {
    try {
      const data = {
        _id: "12313",
        brandName: "Test brand",
        stock: {
          650: 56,
          500: 56,
        },
        price: {
          650: 5600,
          500: 5006,
        },
        company: "NK traders",
      };
      setBrandName(data.brandName);
      setStock500ml(data.stock[500]);
      setStock650ml(data.stock[650]);
      setPrice650ml(data.price[650]);
      setPrice500ml(data.price[500]);
      setCompanyName(data.company);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

  useEffect(() => {
    getBeerData();
  }, [id]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="w-full px-5 md:px-10 lg:px-20 py-10 md:py-16"
    >
      <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-900">
        Edit Beer Details
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
      <h1 className="text-2xl font-semibold mb-5">500 ML</h1>
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
      <h1 className="text-2xl font-semibold mb-5">650 ML</h1>
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
          gap: 2,
        }}
      >
        <Link to={-1}>
          <Button
            sx={{
              fontSize: "1rem",
              color: "black",
              fontWeight: "medium",
            }}
            type="submit"
            variant="text"
            className="p-4 !px-6"
          >
            Cancel
          </Button>
        </Link>
        <Button
          sx={{
            fontSize: "1rem",
          }}
          type="submit"
          variant="contained"
          className="p-4 !px-6"
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateBeerForm;
