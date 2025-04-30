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
import { Delete, GradeOutlined } from "@mui/icons-material";

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
import LiquorContext from "../../context/liquor/liquorContext";

const CalculatorPage = () => {
  const [beerBrandData, setBeerBrandData] = useState([{}]);
  const { getMasterBeerCom } = useContext(BeerContext);
  const { getLiquorCompany } = useContext(LiquorContext);

  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [fholo, setFholo] = useState(0);
  const [fpratifal, setFpratifal] = useState(0);
  const [fwep, setFwep] = useState(0);
  const [fexduty, setFexduty] = useState(0);
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [spinner2, setSpinner2] = useState(false);
  const [added, setAdded] = useState(false);
  const [tcs, setTcs] = useState(0);
  const [gTotal, setGTotal] = useState(0);

  const [currentInput, setCurrentInput] = useState({ brand: "", sizes: [] });

  const getBeers = async () => {
    setLoading(true);
    try {
      const res = await getMasterBeerCom({ id: selectedSupplier });
      // console.log("master beers: ", res);
      setBeerBrandData(res.data);
    } catch (error) {
      console.error("Error fetching beers:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLiquors = async () => {
    setLoading(true);
    try {
      const res = await getLiquorCompany({ id: selectedSupplier });
      setBeerBrandData(res.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setAdded(true);
    e.preventDefault();
    const { name, value } = e.target;
    const [type, size] = name.split("-");


    // Prevent negative values and non-numeric inputs
    if (value !== "" && (isNaN(value) || parseInt(value) < 0)) return;

    setCurrentInput((prevInput) => {
      const existingSizeIndex = prevInput?.sizes.findIndex(
        (s) => s.size === size
      );

      if (existingSizeIndex > -1) {
        const updatedSizes = [...prevInput?.sizes];
        updatedSizes[existingSizeIndex] = {
          ...updatedSizes[existingSizeIndex],
          [type]: value === "" ? 0 : parseInt(value),
        };

        if (type === "quantity") {
          const selectedBrand = beerBrandData.find(
            (brand) => brand?.brandName === currentInput.brand
          );
          const selectedSize = selectedBrand?.sizes.find(
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
            (brand) => brand?.brandName === currentInput.brand
          );
          const selectedSize = selectedBrand?.sizes.find(
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

  const round = (value) => parseFloat(value.toFixed(2));
  // const round = (value) => Math.floor(value * 100) / 100;
  // const round = (value) => value;

  const handleAddProduct = (e) => {
    try {
      e.preventDefault();
      if (!added) {
        toast.warning("Select quantity of at least one size!");
        return;
      }

      let h = round(fholo);
      let p = round(fpratifal);
      let w = round(fwep);
      let q = totalQuantity;
      let t = round(total);
      let exDuty = round(fexduty);
      let dProfit = 70;

      const existingProductIndex = products.findIndex(
        (product) => product.brand === currentInput.brand
      );

      if (existingProductIndex > -1) {
        const existingProduct = products[existingProductIndex];
        const selectedBrand = beerBrandData.find(
          (brand) => brand?.brandName === currentInput.brand
        );

        if (selectedBrand) {
          existingProduct.sizes.forEach((size) => {
            const sizeData = selectedBrand?.sizes.find(
              (s) => s.size === size.size
            );
            if (sizeData) {
              h = h - size.quantity * (sizeData.hologram || 0);
              p = p - size.quantity * (sizeData.pratifal || 0);
              w = w - size.quantity * (sizeData.wep || 0);
              exDuty = exDuty - size.quantity * (sizeData.excise || 0);
              q -= size.quantity;
              t = t - size.price;
            }
          });
        }

        const updatedProducts = [...products];
        updatedProducts[existingProductIndex].sizes = currentInput.sizes;
        setProducts(updatedProducts);
      } else {
        setProducts((prevProducts) => [
          ...prevProducts,
          {
            brand: currentInput.brand,
            sizes: currentInput.sizes,
          },
        ]);
      }

      const selectedBrand = beerBrandData.find(
        (brand) => brand?.brandName === currentInput.brand
      );

      if (selectedBrand) {
        currentInput.sizes.forEach((size) => {
          const sizeData = selectedBrand?.sizes.find(
            (s) => s.size === size.size
          );

          if (sizeData) {
            dProfit = sizeData.profit;
            h = h + size.quantity * (sizeData.hologram || 0);
            p = p + size.quantity * (sizeData.pratifal || 0);
            w = w + size.quantity * (sizeData.wep || 0);
            exDuty = exDuty + size.quantity * (sizeData.excise || 0);
            q += size.quantity;
            t = t + size.price;
          }
        });
      }

      setFholo(h);
      setFpratifal(p);
      setFwep(w);
      setFexduty(exDuty);
      setTotalQuantity(q);
      setTotal(t);

      // Tax calculations
      let vatTax = t * 0.12;
      let cess = (t + vatTax) * 0.02;
      let profit = q * dProfit;

      let taxTotal = t + vatTax + cess + w + h + profit + p + exDuty;
      let taxTotal2 = t + vatTax + cess + w + h;

      let tcsValue = taxTotal * 0.01;
      let tcsValue2 = taxTotal2 * 0.01;

      setGTotal(taxTotal2 + tcsValue2);

      setGrandTotal(taxTotal + tcsValue);
      setTcs(tcsValue);
      setCurrentInput({ brand: "", sizes: [] });

      console.log("total quantity: " + q);
      console.log("total price: " + t);
      console.log("vatTax: " + vatTax);
      console.log("cess: " + cess);
      console.log("final wep is: " + w);
      console.log("final holo is: " + h);
      console.log("Profit: " + profit);
      console.log("final pratifal is: " + p);
      console.log("final excise duty is: " + exDuty);
      console.log("Total tax: " + taxTotal);
      console.log("tcs: " + tcsValue);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product. Please try again.");
    }
  };

  const handleDeleteProduct = (index) => {
    setSpinner2(true);
    try {
      let h = round(fholo);
      let p = round(fpratifal);
      let w = round(fwep);
      let exDuty = round(fexduty);
      let q = totalQuantity;
      let t = round(total);
      let dProfit = 70;

      // Subtract the values of the product being deleted
      const productToDelete = products[index];
      const brandData = beerBrandData.find(
        (item) => item?.brandName === productToDelete.brand
      );

      if (brandData) {
        productToDelete.sizes.forEach((size) => {
          const sizeData = brandData?.sizes?.find((s) => s.size === size.size);
          if (sizeData) {
            dProfit = sizeData.profit;
            h -= size.quantity * (sizeData.hologram || 0);
            p -= size.quantity * (sizeData.pratifal || 0);
            w -= size.quantity * (sizeData.wep || 0);
            exDuty -= size.quantity * (sizeData.excise || 0);
            q -= size.quantity;
            t -= size.price;
          }
        });
      }

      // Update the products list
      const updatedProducts = products.filter((_, i) => i !== index);
      setProducts(updatedProducts);

      // Set the new values
      setFholo(h);
      setFpratifal(p);
      setFwep(w);
      setFexduty(exDuty);
      setTotalQuantity(q);
      setTotal(t);

      // Recalculate all taxes and grand total
      const vatTax = t * 0.12;
      const cess = (t + vatTax) * 0.02;
      const profit = q * dProfit;
      const taxTotal = t + vatTax + cess + w + h + profit + p + exDuty;
      let taxTotal2 = t + vatTax + cess + w + h;

      const tcsValue = taxTotal * 0.01;
      let tcsValue2 = taxTotal2 * 0.01;

      setGrandTotal(round(taxTotal + tcsValue));
      setGTotal(round(taxTotal2 + tcsValue2));

      setTcs(tcsValue);

      console.log("total quantity: " + q);
      console.log("total price: " + t);
      console.log("vatTax: " + vatTax);
      console.log("cess: " + cess);
      console.log("final wep is: " + w);
      console.log("final holo is: " + h);
      console.log("Profit: " + profit);
      console.log("final pratifal is: " + p);
      console.log("final excise duty is: " + exDuty);
      console.log("Total tax: " + taxTotal);
      console.log("tcs: " + tcsValue);
    } catch (e) {
      console.error("Error deleting product:", e);
      toast.error("Error deleting product. Please try again.");
    } finally {
      setSpinner2(false);
    }
  };

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setCurrentInput((prevInput) => ({
      ...prevInput,
      brand: brand,
      sizes: [],
    }));

    // Update stocks and sizes when brand changes
    const selectedBrand = beerBrandData.find(
      (brand) => brand?.brandName === e.target.value
    );
    if (selectedBrand) {
      setStocks(selectedBrand.stock || []);
      setSizes(selectedBrand?.sizes || []);
    }
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

  const [liquorType, setLiquorType] = useState("liquor");
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const [companyData, setCompanyData] = useState([]);
  const { allGlobalCompany } = useContext(CompanyContext);

  const getAllCompanies = async () => {
    setLoading(true);
    try {
      const res = await allGlobalCompany();

      const filteredCompanies = res?.data?.filter(
        (company) => company.companyType === liquorType
      );
      setCompanyData(filteredCompanies);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, [liquorType]);

  useEffect(() => {
    if (liquorType === "liquor") {
      getLiquors();
    } else {
      getBeers();
    }
  }, [selectedSupplier]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box
            noValidate
            autoComplete="off"
            className="py-0 pb-10 px-10 md:py-0 md:px-20"
          >
            <BackButton className="top-4 left-2 md:top-16 md:left-2" />

            <h1 className="text-2xl sm:text-3xl md:text-5xl text-center font-bold text-slate-700 px-2 py-2 m-2 sm:m-4">
              Amount Calculator
            </h1>

            <Box
              className="w-full mt-5"
              component="form"
              onSubmit={handleAddProduct}
            >
              {/* Type and Supplier Dropdowns in one row */}
              <Box className="px-3 py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10">
                <FormControl fullWidth>
                  <InputLabel id="liquor-beer-label">Type</InputLabel>
                  <Select
                    labelId="liquor-beer-label"
                    id="liquor-beer-select"
                    value={liquorType}
                    label="Type"
                    onChange={(e) => setLiquorType(e.target.value)}
                  >
                    <MenuItem value="liquor">Liquor</MenuItem>
                    <MenuItem value="beer">Beer</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="supplier-label">Supplier</InputLabel>
                  <Select
                    labelId="supplier-label"
                    id="supplier-select"
                    value={selectedSupplier}
                    label="Supplier"
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                    required
                  >
                    {companyData?.map((supp, index) => (
                      <MenuItem key={index} value={supp?._id}>
                        {supp?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Brand Select */}
              <Box className="w-full">
                <h1 className="md:text-3xl px-2 py-2 m-4 font-semibold text-2xl">
                  Select Brand
                </h1>
                <Box className="px-3 grid grid-cols-1 sm:grid-cols-3 gap-10">
                  <FormControl fullWidth>
                    <InputLabel id="brand-label">Brand Name</InputLabel>
                    <Select
                      required
                      labelId="brand-label"
                      id="brand-select"
                      value={currentInput?.brand || ""}
                      label="Brand Name"
                      name="brand"
                      onChange={handleBrandChange}
                    >
                      {beerBrandData?.length > 0 &&
                        beerBrandData?.map((brand) => (
                          <MenuItem key={brand._id} value={brand?.brandName}>
                            {brand?.brandName}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {/* Quantities and Prices */}
              {currentInput?.brand && (
                <>
                  <h1 className="md:text-3xl px-2 py-2 m-4 font-semibold text-2xl">
                    Select Quantities
                  </h1>
                  <Box className="px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {beerBrandData
                      .find((brand) => brand?.brandName === currentInput?.brand)
                      ?.sizes?.map((size) => (
                        <Box key={size?.size} className="flex flex-col gap-5">
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
                            onFocus={(e) =>
                              e.target.addEventListener(
                                "wheel",
                                (e) => e.preventDefault(),
                                { passive: false }
                              )
                            }
                            InputProps={{ inputProps: { min: 0 } }}
                          />
                          <TextField
                            fullWidth
                            value={
                              currentInput?.sizes
                                .find((s) => s.size === size?.size)
                                ?.price?.toFixed(2) || "0.00"
                            }
                            label={`Price ${size?.size}`}
                            name={`price-${size?.size}`}
                            variant="outlined"
                            type="number"
                            focused={false}
                            inputProps={{ readOnly: true }}
                          />
                        </Box>
                      ))}
                  </Box>

                  {/* Add Product Button */}
                  <Box className="px-2 py-5 m-4 flex justify-end">
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
                    <TableCell align="center" colSpan={allSizes?.length}>
                      Quantity
                    </TableCell>
                    <TableCell align="center" colSpan={allSizes?.length}>
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
                  {processedProducts?.length > 0 &&
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
                            {p.sizes[size]?.price?.toFixed(2) || "-"}
                          </TableCell>
                        ))}
                        <TableCell align="center" className="w-0">
                          <Button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteProduct(i)}
                            disabled={spinner2}
                          >
                            {spinner2 ? <Spinner /> : <Delete />}
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
          </Box>

          {/* Total Calculation - Removed duplicate */}

          <Box className="px-2 py-2 m-4 flex justify-end">
            <TextField
              id="filled-read-only-input"
              label="Grand Total"
              defaultValue="0"
              value={gTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
          </Box>

          <Box className="px-2 py-2 m-4 flex justify-end">
            <TextField
              id="filled-read-only-input"
              label="Grand Total (with tax)"
              defaultValue="0"
              value={grandTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
          </Box>
        </>
      )}
    </>
  );
};

export default CalculatorPage;
