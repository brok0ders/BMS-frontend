import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CompanyContext from "../../context/company/companyContext";
import { useParams } from "react-router-dom";
import BeerContext from "../../context/beer/beerContext";
import { toast } from "react-toastify";

const BeerForm = () => {
  const [brandName, setBrandName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [stock, setStock] = useState([]);
  const [temp, setTemp] = useState([]);
  const { getCompany } = useContext(CompanyContext);
  const { allGlobalBeer, createBeer } = useContext(BeerContext);
  const { company } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createBeer({
        beerId: brandName._id,
        stock,
        company,
      });
      if (res.success) {
        toast.success(res.message);
      }
      setBrandName("");
      setStock([]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleStockChange = (e, size, price) => {
    const { name, value } = e.target;
    setStock((prevStock) => {
      const stockIndex = prevStock.findIndex((item) => item.size === size);
      if (stockIndex > -1) {
        const updatedStock = [...prevStock];
        updatedStock[stockIndex] = {
          ...updatedStock[stockIndex],
          [name]: name === "quantity" ? Number(value) : value,
        };
        return updatedStock;
      } else {
        return [
          ...prevStock,
          {
            size,
            price,
            [name]: name === "quantity" ? Number(value) : value,
          },
        ];
      }
    });
  };

  const getBeerByComp = async () => {
    const res1 = await getCompany({ id: company });
    setCompanyName(res1.company.company.name);
    const res = await allGlobalBeer();
    const filtered = await res.filter(
      (beer) => beer.company === res1.company.company._id
    );
    setTemp(filtered);
    console.log(filtered);
  };

  useEffect(() => {
    getBeerByComp();
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="w-full px-5 md:px-10 lg:px-20 py-10 md:py-16"
    >
      <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-900">
        Create Beer Brand
      </h1>
      <Box className="pb-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
        <Box className="py-10">
          <h1 className="text-2xl font-semibold mb-5">Company</h1>
          <div className="flex gap-3 w-[90vw]">
            <TextField
              required
              aria-readonly
              label="Company Name"
              value={companyName}
              className="w-full "
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel id="brand-label">Brand Name</InputLabel>
              <Select
                required
                labelId="brand-label"
                id="brand-select"
                value={brandName}
                label="Brand Name"
                name="brand"
                className="w-full"
                onChange={(e) => {
                  setBrandName(e.target.value);
                }}
              >
                {temp?.map((b) => (
                  <MenuItem key={b._id} value={b}>
                    {b.brandName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Box>
      </Box>
      {brandName?.sizes?.map((b, index) => (
        <div key={index}>
          <h1 className="text-2xl font-semibold mb-3">{b.size}</h1>
          <Box className="pb-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
            <TextField
              onChange={(e) => handleStockChange(e, b.size, b.price)}
              value={stock.find((item) => item.size === b.size)?.quantity || ""}
              name="quantity"
              type="number"
              inputProps={{ min: 0 }}
              required
              label={`Stock ${b.size}`}
              variant="outlined"
            />
            <TextField
              value={b?.price}
              inputProps={{ min: 0 }}
              aria-readonly
              label={`Price ${b.size}`}
              variant="outlined"
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
          }}
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

export default BeerForm;
