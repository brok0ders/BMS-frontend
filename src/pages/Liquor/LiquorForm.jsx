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
import LiquorContext from "../../context/liquor/liquorContext";
import { useParams } from "react-router-dom";
import CompanyContext from "../../context/company/companyContext";
import { toast } from "react-toastify";

const LiquorForm = () => {
  const [temp, setTemp] = useState([]);
  const [brand, setBrand] = useState([
    {
      _id: 1,
      brandName: "ALCOBREW SINGLE OAK SELECT GRAIN WHISKY",
      company: "668d95e1f70a14edd49f919c",
      sizes: [
        {
          size: "750ml",
          price: 4359.1,
          wep: 36,
          hologram: 5.1,
          pratifal: 82.88,
        },
        {
          size: "180ml",
          price: 4293.82,
          wep: 36,
          hologram: 20.39,
          pratifal: 154.03,
        },
        {
          size: "375ml",
          price: 4369.1,
          wep: 36,
          hologram: 10.2,
          pratifal: 63,
        },
      ],
    },
    {
      _id: 2,
      brandName: "GOLFER'S SHOT 18 HOLE ULTRA PREMIUM BLENDED WHISKY",
      company: "668d95e1f70a14edd49f919c",
      sizes: [
        {
          size: "750ml",
          price: 7039.7,
          wep: 36,
          hologram: 5.1,
          pratifal: 80.1,
        },
      ],
    },
    {
      _id: 3,
      brandName: "GOLFER'S SHOT BARREL RESERVE WHISKY",
      company: "668d95e1f70a14edd49f919c",
      sizes: [
        {
          size: "750ml",
          price: 5751.1,
          wep: 36,
          hologram: 5.1,
          pratifal: 94.61,
        },
        {
          size: "180ml",
          price: 5685.82,
          wep: 36,
          hologram: 20.39,
          pratifal: 165.76,
        },
        {
          size: "375ml",
          price: 5751.1,
          wep: 36,
          hologram: 10.2,
          pratifal: 88.5,
        },
        {
          size: "550ml",
          price: 5751.1,
          wep: 36,
          hologram: 10.2,
          pratifal: 88.5,
        },
      ],
    },
  ]);
  const [brandName, setBrandName] = useState({});
  const [stock, setStock] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const { brands, getLiquorCom, allGlobalLiquor, createLiquor } =
    useContext(LiquorContext);
  const { getCompany } = useContext(CompanyContext);
  const { company } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createLiquor({ liquorId: brandName._id, stock });
      console.log(res);
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

  const getLiquorByComp = async () => {
    const res1 = await getCompany({ id: company });
    setCompanyName(res1.company.company.name);
    const res = await allGlobalLiquor();
    const filtered = await res.filter(
      (liq) => liq.company === res1.company.company._id
    );
    setTemp(filtered);
  };

  useEffect(() => {
    getLiquorByComp();
  }, [company]);
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
