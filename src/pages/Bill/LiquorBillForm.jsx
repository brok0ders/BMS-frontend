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
import LiquorContext from "../../context/liquor/liquorContext";
import CustomerContext from "../../context/customer/customerContext";
import BillContext from "../../context/bill/billContext";
import UserContext from "../../context/user/userContext";
import CompanyContext from "../../context/company/companyContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Layout/Loader";
import Spinner from "../../components/Layout/Spinner";

const LiquorBillForm = () => {
  const { company } = useParams();
  const [licensee, setLicensee] = useState("");
  const [liquorBrandData, setLiquorBrandData] = useState([{}]);
  const [shop, setShop] = useState("");
  const [firm, setFirm] = useState("");
  const [pan, setPan] = useState("");
  const [excise, setExcise] = useState("");
  const [pno, setPno] = useState("");
  const { getLiquorCom } = useContext(LiquorContext);
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
  const [stocks, setStocks] = useState();
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [spinner2, setSpinner2] = useState(false);
  const navigate = useNavigate();
  let customerId = "";

  const NumberToWordsConverter = (n) => {
    if (isNaN(n)) {
      return "Invalid number";
    }
    // Ensuring the number has two decimal places
    n = parseFloat(n).toFixed(2);

    const one = [
      "Zero", // Add zero to handle digits after decimal
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
      "Nineteen",
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
          str += " " + one[num % 10];
        }
      } else if (num > 0) {
        str += one[num];
      }

      if (num !== 0) {
        str += " " + suffix;
      }

      return str.trim();
    };

    const convertToWords = (num) => {
      let output = "";

      if (Math.floor(num / 100000) > 0) {
        output += numToWords(Math.floor(num / 100000), "lakh");
        num %= 100000;
      }

      if (Math.floor(num / 1000) > 0) {
        output += " " + numToWords(Math.floor(num / 1000), "thousand");
        num %= 1000;
      }

      if (Math.floor(num / 100) > 0) {
        output += " " + numToWords(Math.floor(num / 100), "hundred");
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
      words += " point";
      for (const digit of parts[1]) {
        words += ` ${one[digit]}`;
      }
    }

    if (!words) {
      return "zero only";
    }
    return words + " only";
  };


  const [currentInput, setCurrentInput] = useState({ brand: "", sizes: [] });

  const getLiquors = async () => {
    setLoading(true);
    try {
      const res = await getLiquorCom({ id: company });
      setLiquorBrandData(res.liquor);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const createBill2 = async () => {
    try {
      setSpinner(true);
      const customerData = await createCustomer({ licensee, shop, firm, pan });
      customerId = customerData.customer._id;
      const res = await createBill({
        excise,
        pno,
        products,
        customer: customerId,
        seller: user?._id,
        company,
        total: grandTotal,
        billType: "liquor",
      });
      setLicensee("");
      setShop("");
      setFirm("");
      setPan("");
      setExcise("");
      setPno("");
      setProducts([]);
      setGrandTotal(0);
      getLiquors();
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
  useEffect(() => {
    getCompany2();
    getLiquors();
  }, []);

  const handleBillSubmit = (e) => {
    e.preventDefault();
    createBill2();
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const [type, size] = name.split("-");
    // value = parseFloat(value);
    // Prevent negative values and non-numeric inputs
    if (value === "" || isNaN(value) || parseInt(value) < 0) {
    }
    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i].size === size) {
        if (stocks[i].quantity < value) {
          toast.warning(`Stock for ${size} is only ${stocks[i].quantity}`);
        }
      }
    }

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
          // Adjust price based on quantity if necessary
          const selectedBrand = liquorBrandData.find(
            (brand) => brand.liquor.brandName === currentInput.brand
          );
          const selectedSize = selectedBrand.liquor.sizes.find(
            (s) => s.size === size
          );

          if (selectedSize) {
            const basePrice =
              selectedSize.price * isNaN(parseInt(value)) ? 0 : parseInt(value);
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
          // Adjust price based on quantity if necessary
          const selectedBrand = liquorBrandData.find(
            (brand) => brand.liquor.brandName === currentInput.brand
          );
          const selectedSize = selectedBrand.liquor.sizes.find(
            (s) => s.size === size
          );

          if (selectedSize) {
            const basePrice = selectedSize.price * parseInt(value);
            newSize.price = basePrice;
          }
        }

        return { ...prevInput, sizes: [...prevInput.sizes, newSize] };
      }
    });
  };

  const handleAddProduct = (e) => {
    setSpinner2(true);
    try {
      e.preventDefault();

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
        existingProduct.sizes.forEach((size, i) => {
          h -= size.quantity * sizes[i].hologram;
          p -= size.quantity * sizes[i].pratifal;
          w -= size.quantity * sizes[i].wep;
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
      currentInput.sizes?.forEach((size, i) => {
        h += size.quantity * sizes[i].hologram;
        p += size.quantity * sizes[i].pratifal;
        w += size.quantity * sizes[i].wep;
        q += size.quantity;
        t += size.price;
      });

      setCurrentInput({ brand: "", sizes: [] });

      setFholo(h);
      setFpratifal(p);
      setFwep(w);
      setTotalQuantity(q);
      setTotal(t);

      // All taxes calculation
      const vatTax = t * (12 / 100);
      const cess = ((t + vatTax) * 2) / 100;

      const profit = q * 50;

      const taxTotal = t + vatTax + cess + w + h + profit + p;
      const tcs = (taxTotal * 1) / 100;
      setGrandTotal(taxTotal + tcs);
      // console.log("total quantity: " + q);
      // console.log("total price: " + t);
      // console.log("vatTax: " + vatTax);
      // console.log("cess: " + cess);
      // console.log("final wep is: " + w);
      // console.log("final holo is: " + h);
      // console.log("Profit: " + profit);
      // console.log("final pratifal is: " + p);
      // console.log("Total tax: " + taxTotal);
      // console.log("tcs: " + tcs);
    } catch (e) {
    } finally {
      setSpinner2(false);
    }
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
      sizesObject[size.size] = {
        quantity: size.quantity,
        price: isNaN(size.price) ? 0 : size.price,
      };
    });
    // console.log({ ...product, sizes: sizesObject });
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
      {!liquorBrandData || liquorBrandData.length === 0 ? (
        <>
          <div className="w-[25vw] m-auto text-center mt-[5rem]">
            <img src="/images/no-data.png" alt="" className="w-[25vw] m-auto" />
            <p>NO LIQUOR BRAND FOUND FOR THE SELECTED COMPANY!</p>
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
                className="py-10 px-10 md:py-5 md:px-20 "
              >
                <h1 className="md:text-5xl text-center font-bold text-slate-700 px-2 py-2 m-4 text-4xl">
                  FL Bill Details
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
                          {liquorBrandData.length > 0 &&
                            liquorBrandData?.map((brand) => (
                              <MenuItem
                                key={brand._id}
                                value={brand?.liquor?.brandName}
                                onClick={() => {
                                  setStocks(brand.stock);
                                  setSizes(brand.liquor.sizes);
                                }}
                              >
                                {brand?.liquor?.brandName}
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
                          liquorBrandData
                            .find(
                              (brand) =>
                                brand?.liquor?.brandName === currentInput?.brand
                            )
                            ?.liquor?.sizes?.map((size) => (
                              <Box
                                key={size?.size}
                                className="flex flex-col gap-5"
                              >
                                <TextField
                                  fullWidth
                                  value={
                                    currentInput?.sizes.find(
                                      (s) => s.size === size?.size
                                    )?.quantity ?? ""
                                  }
                                  label={`Quantity ${
                                    size?.size === "750ml"
                                      ? size?.size + " (Q)"
                                      : size?.size === "375ml"
                                      ? size?.size + " (P)"
                                      : size?.size === "180ml"
                                      ? size?.size + " (N)"
                                      : size?.size
                                  }`}
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
                                  label={`Price ${
                                    size?.size === "750ml"
                                      ? size?.size + " (Q)"
                                      : size?.size === "375ml"
                                      ? size?.size + " (P)"
                                      : size?.size === "180ml"
                                      ? size?.size + " (N)"
                                      : size?.size
                                  }`}
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
                        {spinner2 ? (
                          <Button variant="contained">{<Spinner />}</Button>
                        ) : (
                          <Button variant="contained" type="submit">
                            Add Product
                          </Button>
                        )}
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
                                {isNaN(p.sizes[size]?.price.toFixed(2))
                                  ? 0
                                  : p.sizes[size]?.price.toFixed(2) || "-"}
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
                            {processedProducts
                              .reduce(
                                (acc, p) => acc + (p.sizes[size]?.price || 0),
                                0
                              )
                              .toFixed(2)}
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
                    <Button variant="contained">{<Spinner />}</Button>
                  ) : (
                    <Button variant="contained" onClick={handleBillSubmit}>
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

export default LiquorBillForm;
