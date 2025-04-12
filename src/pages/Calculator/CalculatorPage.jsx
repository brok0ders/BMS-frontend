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

const CalculatorPage = () => {
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
  const [fexduty, setFexduty] = useState(0);
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
    } catch (error) {
      console.error("Error fetching beers:", error);
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
        words += ` ${one[parseInt(digit) - 1] || "Zero"}`;
      }
    }
    if (!words) {
      return "Zero";
    }
    return words + " Only";
  };

  const createBill2 = async () => {
    try {
      setSpinner(true);
      const customerData = await createCustomer({
        licensee,
        shop,
        firm,
        pan,
        email,
      });
      customerId = customerData.customer._id;
      const res = await createBill({
        excise,
        pno,
        products,
        customer: customerId,
        seller: user?._id,
        company,
        pratifal: fpratifal,
        fexcise: fexduty,
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
      console.error("Error creating bill:", e);
      toast.error("Failed to create bill. Please try again.");
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
      console.error("Error fetching company:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleLisencee = async (e) => {
    setLicensee(e.target.value);
    try {
      const res = await getCustomerByLisencee({ licensee: e.target.value });
      if (res?.success) {
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
      console.error("Error fetching licensee data:", e);
      setShop("");
      setFirm("");
      setPan("");
      setEmail("");
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

      console.log("initial price: ", t);

      const existingProductIndex = products.findIndex(
        (product) => product.brand === currentInput.brand
      );

      if (existingProductIndex > -1) {
        const existingProduct = products[existingProductIndex];
        const selectedBrand = beerBrandData.find(
          (brand) => brand.beer.brandName === currentInput.brand
        );

        if (selectedBrand) {
          existingProduct.sizes.forEach((size) => {
            const sizeData = selectedBrand.beer.sizes.find(
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
        (brand) => brand.beer.brandName === currentInput.brand
      );

      if (selectedBrand) {
        currentInput.sizes.forEach((size) => {
          const sizeData = selectedBrand.beer.sizes.find(
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
      let tcsValue = taxTotal * 0.01;
      let gTotal = round(taxTotal + tcsValue);

      setGrandTotal(gTotal);
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
        (item) => item.beer.brandName === productToDelete.brand
      );

      if (brandData) {
        productToDelete.sizes.forEach((size) => {
          const sizeData = brandData?.beer?.sizes?.find(
            (s) => s.size === size.size
          );
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
      const tcsValue = taxTotal * 0.01;
      setGrandTotal(round(taxTotal + tcsValue));
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
      (brand) => brand.beer.brandName === e.target.value
    );
    if (selectedBrand) {
      setStocks(selectedBrand.stock || []);
      setSizes(selectedBrand.beer.sizes || []);
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

  const [liquorType, setLiquorType] = useState("Liquor");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const handleSupplierChange = () => {}

  // Example data (replace with API calls or real state data)
  const suppliers = [
    { _id: "1", name: "Supplier A" },
    { _id: "2", name: "Supplier B" },
  ];

  const brands = [
    { _id: "1", name: "Kingfisher", supplier: "Supplier A" },
    { _id: "2", name: "Budweiser", supplier: "Supplier A" },
    { _id: "3", name: "Jack Daniels", supplier: "Supplier B" },
  ];

  const filteredBrands = brands.filter(
    (brand) => brand.supplier === selectedSupplier
  );

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
            <BackButton className={"top-16 left-2"} />
            <h1 className="md:text-5xl text-center font-bold text-slate-700 px-2 py-2 m-4 text-3xl">
              Amount Calculator
            </h1>

            <Box component="form" onSubmit={handleAddProduct}>
              {/* Dropdown: Liquor or Beer */}
              <Box className="px-3 grid grid-cols-1 sm:grid-cols-3 gap-10">
                <FormControl fullWidth>
                  <InputLabel id="liquor-beer-label">Type</InputLabel>
                  <Select
                    labelId="liquor-beer-label"
                    id="liquor-beer-select"
                    value={liquorType}
                    label="Type"
                    onChange={(e) => setLiquorType(e.target.value)}
                  >
                    <MenuItem value="Liquor">Liquor</MenuItem>
                    <MenuItem value="Beer">Beer</MenuItem>
                  </Select>
                </FormControl>

                {/* Supplier Dropdown */}
                <FormControl fullWidth>
                  <InputLabel id="supplier-label">Supplier</InputLabel>
                  <Select
                    labelId="supplier-label"
                    id="supplier-select"
                    value={selectedSupplier}
                    onChange={handleSupplierChange}
                  >
                    {suppliers.map((supplier) => (
                      <MenuItem key={supplier._id} value={supplier.name}>
                        {supplier.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Brand Dropdown */}
                <FormControl fullWidth>
                  <InputLabel id="brand-label">Brand</InputLabel>
                  <Select
                    labelId="brand-label"
                    id="brand-select"
                    value={selectedBrand}
                    onChange={handleBrandChange}
                  >
                    {filteredBrands.map((brand) => (
                      <MenuItem key={brand._id} value={brand.name}>
                        {brand.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Add Button */}
              <Box className="px-2 py-2 m-4 flex justify-end">
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </Box>
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
                label="Grand Total"
                defaultValue="0"
                value={grandTotal.toFixed(2)}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
            </Box>

        

            
          </Box>
        </>
      )}
    </>
  );
};

export default CalculatorPage;
