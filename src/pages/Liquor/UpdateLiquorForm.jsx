import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const UpdateLiquorForm = () => {
  const [brandName, setBrandName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [stock, setStock] = useState({ Q: null, P: null, N: null });
  const [price, setPrice] = useState({ Q: null, P: null, N: null });
  const { id } = useParams();
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

  // GEt the liquor data

  const getLiquorData = async () => {
    try {
      // Data fetching

      const data = {
        _id: "343254t234",
        brandName: "Test brand",
        stock: {
          Q: 56,
          P: 56,
          N: 56,
        },
        price: {
          Q: 5600,
          P: 5006,
          N: 1526,
        },
        company: "NK traders",
      };
      setBrandName(data.brandName);
      setStock(data.stock);
      setPrice(data.price);
      setCompanyName(data.company);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getLiquorData();
  }, [id]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="w-full px-5 md:px-10 lg:px-20 py-10 md:py-16"
    >
      <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-900">
        Edit Liquor Details
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
          sx={{ fontSize: "1rem" }}
          type="submit"
          variant="contained"
          className=" p-4 !px-6"
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateLiquorForm;
