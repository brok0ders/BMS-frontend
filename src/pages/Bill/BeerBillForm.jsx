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
import React, { useContext, useEffect, useRef, useState } from "react";
import { Delete } from "@mui/icons-material";

import CustomerContext from "../../context/customer/customerContext";
import BeerContext from "../../context/beer/beerContext";
import BillContext from "../../context/bill/billContext";
import UserContext from "../../context/user/userContext";
import CompanyContext from "../../context/company/companyContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Layout/Loader";
import Spinner from "../../components/Layout/Spinner";
import BackButton from "../../components/BackButton";

const BeerBillForm = () => {
  const { company } = useParams();
  const [licensee, setLicensee] = useState("");
  const [beerBrandData, setBeerBrandData] = useState([{}]);
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
  const [sizes, setSizes] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [fholo, setFholo] = useState(0);
  const [fpratifal, setFpratifal] = useState(0);
  const [fwep, setFwep] = useState(0);
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const inputRefs = useRef({});
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [spinner2, setSpinner2] = useState(false);
  const [added, setAdded] = useState(false);
  const [tcs, setTcs] = useState(0);
  const { getCustomerByLisencee } = useContext(CustomerContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  let customerId = "";
  const [currentInput, setCurrentInput] = useState({ brand: "", sizes: [] });

  const getBeers = async () => {
    setLoading(true);
    try {
      const res = await getBeerCom({ id: company });
      setBeerBrandData(res.beer);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const NumberToWordsConverter = (n) => {
    // Ensuring the number has two decimal places
    n = n.toFixed(2);

    const one = [
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Tineteen",
    ];
    const ten = [
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const numToWords = (num, suffix) => {
      let str = "";
      if (num > 19) {
        str += ten[Math.floor(num / 10) - 2];
        if (num % 10 > 0) {
          str += " " + one[(num % 10) - 1];
        }
      } else if (num > 0) {
        str += one[num - 1];
      }

      if (num !== 0) {
        str += " " + suffix;
      }

      return str.trim();
    };

    const convertToWords = (num) => {
      let output = "";

      if (Math.floor(num / 100000) > 0) {
        output += numToWords(Math.floor(num / 100000), "Lakh");
        num %= 100000;
      }

      if (Math.floor(num / 1000) > 0) {
        output += " " + numToWords(Math.floor(num / 1000), "Thousand");
        num %= 1000;
      }

      if (Math.floor(num / 100) > 0) {
        output += " " + numToWords(Math.floor(num / 100), "Hundred");
        num %= 100;
      }

      if (num > 0) {
        if (output !== "") {
          output += " and ";
        }
        output += numToWords(num, "");
      }

      return output.trim();
    };

    const parts = n.split(".");
    const integerPart = parseInt(parts[0], 10);
    const decimalPart = parseInt(parts[1], 10);

    let words = convertToWords(integerPart);

    if (decimalPart > 0) {
      words += " Point";
      for (const digit of parts[1]) {
        words += ` ${one[digit - 1]}`;
      }
    }
    if (!words) {
      return "Zero";
    }
    return words + " Only";
  };

  // console.log(NumberToWordsConverter(12.0));

  const createBill2 = async () => {
    try {
      setSpinner(true);
      const customerData = await createCustomer({ licensee, shop, firm, pan, email });
      customerId = customerData.customer._id;
      const res = await createBill({
        excise,
        pno,
        products,
        customer: customerId,
        seller: user?._id,
        company,
        pratifal: fpratifal,
        tcs,
        total: grandTotal,
        billType: "beer",
      });

      setLicensee("");
      setShop("");
      setFirm("");
      setPan("");
      setExcise("");
      setPno("");
      setProducts([]);
      setGrandTotal(0);
      navigate(`/dashboard/bill/details/${res.bill}`);
    } catch (e) {
    } finally {
      setSpinner(false);
    }
  };
  const getCompany2 = async () => {
    setLoading(true);
    try {
      const res = await getCompany({ id: company });
      setComp(res?.company?.company.name);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleLisencee = async (e) => {
    setLicensee(e.target.value);
    try {
      const res = await getCustomerByLisencee({ licensee: e.target.value });
      if (res.success) {
        setShop(res?.customer[0].shop);
        setFirm(res?.customer[0].firm);
        setPan(res?.customer[0].pan);
        setEmail(res?.customer[0].email);
      } else {
        setShop("");
        setFirm("");
        setPan("");
        setEmail("");
      }
    } catch (e) {
      setShop("");
      setFirm("");
      setPan("");
    }
  };
  useEffect(() => {
    getCompany2();
    getBeers();
  }, []);
  const handleBillSubmit = (e) => {
    e.preventDefault();
    createBill2();
  };

  const handleInputChange = (e) => {
    setAdded(true);
    e.preventDefault();
    const { name, value } = e.target;
    const [type, size] = name.split("-");

    // Validate stock quantity
    const stock = stocks.find((stock) => stock.size === size);
    if (stock && stock.quantity < value) {
      toast.warning(`Stock for ${size} is only ${stock.quantity}`);
      return;
    }

    // Prevent negative values and non-numeric inputs
    if (value !== "" && (isNaN(value) || parseInt(value) < 0)) return;

    setCurrentInput((prevInput) => {
      const existingSizeIndex = prevInput.sizes.findIndex(
        (s) => s.size === size
      );

      if (existingSizeIndex > -1) {
        const updatedSizes = [...prevInput.sizes];
        updatedSizes[existingSizeIndex] = {
          ...updatedSizes[existingSizeIndex],
          [type]: value === "" ? 0 : parseInt(value),
        };

        if (type === "quantity") {
          const selectedBrand = beerBrandData.find(
            (brand) => brand.beer.brandName === currentInput.brand
          );
          const selectedSize = selectedBrand.beer.sizes.find(
            (s) => s.size === size
          );

          if (selectedSize) {
            const basePrice =
              selectedSize.price * (value === "" ? 0 : parseInt(value));
            updatedSizes[existingSizeIndex].price = basePrice;
          }
        }

        return { ...prevInput, sizes: updatedSizes };
      } else {
        const newSize = {
          size: size,
          [type]: value === "" ? 0 : parseInt(value),
        };

        if (type === "quantity") {
          const selectedBrand = beerBrandData.find(
            (brand) => brand.beer.brandName === currentInput.brand
          );
          const selectedSize = selectedBrand.beer.sizes.find(
            (s) => s.size === size
          );

          if (selectedSize) {
            const basePrice =
              selectedSize.price * (value === "" ? 0 : parseInt(value));
            newSize.price = basePrice;
          }
        }

        return { ...prevInput, sizes: [...prevInput.sizes, newSize] };
      }
    });
  };

  const handleAddProduct = (e) => {
    try {
      e.preventDefault();
      if (!added) {
        toast.warning("Select quantity of atleast one size!");
        return;
      }
      let h = fholo;
      let p = fpratifal;
      let w = fwep;
      let q = totalQuantity;
      let t = total;

      const existingProductIndex = products.findIndex(
        (product) => product.brand === currentInput.brand
      );

      if (existingProductIndex > -1) {
        // Subtract previous values
        const existingProduct = products[existingProductIndex];
        existingProduct.sizes.forEach((size) => {
          h -= size.quantity * sizes.find((s) => s.size === size.size).hologram;
          p -= size.quantity * sizes.find((s) => s.size === size.size).pratifal;
          w -= size.quantity * sizes.find((s) => s.size === size.size).wep;
          q -= size.quantity;
          t -= size.price;
        });

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

      // Add current values
      currentInput.sizes.forEach((size) => {
        h += size.quantity * sizes.find((s) => s.size === size.size).hologram;
        p += size.quantity * sizes.find((s) => s.size === size.size).pratifal;
        w += size.quantity * sizes.find((s) => s.size === size.size).wep;
        q += size.quantity;
        t += size.price;
      });

      setFholo(h);
      setFpratifal(p);
      setFwep(w);
      setTotalQuantity(q);
      setTotal(t);

      // Tax calculations
      const vatTax = t * 0.12;
      const cess = (t + vatTax) * 0.02;
      const profit = q * 50;

      const taxTotal = t + vatTax + cess + w + h + profit + p;
      const tcs = taxTotal * 0.01;
      setGrandTotal(taxTotal + tcs);
      setTcs(tcs);
      setCurrentInput({ brand: "", sizes: [] });

      console.log("total quantity: " + q);
      console.log("total price: " + t);
      console.log("vatTax: " + vatTax);
      console.log("cess: " + cess);
      console.log("final wep is: " + w);
      console.log("final holo is: " + h);
      console.log("Profit: " + profit);
      console.log("final pratifal is: " + p);
      console.log("Total tax: " + taxTotal);
      console.log("tcs: " + tcs);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // =================================================>

  const handleDeleteProduct = (index) => {
    setSpinner2(true);
    try {
      let h = fholo;
      let p = fpratifal;
      let w = fwep;
      let q = totalQuantity;
      let t = total;

      // Subtract the values of the product being deleted
      const productToDelete = products[index];

      for (let j = 0; j < beerBrandData.length; j++) {
        if (beerBrandData[j].beer.brandName === productToDelete.brand) {
          productToDelete.sizes.forEach((size, i) => {
            h -=
              size.quantity *
              beerBrandData[j].beer.sizes.find((s) => s.size === size.size)
                .hologram;
            p -=
              size.quantity *
              beerBrandData[j].beer.sizes.find((s) => s.size === size.size)
                .pratifal;
            // console.log("pratifal is: " + p);
            w -=
              size.quantity *
              beerBrandData[j].beer.sizes.find((s) => s.size === size.size).wep;
            q -= size.quantity;
            t -= size.price;
          });
        }
      }

      // Update the products list
      const updatedProducts = products.filter((_, i) => i !== index);
      setProducts(updatedProducts);

      // Set the new values
      setFholo(h);
      setFpratifal(p);
      setFwep(w);
      setTotalQuantity(q);
      setTotal(t);

      // Recalculate all taxes and grand total
      const vatTax = t * (12 / 100);
      const cess = ((t + vatTax) * 2) / 100;
      const profit = q * 50;
      const taxTotal = t + vatTax + cess + w + h + profit + p;
      const tcs = (taxTotal * 1) / 100;
      setGrandTotal(taxTotal + tcs);

      console.log("total quantity: " + q);
      console.log("total price: " + t);
      console.log("vatTax: " + vatTax);
      console.log("cess: " + cess);
      console.log("final wep is: " + w);
      console.log("final holo is: " + h);
      console.log("Profit: " + profit);
      console.log("final pratifal is: " + p);
      console.log("Total tax: " + taxTotal);
      console.log("tcs: " + tcs);
    } catch (e) {
      console.error(e);
    } finally {
      setSpinner2(false);
    }
  };
  const handleBrandChange = (e) => {
    const brand = e.target.value;
    console.log(brand);
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

  return (
    <>
      {!beerBrandData || beerBrandData.length == 0 ? (
        <>
          <div className="w-[25vw] m-auto text-center mt-[5rem]">
            <img src="/images/no-data.png" alt="" className="w-[25vw] m-auto" />
            <p>NO BEER BRAND FOUND FOR THE SELECTED COMPANY!</p>
          </div>
        </>
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              <Box
                noValidate
                autoComplete="off"
                className="py-5 pb-10 px-10 md:py-5 md:px-20 "
              >
                <BackButton className={"top-16 left-2"} />
                <h1 className="md:text-5xl text-center font-bold text-slate-700 px-2 py-2 m-4 text-3xl">
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
                      onChange={handleLisencee}
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
                    <TextField
                      id="basic"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                      variant="outlined"
                    />
                  </Box>
                </Box>

                {/* For Brand Selection */}

                {/* For selecting quantities */}
                <Box
                  className="w-full "
                  component="form"
                  onSubmit={handleAddProduct}
                >
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
                            beerBrandData?.map((brand, i) => (
                              <MenuItem
                                key={brand._id}
                                value={brand?.beer?.brandName}
                                onClick={() => {
                                  console.log(brand.beer);
                                  setStocks(brand.stock);
                                  setSizes(brand.beer.sizes);
                                }}
                              >
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
                              (brand) =>
                                brand?.beer?.brandName === currentInput?.brand
                            )
                            ?.beer?.sizes?.map((size) => (
                              <Box
                                key={size?.size}
                                className="flex flex-col gap-5"
                              >
                                {/* <TextField
                                  fullWidth
                                  value={
                                    currentInput?.sizes.find(
                                      (s) => s.size === size?.size
                                    )?.quantity ?? ""
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
                                    currentInput?.sizes
                                      .find((s) => s.size === size?.size)
                                      ?.price.toFixed(2) || ""
                                  }
                                  label={`Price ${size?.size}`}
                                  name={`price-${size?.size}`}
                                  onChange={handleInputChange}
                                  variant="outlined"
                                  type="number"
                                  focused={false}
                                  inputProps={{ readOnly: true }}
                                /> */}

                                <TextField
                                  fullWidth
                                  value={
                                    currentInput?.sizes.find(
                                      (s) => s.size === size?.size
                                    )?.quantity || ""
                                  }
                                  label={`Quantity ${size?.size}`}
                                  name={`quantity-${size?.size}`}
                                  onChange={handleInputChange}
                                  variant="outlined"
                                  type="number"
                                  InputProps={{ inputProps: { min: 0 } }}
                                />
                                <TextField
                                  fullWidth
                                  value={
                                    currentInput?.sizes
                                      .find((s) => s.size === size?.size)
                                      ?.price.toFixed(2) || 0
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

                <TableContainer className="py-12">
                  <h1 className="md:text-3xl text-2xl font-semibold text-slate-700 py-5">
                    Added Products
                  </h1>
                  <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
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
                            {size === "750ml"
                              ? size + " (Q)"
                              : size === "375ml"
                              ? size + " (P)"
                              : size === "180ml"
                              ? size + " (N)"
                              : size}
                          </TableCell>
                        ))}
                        {allSizes.map((size) => (
                          <TableCell key={`price-${size}`} align="center">
                            {size === "750ml"
                              ? size + " (Q)"
                              : size === "375ml"
                              ? size + " (P)"
                              : size === "180ml"
                              ? size + " (N)"
                              : size}
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
                              <TableCell
                                key={`qty-${size}-${i}`}
                                align="center"
                              >
                                {p.sizes[size]?.quantity || "-"}
                              </TableCell>
                            ))}
                            {allSizes.map((size) => (
                              <TableCell
                                key={`price-${size}-${i}`}
                                align="center"
                              >
                                {p.sizes[size]?.price.toFixed(2) || "-"}
                              </TableCell>
                            ))}
                            <TableCell align="center" className="w-0">
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
                              (acc, p) =>
                                acc + (p.sizes[size]?.price.toFixed(2) || 0),
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
                  <TextField
                    id="filled-read-only-input"
                    label="Grand Total"
                    defaultValue="0"
                    value={grandTotal.toFixed(2)}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Box>

                <Box className="px-2 py-2 m-4 flex justify-end">
                  <TextField
                    id="filled-read-only-input"
                    label="Grand Total (in words)"
                    defaultValue="zero"
                    sx={{ width: "50vw" }}
                    value={NumberToWordsConverter(grandTotal)}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Box>

                <Box className="px-2 py-2 m-4 flex justify-end">
                  {spinner ? (
                    <Button
                      variant="contained"
                      sx={{ minWidth: "6rem", minHeight: "2rem" }}
                    >
                      {<Spinner />}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      sx={{ minWidth: "6rem", minHeight: "2rem" }}
                      onClick={handleBillSubmit}
                    >
                      Submit
                    </Button>
                  )}
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
};

export default BeerBillForm;
