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
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import ClContext from "../../context/cl/clContext";
import CustomerContext from "../../context/customer/customerContext";
import BillContext from "../../context/bill/billContext";
import UserContext from "../../context/user/userContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Layout/Loader";
import Spinner from "../../components/Layout/Spinner";

const CLBillForm = () => {
  const { company } = useParams();
  const [licensee, setLicensee] = useState("");
  const [clBrandData, setClBrandData] = useState([]);
  const [shop, setShop] = useState("");
  const [firm, setFirm] = useState("");
  const [pan, setPan] = useState("");
  const [excise, setExcise] = useState("");
  const [pno, setPno] = useState("");
  const { getAllCL } = useContext(ClContext);
  const { createCustomer } = useContext(CustomerContext);
  const { createBill } = useContext(BillContext);
  const { user } = useContext(UserContext);
  const { getCustomerByLisencee } = useContext(CustomerContext);

  const [products, setProducts] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [spinner2, setSpinner2] = useState(false);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [currentInput, setCurrentInput] = useState({ brand: "", sizes: [] });
  const [tcs, setTcs] = useState(0);
  const [vatTax, setVatTax] = useState(0);
  const [cess, setCess] = useState(0);
  const [exciseDuty, setExciseDuty] = useState(0);
  const [additionalTax, setAdditionalTax] = useState(0);

  // Number to words converter
  const NumberToWordsConverter = (n) => {
    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
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
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (n === 0) return "Zero";

    function convertLessThanThousand(num) {
      if (num === 0) return "";

      let str = "";
      if (num >= 100) {
        str += units[Math.floor(num / 100)] + " Hundred ";
        num %= 100;
      }

      if (num >= 20) {
        str += tens[Math.floor(num / 10)] + " ";
        num %= 10;
      }

      if (num >= 10) {
        str += teens[num - 10] + " ";
      } else if (num > 0) {
        str += units[num] + " ";
      }

      return str.trim();
    }

    let result = "";
    let crore = Math.floor(n / 10000000);
    let lakhs = Math.floor((n % 10000000) / 100000);
    let thousands = Math.floor((n % 100000) / 1000);
    let hundreds = Math.floor(n % 1000);

    if (crore > 0) {
      result += convertLessThanThousand(crore) + " Crore ";
    }
    if (lakhs > 0) {
      result += convertLessThanThousand(lakhs) + " Lakh ";
    }
    if (thousands > 0) {
      result += convertLessThanThousand(thousands) + " Thousand ";
    }
    if (hundreds > 0) {
      result += convertLessThanThousand(hundreds);
    }

    return result.trim() + " Rupees";
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

  const getCls = async () => {
    setLoading(true);
    try {
      const res = await getAllCL({ id: company });
      setClBrandData(res.cl);
    } catch (e) {
      toast.error("Failed to fetch CL data");
    } finally {
      setLoading(false);
    }
  };

  const calculateTaxes = (products, clBrandData) => {
    // Convert brands array to an object for easier lookup
    const brandsDetails = clBrandData.reduce((acc, brand) => {
      acc[brand.brandName] = brand.stock;
      return acc;
    }, {});

    let totalQuantity = 0;
    let total = 0;

    products.forEach((product) => {
      const brandDetails = brandsDetails[product.brand];

      product.sizes.forEach((size) => {
        const sizeDetail = brandDetails?.find((s) => s.size === size.size);

        if (sizeDetail) {
          const quantity = Number(size.quantity) || 0;
          const totalSizePrice = Number(sizeDetail.totalPrice) * quantity;

          totalQuantity += quantity;
          total += totalSizePrice;
        }
      });
    });

    // Only TCS calculation
    const tcs = (total * 1) / 100;
    const grandTotal = total + tcs;

    return {
      totalQuantity,
      total,
      tcs,
      grandTotal,
    };
  };

  const createBill2 = async () => {
    try {
      setSpinner(true);
      const customerData = await createCustomer({
        email,
        licensee,
        shop,
        firm,
        pan,
      });
      const customerId = customerData.customer._id;

      const res = await createBill({
        excise,
        pno,
        products,
        customer: customerId,
        seller: user?._id,
        company,
        tcs,
        total: grandTotal,
        billType: "cl",
      });

      // Reset form
      resetForm();

      navigate(`/dashboard/cl/bill/details/${res.bill}`);
    } catch (e) {
      toast.error("Failed to create bill");
    } finally {
      setSpinner(false);
    }
  };

  const resetForm = () => {
    setLicensee("");
    setShop("");
    setFirm("");
    setPan("");
    setExcise("");
    setPno("");
    setProducts([]);
    setGrandTotal(0);
    setTotal(0);
    setTotalQuantity(0);
    setCurrentInput({ brand: "", sizes: [] });
    getCls();
  };

  useEffect(() => {
    getCls();
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    setAdded(true);
    const { name, value } = e.target;
    const [type, size] = name.split("-");

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
          const selectedBrand = clBrandData.find(
            (brand) => brand.brandName === currentInput.brand
          );
          const selectedSize = selectedBrand.stock.find((s) => s.size === size);

          if (selectedSize) {
            const basePrice =
              selectedSize.totalPrice * (value === "" ? 0 : parseInt(value));
            updatedSizes[existingSizeIndex].price = basePrice;
          }
        }

        return { ...prevInput, sizes: updatedSizes };
      } else {
        const selectedBrand = clBrandData.find(
          (brand) => brand.brandName === currentInput.brand
        );
        const selectedSize = selectedBrand.stock.find((s) => s.size === size);

        const newSize = {
          size: size,
          [type]: value === "" ? 0 : parseInt(value),
        };

        if (type === "quantity" && selectedSize) {
          const basePrice =
            selectedSize.totalPrice * (value === "" ? 0 : parseInt(value));
          newSize.price = basePrice;
        }

        return { ...prevInput, sizes: [...prevInput.sizes, newSize] };
      }
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!added) {
      toast.warning("Select quantity of at least one size!");
      return;
    }

    const existingProductIndex = products.findIndex(
      (product) => product.brand === currentInput.brand
    );

    const updatedProducts = [...products];

    if (existingProductIndex > -1) {
      // Update existing product
      updatedProducts[existingProductIndex].sizes = currentInput.sizes;
    } else {
      // Add new product
      updatedProducts.push({
        brand: currentInput.brand,
        sizes: currentInput.sizes,
      });
    }

    setProducts(updatedProducts);

    // Calculate taxes using the new method
    const taxCalculation = calculateTaxes(updatedProducts, clBrandData);

    // Update state with calculation results
    setTotalQuantity(taxCalculation.totalQuantity);
    setTotal(taxCalculation.total);
    setTcs(taxCalculation.tcs);
    setGrandTotal(taxCalculation.grandTotal);

    // Reset input
    setCurrentInput({ brand: "", sizes: [] });
    setAdded(false);
  };

  // const handleLisencee = async (e) => {
  //   setLicensee(e.target.value);
  //   try {
  //     const res = await getCustomerByLisencee({ licensee: e.target.value });
  //     if (res.success) {
  //       setShop(res?.customer[0].shop);
  //       setFirm(res?.customer[0].firm);
  //       setPan(res?.customer[0].pan);
  //       setEmail(res?.customer[0].email);
  //     } else {
  //       setShop("");
  //       setFirm("");
  //       setPan("");
  //       setEmail("");
  //     }
  //   } catch (e) {
  //     setShop("");
  //     setFirm("");
  //     setPan("");
  //   }
  // };

  // const getCls = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await getAllCL({ id: company });
  //     setClBrandData(res.cl);
  //   } catch (e) {
  //     toast.error("Failed to fetch CL data");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const calculateTaxes = (products, clBrandData) => {
  //   // Convert brands array to an object for easier lookup
  //   const brandsDetails = clBrandData.reduce((acc, brand) => {
  //     acc[brand.brandName] = brand.stock;
  //     return acc;
  //   }, {});

  //   let totalQuantity = 0;
  //   let total = 0;
  //   let totalPratifal = 0;
  //   let totalWep = 0;
  //   let totalProfit = 0;
  //   let totalHologram = 0;

  //   products.forEach((product) => {
  //     const brandDetails = brandsDetails[product.brand];

  //     product.sizes.forEach((size) => {
  //       const sizeDetail = brandDetails?.find((s) => s.size === size.size);

  //       if (sizeDetail) {
  //         const quantity = Number(size.quantity) || 0;
  //         const totalSizePrice = Number(size.price) || 0;

  //         const pratifal = Number(sizeDetail.pratifal || 0) * quantity;
  //         const wep = Number(sizeDetail.wep || 0) * quantity;
  //         const profit = Number(sizeDetail.profit || 0) * quantity;
  //         // const hologram = 0.25 * quantity;

  //         totalQuantity += quantity;
  //         total += totalSizePrice;
  //         totalPratifal += pratifal;
  //         totalWep += wep;
  //         totalProfit += profit;
  //         // totalHologram += hologram;
  //       }
  //     });
  //   });

  //   const vatTax = total * (12 / 100);
  //   const cess = ((total + vatTax) * 2) / 100;

  //   const taxTotal =
  //     total +
  //     vatTax +
  //     cess +
  //     totalWep +
  //     // totalHologram +
  //     totalProfit +
  //     totalPratifal;

  //   const tcs = (taxTotal * 1) / 100;
  //   const grandTotal = taxTotal + tcs;

  //   return {
  //     totalQuantity,
  //     total,
  //     fpratifal: totalPratifal,
  //     fwep: totalWep,
  //     profit: totalProfit,
  //     // fholo: totalHologram,

  //     vatTax,
  //     cess,
  //     taxTotal,
  //     tcs,
  //     grandTotal,
  //   };
  // };

  // const createBill2 = async () => {
  //   try {
  //     setSpinner(true);
  //     const customerData = await createCustomer({
  //       email,
  //       licensee,
  //       shop,
  //       firm,
  //       pan,
  //     });
  //     const customerId = customerData.customer._id;

  //     const res = await createBill({
  //       excise,
  //       pno,
  //       products,
  //       customer: customerId,
  //       seller: user?._id,
  //       company,
  //       tcs,
  //       exciseDuty,
  //       additionalTax,
  //       total: grandTotal,
  //       billType: "cl",
  //     });

  //     // Reset form
  //     resetForm();

  //     navigate(`/dashboard/cl/bill/details/${res.bill}`);
  //   } catch (e) {
  //     toast.error("Failed to create bill");
  //   } finally {
  //     setSpinner(false);
  //   }
  // };

  // const resetForm = () => {
  //   setLicensee("");
  //   setShop("");
  //   setFirm("");
  //   setPan("");
  //   setExcise("");
  //   setPno("");
  //   setProducts([]);
  //   setGrandTotal(0);
  //   setTotal(0);
  //   setTotalQuantity(0);
  //   setCurrentInput({ brand: "", sizes: [] });
  //   getCls();
  // };

  // useEffect(() => {
  //   getCls();
  // }, []);

  // const handleInputChange = (e) => {
  //   e.preventDefault();
  //   setAdded(true);
  //   const { name, value } = e.target;
  //   const [type, size] = name.split("-");

  //   // Prevent negative values and non-numeric inputs
  //   if (value !== "" && (isNaN(value) || parseInt(value) < 0)) return;

  //   setCurrentInput((prevInput) => {
  //     const existingSizeIndex = prevInput.sizes.findIndex(
  //       (s) => s.size === size
  //     );

  //     if (existingSizeIndex > -1) {
  //       const updatedSizes = [...prevInput.sizes];
  //       updatedSizes[existingSizeIndex] = {
  //         ...updatedSizes[existingSizeIndex],
  //         [type]: value === "" ? 0 : parseInt(value),
  //       };

  //       if (type === "quantity") {
  //         const selectedBrand = clBrandData.find(
  //           (brand) => brand.brandName === currentInput.brand
  //         );
  //         const selectedSize = selectedBrand.stock.find((s) => s.size === size);

  //         if (selectedSize) {
  //           const basePrice =
  //             selectedSize.price * (value === "" ? 0 : parseInt(value));
  //           updatedSizes[existingSizeIndex].price = basePrice;
  //           updatedSizes[existingSizeIndex].pratifal = selectedSize.pratifal;
  //           updatedSizes[existingSizeIndex].wep = selectedSize.wep;
  //         }
  //       }

  //       return { ...prevInput, sizes: updatedSizes };
  //     } else {
  //       const selectedBrand = clBrandData.find(
  //         (brand) => brand.brandName === currentInput.brand
  //       );
  //       const selectedSize = selectedBrand.stock.find((s) => s.size === size);

  //       const newSize = {
  //         size: size,
  //         [type]: value === "" ? 0 : parseInt(value),
  //       };

  //       if (type === "quantity" && selectedSize) {
  //         const basePrice =
  //           selectedSize.price * (value === "" ? 0 : parseInt(value));
  //         newSize.price = basePrice;
  //         newSize.pratifal = selectedSize.pratifal;
  //         newSize.wep = selectedSize.wep;
  //       }

  //       return { ...prevInput, sizes: [...prevInput.sizes, newSize] };
  //     }
  //   });
  // };

  // const handleAddProduct = (e) => {
  //   e.preventDefault();
  //   if (!added) {
  //     toast.warning("Select quantity of at least one size!");
  //     return;
  //   }

  //   const existingProductIndex = products.findIndex(
  //     (product) => product.brand === currentInput.brand
  //   );

  //   const updatedProducts = [...products];

  //   if (existingProductIndex > -1) {
  //     // Update existing product
  //     updatedProducts[existingProductIndex].sizes = currentInput.sizes;
  //   } else {
  //     // Add new product
  //     updatedProducts.push({
  //       brand: currentInput.brand,
  //       sizes: currentInput.sizes,
  //     });
  //   }

  //   setProducts(updatedProducts);

  //   // Calculate taxes using the new method
  //   const taxCalculation = calculateTaxes(updatedProducts, clBrandData);

  //   // Update state with calculation results
  //   setTotalQuantity(taxCalculation.totalQuantity);
  //   setTotal(taxCalculation.total);
  //   setVatTax(taxCalculation.vatTax);
  //   setCess(taxCalculation.cess);
  //   setExciseDuty(taxCalculation.fwep); // Using WEP as excise duty
  //   setAdditionalTax(taxCalculation.fpratifal); // Using Pratifal as additional tax
  //   setTcs(taxCalculation.tcs);
  //   setGrandTotal(taxCalculation.grandTotal);

  //   // Reset input
  //   setCurrentInput({ brand: "", sizes: [] });
  //   setAdded(false);
  // };

  const handleDeleteProduct = (index) => {
    setSpinner2(true);
    try {
      const updatedProducts = products.filter((_, i) => i !== index);
      setProducts(updatedProducts);

      // Recalculate taxes after deletion
      const taxCalculation = calculateTaxes(updatedProducts, clBrandData);

      // Update state with calculation results
      setTotalQuantity(taxCalculation.totalQuantity);
      setTotal(taxCalculation.total);
      setVatTax(taxCalculation.vatTax);
      setCess(taxCalculation.cess);
      setExciseDuty(taxCalculation.fwep);
      setAdditionalTax(taxCalculation.fpratifal);
      setTcs(taxCalculation.tcs);
      setGrandTotal(taxCalculation.grandTotal);

      setCurrentInput({ brand: "", sizes: [] });
    } catch (e) {
      console.error(e);
    } finally {
      setSpinner2(false);
    }
  };

  const handleBillSubmit = (e) => {
    e.preventDefault();
    createBill2();
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
      {loading ? (
        <Loader />
      ) : !clBrandData || clBrandData.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[75vh]">
          <div className="w-[25vw] text-center">
            <img
              src="/images/no-data.png"
              alt="No Data"
              className="w-[25vw] m-auto"
            />
            <p>NO LIQUOR FOUND!</p>
          </div>
        </div>
      ) : (
        <Box
          noValidate
          autoComplete="off"
          className="py-10 px-10 md:py-5 md:px-20"
        >
          <h1 className="md:text-5xl text-center font-bold text-slate-700 px-2 py-2 m-4 text-4xl">
            CL Bill Details
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

          {/* For selecting quantities */}
          <Box
            className="w-full mt-10"
            component="form"
            onSubmit={handleAddProduct}
          >
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
                    {clBrandData.length > 0 &&
                      clBrandData?.map((brand) => (
                        <MenuItem key={brand._id} value={brand?.brandName}>
                          {brand?.brandName}
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
                    clBrandData
                      .find((brand) => brand?.brandName === currentInput?.brand)
                      ?.stock?.map((size) => (
                        <Box key={size?.size} className="flex flex-col gap-5">
                          <TextField
                            fullWidth
                            value={
                              currentInput?.sizes.find(
                                (s) => s.size === size?.size
                              )?.quantity || ""
                            }
                            label={`Quantity ${
                              size?.size === "750ml"
                                ? size?.size + " (Q)"
                                : size?.size === "375ml"
                                ? size?.size + " (P)"
                                : size?.size === "180ml"
                                ? size?.size + " (N)"
                                : size?.size === "200ml tetra"
                                ? size?.size + " (T)"
                                : size?.size
                            }`}
                            name={`quantity-${size?.size}`}
                            onChange={handleInputChange}
                            variant="outlined"
                            onFocus={(e) =>
                              e.target.addEventListener(
                                "wheel",
                                function (e) {
                                  e.preventDefault();
                                },
                                { passive: false }
                              )
                            }
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
                            label={`Price ${
                              size?.size === "750ml"
                                ? size?.size + " (Q)"
                                : size?.size === "375ml"
                                ? size?.size + " (P)"
                                : size?.size === "180ml"
                                ? size?.size + " (N)"
                                : size?.size === "200ml tetra"
                                ? size?.size + " (T)"
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
                        : size === "200ml tetra"
                        ? size + " (T)"
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
                        : size === "200ml tetra"
                        ? size + " (T)"
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
          <Box className="px-2 py-2 m-4 flex justify-end overflow-x-auto">
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
      )}
    </>
  );
};

export default CLBillForm;
