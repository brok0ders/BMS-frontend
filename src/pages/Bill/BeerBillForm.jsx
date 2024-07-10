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
import React, { useContext, useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import beerContext from "../../context/beer/beerContext";
import CustomerContext from "../../context/customer/customerContext";
import BillContext from "../../context/bill/billContext";
import UserContext from "../../context/user/userContext";
import CompanyContext from "../../context/company/companyContext";
import { useParams } from "react-router-dom";
import BeerContext from "../../context/beer/beerContext";

const BeerBillForm = () => {
  const { company } = useParams();
  const [licensee, setLicensee] = useState("");
  const [beerBrandData, setbeerBrandData] = useState([{}]);
  const [shop, setShop] = useState("");
  const [firm, setFirm] = useState("");
  const [pan, setPan] = useState("");
  const [excise, setExcise] = useState("");
  const [pno, setPno] = useState("");
  const { getBeerCom } = useContext(BeerContext);
  const { createCustomer } = useContext(CustomerContext);
  const { createBill } = useContext(BillContext);
  const { user } = useContext(UserContext);
  const { getCompany } = useContext(CompanyContext);
  const [comp, setComp] = useState("");
  const [products, setProducts] = useState([]);

  let customerId = "";

  const [currentInput, setCurrentInput] = useState({ brand: "", sizes: [] });

  const getbeers = async () => {
    const res = await getBeerCom({ id: company });
    setbeerBrandData(res.beer);
  };
  const createCustomer2 = async () => {
    const res = await createCustomer({ licensee, shop, firm, pan });
    customerId = res.customer._id;
  };
  const createBill2 = async () => {
    const res = await createBill({
      customer: customerId,
      seller: user,
      products,
      company,
    });
    console.log(res);
  };
  const getCompany2 = async () => {
    const res = await getCompany({ id: company });
    setComp(res?.company?.company.name);
  };
  useEffect(() => {
    getCompany2();
    getbeers();
  }, []);
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
    createCustomer2();
    createBill2();
    setLicensee("");
    setShop("");
    setFirm("");
    setPan("");
    setExcise("");
    setPno("");
    setProducts([]);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const [type, size] = name.split("-");

    if (value < 0) return;

    setCurrentInput((prevInput) => {
      const existingSizeIndex = prevInput.sizes.findIndex(
        (s) => s.size === size
      );

      if (existingSizeIndex > -1) {
        const updatedSizes = [...prevInput.sizes];
        updatedSizes[existingSizeIndex] = {
          ...updatedSizes[existingSizeIndex],
          [type]: parseInt(value),
        };

        if (type === "quantity") {
          const selectedBrand = beerBrandData.find(
            (brand) => brand.beer.brandName === currentInput.brand
          );
          const selectedSize = selectedBrand.beer.sizes.find(
            (s) => s.size === size
          );

          if (selectedSize) {
            updatedSizes[existingSizeIndex].price =
              selectedSize.price * parseInt(value);
          }
        }

        return { ...prevInput, sizes: updatedSizes };
      } else {
        const newSize = {
          size: size,
          [type]: parseInt(value),
        };

        if (type === "quantity") {
          const selectedBrand = beerBrandData.find(
            (brand) => brand.beer.brandName === currentInput.brand
          );
          const selectedSize = selectedBrand.beer.sizes.find(
            (s) => s.size === size
          );

          if (selectedSize) {
            newSize.price = selectedSize.price * parseInt(value);
          }
        }

        return { ...prevInput, sizes: [...prevInput.sizes, newSize] };
      }
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const existingProductIndex = products.findIndex(
      (product) => product.brand === currentInput.brand
    );

    if (existingProductIndex > -1) {
      // Update existing product
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex].sizes = currentInput.sizes;
      setProducts(updatedProducts);
    } else {
      // Add new product
      setProducts((prevProducts) => [
        ...prevProducts,
        {
          brand: currentInput.brand,
          sizes: currentInput.sizes,
        },
      ]);
    }
    setCurrentInput({ brand: "", sizes: [] });
  };

  const handleDeleteProduct = (index) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setCurrentInput((prevInput) => ({
      ...prevInput,
      brand: brand,
      sizes: [],
    }));
  };

  // Preprocess products to create a sizes object
  const processedProducts = products.map((product) => {
    const sizesObject = {};
    product.sizes.forEach((size) => {
      sizesObject[size.size] = { quantity: size.quantity, price: size.price };
    });
    return { ...product, sizes: sizesObject };
  });

  // Extract all unique sizes
  const allSizes = Array.from(
    new Set(
      products.flatMap((product) => product.sizes.map((size) => size.size))
    )
  );

  // All taxes calculation
  const total = products.reduce((acc, p) => acc + p.price, 0);
  const vatTax = 12 / 100;
  const cess = 2 / 100;
  const wecp = products.reduce((acc, p) => acc + p.quantity, 0) * 36;

  const profit = products.reduce((acc, p) => acc + p.quantity, 0) * 50;

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
            Supplier
          </h1>
          <Box className="px-3 grid grid-cols-1 sm:grid-cols-3 gap-10">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <TextField
                value={comp}
                label="Supplier"
                required
                variant="outlined"
                inputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </Box>
        </Box>
        <Box className="w-full">
          <h1 className="md:text-3xl px-2 py-2 m-4 font-semibold text-2xl">
            Select Brand
          </h1>
          <Box className="px-3 grid grid-cols-1 sm:grid-cols-3 gap-10">
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
                {beerBrandData.length > 0 &&
                  beerBrandData?.map((brand) => (
                    <MenuItem key={brand._id} value={brand?.beer?.brandName}>
                      {brand?.beer?.brandName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        {currentInput?.brand && (
          <>
            <h1 className="md:text-3xl px-2 py-2 m-4 font-semibold text-2xl">
              Select Quantities
            </h1>
            <Box className="px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {currentInput?.brand &&
                beerBrandData
                  .find(
                    (brand) => brand?.beer?.brandName === currentInput?.brand
                  )
                  ?.beer?.sizes?.map((size) => (
                    <Box key={size?.size} className="flex flex-col gap-5">
                      <TextField
                        fullWidth
                        value={
                          currentInput?.sizes.find((s) => s.size === size?.size)
                            ?.quantity || ""
                        }
                        label={`Quantity ${size?.size}`}
                        name={`quantity-${size?.size}`}
                        onChange={handleInputChange}
                        variant="outlined"
                        type="number"
                      />
                      <TextField
                        fullWidth
                        value={
                          currentInput?.sizes.find((s) => s.size === size?.size)
                            ?.price || ""
                        }
                        label={`Price ${size?.size}`}
                        name={`price-${size?.size}`}
                        onChange={handleInputChange}
                        variant="outlined"
                        type="number"
                        focused={false}
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                  ))}
            </Box>
            <Box className="px-2 py-2 m-4 flex justify-end">
              <Button variant="contained" type="submit">
                Add Product
              </Button>
            </Box>
          </>
        )}
      </Box>

      {/* Product Details */}

      <TableContainer className="py-12">
        <h1 className="md:text-3xl text-2xl font-semibold text-slate-700 py-5">
          Added Products
        </h1>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Brand Name</TableCell>
              <TableCell align="center" colSpan={allSizes.length}>
                Quantity
              </TableCell>
              <TableCell align="center" colSpan={allSizes.length}>
                Price
              </TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              {allSizes.map((size) => (
                <TableCell key={`qty-${size}`} align="center">
                  {size}
                </TableCell>
              ))}
              {allSizes.map((size) => (
                <TableCell key={`price-${size}`} align="center">
                  {size}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {processedProducts.length > 0 &&
              processedProducts.map((p, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{p.brand}</TableCell>
                  {allSizes.map((size) => (
                    <TableCell key={`qty-${size}-${i}`} align="center">
                      {p.sizes[size]?.quantity || "-"}
                    </TableCell>
                  ))}
                  {allSizes.map((size) => (
                    <TableCell key={`price-${size}-${i}`} align="center">
                      {p.sizes[size]?.price || "-"}
                    </TableCell>
                  ))}
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
              {allSizes.map((size) => (
                <TableCell key={`qty-total-${size}`} align="center">
                  {processedProducts.reduce(
                    (acc, p) => acc + (p.sizes[size]?.quantity || 0),
                    0
                  )}
                </TableCell>
              ))}
              {allSizes.map((size) => (
                <TableCell key={`price-total-${size}`} align="center">
                  {processedProducts.reduce(
                    (acc, p) => acc + (p.sizes[size]?.price || 0),
                    0
                  )}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* Total Calculation */}

      <Box className="px-2 py-2 m-4 flex justify-end">
        <Button variant="contained" onClick={handleBillSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default BeerBillForm;
