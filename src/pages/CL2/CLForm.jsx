import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Layout/Spinner";
import BackButton from "../../components/BackButton";
import ClContext from "../../context/cl/clContext";

const CLForm = () => {
  const { createCL } = useContext(ClContext);
  const navigate = useNavigate();

  // Fixed data for MALTA brand
  const fixedBrandData = {
    brandName: "GULAB SPICED MALTA",
    companyName: "MALTA",
    sizes: [
      {
        size: "750ml",
        price: 51.41,
        totalPrice: 66.06,
        pratifal: 1.38,
        profit: 4,
        wep: 3,
        currentQuantity: 50,
      },
      {
        size: "375ml",
        price: 30.85,
        totalPrice: 41.88,
        pratifal: 3.77,
        profit: 2,
        wep: 1.5,
        currentQuantity: 50,
      },
      {
        size: "180ml",
        price: 15.02,
        totalPrice: 18.64,
        pratifal: 0.04,
        profit: 1,
        wep: 0.75,
        currentQuantity: 50,
      },
      {
        size: "200ml",
        price: 16.69,
        totalPrice: 21.29,
        pratifal: 0.77,
        profit: 1,
        wep: 0.8,
        currentQuantity: 50,
      },
      {
        size: "200ml tetra",
        price: 13.52,
        totalPrice: 17.01,
        pratifal: 0.04,
        profit: 1,
        wep: 0.8,
        currentQuantity: 5,
      },
    ],
  };

  const [stock, setStock] = useState(
    fixedBrandData.sizes.map((size) => ({
      size: size.size,
      quantity: size.currentQuantity,
      leak: 0,
      price: size.price,
    }))
  );
  const [spinner, setSpinner] = useState(false);

  const handleQuantityChange = (index, e) => {
    const { name, value } = e.target;
    const newStock = [...stock];

    if (name === "quantity" || name === "leak") {
      newStock[index][name] = Number(value);
    }
    setStock(newStock);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      // Implement your create CL logic here
      const res = await createCL({ stock });
      toast.success("CL created successfully!");
      navigate(-1);
      setSpinner(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create CL");
      setSpinner(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="w-full px-5 md:px-10 lg:px-20 py-10 md:py-16"
    >
      <BackButton />
      <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-900">
        Create CL Details
      </h1>

      <Box className="pb-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
        <Box className="py-10">
          <h1 className="text-2xl font-semibold mb-5">Brand</h1>
          <TextField
            required
            value={fixedBrandData.brandName}
            className="w-full"
            label="Brand Name"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Box>

      {stock?.map((s, index) => (
        <div key={index}>
          <h1 className="text-2xl font-semibold mb-3">{s.size}</h1>
          <Box className="pb-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
            <TextField
              onChange={(e) => handleQuantityChange(index, e)}
              value={s?.quantity || ""}
              type="number"
              inputProps={{ min: 0 }}
              name="quantity"
              label={`Quantity ${s?.size}`}
              variant="outlined"
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
            />

            <TextField
              value={s.price}
              label={`Price ${s?.size}`}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              onChange={(e) => handleQuantityChange(index, e)}
              value={s?.leak || ""}
              type="number"
              inputProps={{ min: 0 }}
              name="leak"
              label={`Loose ${s?.size}`}
              variant="outlined"
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
            />
          </Box>
        </div>
      ))}

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          sx={{
            fontSize: "1rem",
            color: "black",
            fontWeight: "medium",
          }}
          onClick={() => navigate(-1)}
          variant="text"
          className="p-4 !px-6"
        >
          Cancel
        </Button>

        {spinner ? (
          <Button
            sx={{ fontSize: "1rem" }}
            variant="contained"
            className="p-4 px-6"
            disabled
          >
            <Spinner />
          </Button>
        ) : (
          <Button
            sx={{ fontSize: "1rem", minWidth: "6rem", minHeight: "2rem" }}
            type="submit"
            variant="contained"
            className="p-4 px-6"
          >
            Create
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CLForm;
