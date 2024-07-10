import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import LiquorContext from "../../context/liquor/liquorContext";

const UpdateLiquorForm = () => {
  const [brandName, setBrandName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [stock, setStock] = useState([]);
  const { id } = useParams();
  const { getLiquor } = useContext(LiquorContext);

  const handleQuantityChange = (index, value) => {
    const newStock = [...stock];
    newStock[index].quantity = value;
    setStock(newStock);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = {
        brandName,
        stock,
        price,
        company: "", // Replace with actual company ID
      };
      console.log(formdata);

      setBrandName("");
      setPrice({});
      setStock({});
      // Handle success (e.g., reset form, display success message)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // GEt the liquor data

  const getLiquorData = async () => {
    try {
      // Data fetching
      const res = await getLiquor({ id });
      console.log(res);

      setBrandName(res.liquor.liquor?.brandName);
      setStock(res.liquor.stock);
      setCompanyName(res.liquor.liquor.company);
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
      {stock?.map((s, index) => (
        <>
          <h1 className="text-2xl font-semibold mb-3">{s.size}</h1>
          <Box className="pb-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
            <TextField
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              value={s?.quantity}
              type="number"
              inputProps={{ min: 0 }}
              required
              label={`Quantity ${s?.size}`}
              variant="outlined"
            />
            <TextField
              value={s.price}
              type="number"
              inputProps={{ min: 0 }}
              required
              label="Price Q"
              variant="outlined"
            />
          </Box>
        </>
      ))}

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
