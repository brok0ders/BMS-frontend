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

const beerBrandData = [
  {
    brandName: "Tensberg",
    quantity: {
      650: 120,
      500: 200,
    },
    price: {
      650: 200,
      500: 100,
    },
  },
  {
    brandName: "Tuborg",
    quantity: {
      650: 100,
      500: 230,
    },
    price: {
      650: 220,
      500: 140,
    },
  },
  {
    brandName: "Kingfisher",
    quantity: {
      650: 130,
      500: 540,
    },
    price: {
      650: 180,
      500: 120,
    },
  },
];

const BeerBillForm = () => {
  const [licensee, setLicensee] = useState("");
  const [shop, setShop] = useState("");
  const [firm, setFirm] = useState("");
  const [pan, setPan] = useState("");
  const [excise, setExcise] = useState("");
  const [pno, setPno] = useState("");

  const [products, setProducts] = useState([]);

  const [currentInput, setCurrentInput] = useState({
    brandName: "",
    quantity: {
      650: "",
      500: "",
    },
    price: {
      650: "",
      500: "",
    },
  });

  const handleInputChange = (e) => {
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

      if (type === "quantity" && updatedInput.brandName) {
        const selectedBrand = beerBrandData.find(
          (brand) => brand.brandName === updatedInput.brandName
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

    if (!currentInput.brandName) return;

    setProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex(
        (product) => product.brandName === currentInput.brandName
      );

      if (existingProductIndex > -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex] = {
          brandName: currentInput.brandName,
          quantity: {
            650:
              parseInt(currentInput?.quantity[650] || 0) +
              parseInt(
                updatedProducts[existingProductIndex].quantity[650] || 0
              ),
            500:
              parseInt(currentInput.quantity[500] || 0) +
              parseInt(
                updatedProducts[existingProductIndex].quantity[500] || 0
              ),
          },
          price: {
            650:
              parseInt(currentInput.price[650] || 0) +
              parseInt(updatedProducts[existingProductIndex].price[650] || 0),
            500:
              parseInt(currentInput.price[500] || 0) +
              parseInt(updatedProducts[existingProductIndex].price[500] || 0),
          },
        };
        return updatedProducts;
      }

      return [
        ...prevProducts,
        {
          brandName: currentInput?.brandName,
          quantity: { ...currentInput?.quantity },
          price: { ...currentInput?.price },
        },
      ];
    });

    setCurrentInput({
      brandName: "",
      quantity: {
        650: "",
        500: "",
      },
      price: {
        650: "",
        500: "",
      },
    });
  };

  const handleDeleteProduct = (index) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  const handleBrandChange = (e) => {
    const brandName = e.target.value;
    setCurrentInput((prevInput) => ({
      ...prevInput,
      brandName,
      quantity: { 650: "", 500: "" },
      price: { 650: "", 500: "" },
    }));
  };

  const handleBillSubmit = (e) => {
    e.preventDefault();
    const formData = {
      licensee,
      shop,
      firm,
      pan,
      excise,
      pno,
      products,
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

  const total = products.reduce(
    (acc, p) => acc + parseInt(p.price[650] || 0) + parseInt(p.price[500] || 0),
    0
  );

  const vatTax = 12 / 100;
  const cess = 2 / 100;
  const wecp =
    products.reduce(
      (acc, p) =>
        acc + parseInt(p.quantity[650] || 0) + parseInt(p.quantity[500] || 0),
      0
    ) * 36;

  const profit =
    products.reduce(
      (acc, p) =>
        acc + parseInt(p.quantity[650] || 0) + parseInt(p.quantity[500] || 0),
      0
    ) * 50;

  const taxTotal =
    total + total * vatTax + (total + total * vatTax) * cess + wecp + profit;
  const tcs = (taxTotal * 1) / 100;
  const grandTotal = taxTotal + tcs;

  return (
    <Box
      noValidate
      autoComplete="off"
      className="py-10 px-10 md:py-5 md:px-20 "
    >
      <h1 className="md:text-5xl text-center font-bold text-slate-700 px-2 py-2 m-4 text-4xl">
        Beer Bill Details
      </h1>

      <Box className="w-full">
        <h1 className="md:text-3xl px-2 py-2 m-4 font-semibold text-2xl">
          Licensee Details
        </h1>
        <Box className="px-3 grid md:grid-cols-3 gap-10 sm:grid-cols-2">
          <TextField
            required
            id="licensee"
            value={licensee}
            onChange={(e) => setLicensee(e.target.value)}
            label="Licensee"
            variant="outlined"
          />
          <TextField
            required
            id="shop"
            value={shop}
            onChange={(e) => setShop(e.target.value)}
            label="Shop"
            variant="outlined"
          />
          <TextField
            required
            id="firm"
            value={firm}
            onChange={(e) => setFirm(e.target.value)}
            label="Firm"
            variant="outlined"
          />
          <TextField
            required
            id="pan"
            value={pan}
            onChange={(e) => setPan(e.target.value)}
            label="PAN No."
            variant="outlined"
          />
          <TextField
            required
            id="excise"
            value={excise}
            onChange={(e) => setExcise(e.target.value)}
            label="Excise FL"
            variant="outlined"
          />
          <TextField
            required
            id="pno"
            value={pno}
            onChange={(e) => setPno(e.target.value)}
            label="P. No."
            variant="outlined"
          />
        </Box>
      </Box>

      <Box className="w-full" component="form" onSubmit={handleAddProduct}>
        <Box className="w-full">
          <h1 className="md:text-3xl px-2 py-2 m-4 font-semibold text-2xl">
            Select Brand
          </h1>
          <Box className="px-3 grid grid-cols-1 sm:grid-cols-3 gap-10">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="brand-label">Brand Name</InputLabel>
              <Select
                required
                labelId="brand-label"
                id="brand-select"
                value={currentInput?.brandName || ""}
                label="Brand Name"
                name="brand"
                className="w-full"
                onChange={handleBrandChange}
              >
                {beerBrandData.map((brand) => (
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
        <Box className="px-3 grid md:grid-cols-2 gap-10 sm:grid-cols-2">
          <TextField
            required
            id="quantity-650"
            name="quantity-650"
            type="number"
            value={
              currentInput?.quantity[650] !== undefined
                ? currentInput.quantity[650]
                : ""
            }
            onChange={handleInputChange}
            inputProps={{ min: 0 }}
            label="650 ml Quantity"
            variant="outlined"
          />
          <TextField
            required
            id="quantity-500"
            name="quantity-500"
            type="number"
            value={
              currentInput?.quantity[500] !== undefined
                ? currentInput.quantity[500]
                : ""
            }
            onChange={handleInputChange}
            inputProps={{ min: 0 }}
            label="500 ml Quantity"
            variant="outlined"
          />
          <TextField
            id="price-650"
            name="price-650"
            value={currentInput?.price[650] || ""}
            onChange={handleInputChange}
            label="650 ml Price"
            disabled
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="price-500"
            name="price-500"
            value={currentInput?.price[500] || ""}
            onChange={handleInputChange}
            label="500 ml Price"
            disabled
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
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
              (currentInput?.price[650] || 0) + (currentInput?.price[500] || 0)
            }
          />

          <Button variant="contained" type="submit">
            Add
          </Button>
        </Box>
      </Box>

      <Box className="w-full">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" colSpan={6}>
                  <h1 className="md:text-3xl text-2xl font-semibold text-slate-700 py-2">
                    Added Products
                  </h1>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  Brand Name
                </TableCell>
                <TableCell align="center">650 ml Quantity</TableCell>
                <TableCell align="center">500 ml Quantity</TableCell>
                <TableCell align="center">650 ml Price</TableCell>
                <TableCell align="center">500 ml Price</TableCell>
                <TableCell align="center">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell align="center" colSpan={2}>
                    {product.brandName}
                  </TableCell>
                  <TableCell align="center">{product?.quantity[650]}</TableCell>
                  <TableCell align="center">{product?.quantity[500]}</TableCell>
                  <TableCell align="center">{product?.price[650]}</TableCell>
                  <TableCell align="center">{product?.price[500]}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleDeleteProduct(index)}>
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell align="center" colSpan={2} sx={{ fontWeight: 700 }}>
                  Total
                </TableCell>
                <TableCell align="center">
                  {products.reduce(
                    (acc, p) => parseInt(acc) + parseInt(p?.quantity[650] || 0),
                    0
                  ) || 0}
                </TableCell>
                <TableCell align="center">
                  {products.reduce(
                    (acc, p) => parseInt(acc) + parseInt(p?.quantity[500] || 0),
                    0
                  ) || 0}
                </TableCell>

                <TableCell align="center">
                  {products.reduce(
                    (acc, p) => parseInt(acc) + parseInt(p?.price[650] || 0),
                    0
                  ) || 0}
                </TableCell>
                <TableCell align="center">
                  {products.reduce(
                    (acc, p) => parseInt(acc) + parseInt(p?.price[500] || 0),
                    0
                  ) || 0}
                </TableCell>

                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
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
      <Box className="py-2 px-2 flex md:justify-end mt-1 gap-5 justify-center">
        <Button variant="contained" onClick={handleBillSubmit}>
          SUBMIT {"  "}
        </Button>
      </Box>
    </Box>
  );
};

export default BeerBillForm;
