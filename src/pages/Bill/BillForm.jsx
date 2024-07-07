import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Delete } from "@mui/icons-material";

const liquorBrandData = [
  {
    brandName: "8 PM",
    stock: {
      Q: 22,
      P: 12,
      N: 7,
    },
    price: {
      Q: 1200,
      P: 2100,
      N: 700,
    },
  },
  {
    brandName: "Black Dog",
    stock: {
      Q: 45,
      P: 75,
      N: 87,
    },
    price: {
      Q: 12700,
      P: 12764,
      N: 4000,
    },
  },
  {
    brandName: "Brandi",
    stock: {
      Q: 16,
      P: 43,
      N: 98,
    },
    price: {
      Q: 3244,
      P: 5256,
      N: 7900,
    },
  },
];

const BillForm = () => {
  const [licensee, setLicensee] = useState("");
  const [shop, setShop] = useState("");
  const [firm, setFirm] = useState("");
  const [pan, setPan] = useState("");
  const [excise, setExcise] = useState("");
  const [pno, setPno] = useState("");

  const [products, setProducts] = useState([]);

  const [currentInput, setCurrentInput] = useState({});

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const [type, key] = name.split("-");
    if (value < 0) return;

    setCurrentInput((prevInput) => {
      const updatedInput = {
        ...prevInput,
        [type]: {
          ...prevInput[type],
          [key]: parseInt(value),
        },
      };

      if (type === "quantity" && updatedInput.brand) {
        const selectedBrand = liquorBrandData.find(
          (brand) => brand.brandName === updatedInput.brand
        );

        if (selectedBrand) {
          updatedInput.price[key] =
            selectedBrand.price[key] * parseInt(value) || 0;
        }
      }

      return updatedInput;
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex(
        (product) => product.brand === currentInput.brand
      );

      if (existingProductIndex > -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex] = {
          brand: currentInput.brand,
          quantity: {
            Q:
              parseInt(currentInput.quantity.Q || 0) +
              parseInt(updatedProducts[existingProductIndex].quantity.Q || 0),
            P:
              parseInt(currentInput.quantity.P || 0) +
              parseInt(updatedProducts[existingProductIndex].quantity.P || 0),
            N:
              parseInt(currentInput.quantity.N || 0) +
              parseInt(updatedProducts[existingProductIndex].quantity.N || 0),
          },
          price: {
            Q:
              parseInt(currentInput.price.Q || 0) +
              parseInt(updatedProducts[existingProductIndex].price.Q || 0),
            P:
              parseInt(currentInput.price.P || 0) +
              parseInt(updatedProducts[existingProductIndex].price.P || 0),
            N:
              parseInt(currentInput.price.N || 0) +
              parseInt(updatedProducts[existingProductIndex].price.N || 0),
          },
        };
        return updatedProducts;
      }

      return [
        ...prevProducts,
        {
          brand: currentInput?.brand,
          quantity: { ...currentInput?.quantity },
          price: { ...currentInput?.price },
        },
      ];
    });

    setCurrentInput(() => ({
      brand: "",
      quantity: {
        Q: "",
        P: "",
        N: "",
      },
      price: {
        Q: "",
        P: "",
        N: "",
      },
    }));
  };

  const handleDeleteProduct = (index) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setCurrentInput((prevInput) => ({
      ...prevInput,
      brand: brand,
      quantity: {},
      price: {},
    }));
  };

  const handleBillSubmit = (e) => {
    const formData = {
      products,
      excise,
      pno,
    };
    console.log(formData);
    setLicensee("");
    setShop("");
    setFirm("");
    setPan("");
    setExcise("");
    setPno("");
    setProducts([]);
  };

  // All taxes calculation
  const total = products.reduce(
    (acc, p) =>
      acc +
      parseInt(p.price.Q || 0) +
      parseInt(p.price.P || 0) +
      parseInt(p.price.N || 0),
    0
  );
  console.log(total);
  const vatTax = 12 / 100;
  const cess = 2 / 100;
  const wecp =
    products.reduce(
      (acc, p) =>
        acc +
        parseInt(p.quantity.Q || 0) +
        parseInt(p.quantity.P || 0) +
        parseInt(p.quantity.N || 0),
      0
    ) * 36;

  // const hologram=

  const profit =
    products.reduce(
      (acc, p) =>
        acc +
        parseInt(p.quantity.Q || 0) +
        parseInt(p.quantity.P || 0) +
        parseInt(p.quantity.N || 0),
      0
    ) * 50;

  // const pratifal=

  const taxTotal =
    total + total * vatTax + (total + total * vatTax) * cess + wecp + profit;
  const tcs = (taxTotal * 1) / 100;
  const grandTotal = taxTotal + tcs;

  console.log("Total: " + total);
  console.log("Vat: " + total * vatTax);
  console.log("cess: " + (total + vatTax) * cess);
  console.log("Women: : " + wecp);
  console.log("Proft:  " + profit);
  console.log("Tax Totlal:  : " + taxTotal);
  console.log("Tcs: " + taxTotal);

  return (
    <Box
      noValidate
      autoComplete="off"
      className="py-10 px-10 md:py-20 md:px-20 "
    >
      <h1 className="md:text-5xl text-center font-bold text-slate-700 px-2 py-2 m-4 text-4xl">
        Bill Details
      </h1>

      {/* Licensee Details */}

      <Box className="w-full ">
        <h1 className="md:text-3xl px-2 py-2 m-4 font-semibold text-2xl">
          Licensee Details
        </h1>
        <Box className="px-3 grid md:grid-cols-3 gap-10 sm:grid-cols-2 ">
          <TextField
            required
            id="outlined-basic"
            value={licensee}
            onChange={(e) => setLicensee(e.target.value)}
            label="Licensee"
            variant="outlined"
          />
          <TextField
            required
            id="outlined-basic"
            value={shop}
            onChange={(e) => setShop(e.target.value)}
            label="Shop"
            variant="outlined"
          />
          <TextField
            required
            id="outlined-basic"
            value={firm}
            onChange={(e) => setFirm(e.target.value)}
            label="Firm"
            variant="outlined"
          />
          <TextField
            required
            id="outlined-basic"
            value={pan}
            onChange={(e) => setPan(e.target.value)}
            label="PAN No."
            variant="outlined"
          />
          <TextField
            required
            id="outlined-basic"
            value={excise}
            onChange={(e) => setExcise(e.target.value)}
            label="Excise FL"
            variant="outlined"
          />
          <TextField
            required
            id="outlined-basic"
            value={pno}
            onChange={(e) => setPno(e.target.value)}
            label="P. No."
            variant="outlined"
          />
        </Box>
      </Box>

      {/* For Brand Selection */}

      {/* For selecting quantities */}
      <Box className="w-full " component="form" onSubmit={handleAddProduct}>
        <Box className="w-full">
          <h1 className="md:text-3xl px-2 py-2 m-4 font-semibold text-2xl">
            Select Brand
          </h1>
          <Box className="px-3 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* <InputLabel id="demo-simple-select-helper-label">Age</InputLabel> */}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Brand Name
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={currentInput?.brand || ""}
                label="Brand Name"
                name="brand"
                className="w-full"
                onChange={handleBrandChange}
              >
                {liquorBrandData.map((brand) => (
                  <MenuItem key={brand.brandName} value={brand.brandName}>
                    {brand.brandName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <h1 className="md:text-3xl px-2 py-2 m-4 font-semibold text-2xl">
          Select Quantities
        </h1>
        <Box className="px-3 grid md:grid-cols-3 sm:grid-cols-2 gap-10">
          <TextField
            required
            defaultValue={""}
            id="outlined-basic"
            label="Quarts(Q)"
            name="quantity-Q"
            variant="outlined"
            type="number"
            inputProps={{ min: 0 }}
            value={currentInput?.quantity?.Q}
            onChange={handleInputChange}
          />
          <TextField
            required
            id="outlined-basic"
            label="Pints(P)"
            name="quantity-P"
            variant="outlined"
            type="number"
            inputProps={{ min: 0 }}
            value={currentInput?.quantity?.P}
            onChange={handleInputChange}
          />
          <TextField
            required
            id="outlined-basic"
            label="Nips(N)"
            name="quantity-N"
            variant="outlined"
            type="number"
            inputProps={{ min: 0 }}
            value={currentInput?.quantity?.N}
            onChange={handleInputChange}
          />
          <TextField
            required
            id="outlined-basic"
            label="Price for Q"
            name="price-Q"
            variant="outlined"
            type="number"
            inputProps={{ min: 0 }}
            disabled
            value={currentInput?.price?.Q || ""}
          />
          <TextField
            required
            id="outlined-basic"
            label="Price for P"
            name="price-P"
            variant="outlined"
            type="number"
            inputProps={{ min: 0 }}
            disabled
            value={currentInput?.price?.P || ""}
          />
          <TextField
            required
            id="outlined-basic"
            label="Price for N"
            name="price-N"
            variant="outlined"
            type="number"
            inputProps={{ min: 0 }}
            disabled
            value={currentInput?.price?.N || ""}
          />
        </Box>
        <Box className="py-2 px-2 flex justify-end mt-4 gap-5">
          <TextField
            required
            id="outlined-read-only-input"
            label="Total"
            InputProps={{
              readOnly: true,
            }}
            disabled
            value={
              (currentInput?.price?.Q || 0) +
              (currentInput?.price?.P || 0) +
              (currentInput?.price?.N || 0)
            }
          />

          <Button variant="contained" type="submit">
            Add
          </Button>
        </Box>
      </Box>

      {/* Table creation for adding bills */}

      <TableContainer className="py-12">
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Brand Name</TableCell>
              <TableCell align="center" colSpan={3}>
                Quantity (In Case)
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Rate (In Case)
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Q</TableCell>
              <TableCell align="right">P</TableCell>
              <TableCell align="right">N</TableCell>
              <TableCell align="right">Q</TableCell>
              <TableCell align="right">P</TableCell>
              <TableCell align="right">N</TableCell>
              <TableCell align="right" className="w-0">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.length > 0 &&
              products.map((p, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{p.brand}</TableCell>
                  <TableCell align="right">{p.quantity.Q}</TableCell>
                  <TableCell align="right">{p.quantity.P}</TableCell>
                  <TableCell align="right">{p.quantity.N}</TableCell>
                  <TableCell align="right">{p.price.Q}</TableCell>
                  <TableCell align="right">{p.price.P}</TableCell>
                  <TableCell align="right">{p.price.N}</TableCell>
                  <TableCell align="right" className="w-0">
                    <Button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteProduct(i)}
                    >
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell colSpan={2} sx={{ fontWeight: 700 }}>
                Total
              </TableCell>
              <TableCell align="right">
                {products.reduce(
                  (acc, p) => parseInt(acc) + parseInt(p.quantity.Q || 0),
                  0
                ) || 0}
              </TableCell>
              <TableCell align="right">
                {products.reduce(
                  (acc, p) => parseInt(acc) + parseInt(p.quantity.P || 0),
                  0
                ) || 0}
              </TableCell>
              <TableCell align="right">
                {products.reduce(
                  (acc, p) => parseInt(acc) + parseInt(p.quantity.N || 0),
                  0
                ) || 0}
              </TableCell>
              <TableCell align="right">
                {products.reduce(
                  (acc, p) => parseInt(acc) + parseInt(p.price.Q || 0),
                  0
                ) || 0}
              </TableCell>
              <TableCell align="right">
                {products.reduce(
                  (acc, p) => parseInt(acc) + parseInt(p.price.P || 0),
                  0
                ) || 0}
              </TableCell>
              <TableCell align="right">
                {products.reduce(
                  (acc, p) => parseInt(acc) + parseInt(p.price.N || 0),
                  0
                ) || 0}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="py-2 px-2 flex justify-end mt-4 gap-5">
        <TextField
          required
          id="outlined-read-only-input"
          label="Grand Total"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
          value={grandTotal.toFixed(2)}
        />
      </Box>
      {/* Final submit button */}
      <Box className="py-2 px-2 flex md:justify-end mt-4 gap-5 justify-center">
        <Button variant="contained" onClick={handleBillSubmit}>
          SUBMIT {"  "}
        </Button>
      </Box>
    </Box>
  );
};

export default BillForm;
