// import React, { useContext, useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import {
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";
// import CompanyContext from "../../context/company/companyContext";
// import { useParams } from "react-router-dom";
// import BeerContext from "../../context/beer/beerContext";
// import { toast } from "react-toastify";
// import Loader from "../../components/Layout/Loader";
// import Spinner from "../../components/Layout/Spinner";
// import BackButton from "../../components/BackButton";

// const BeerForm = () => {
//   const [brandName, setBrandName] = useState("");
//   const [companyName, setCompanyName] = useState("");
//   const [stock, setStock] = useState([]);
//   const [temp, setTemp] = useState([]);
//   const { getCompany } = useContext(CompanyContext);
//   const { allGlobalBeer, createBeer } = useContext(BeerContext);
//   const { company } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [spinner, setSpinner] = useState(false);
//   const [filled, setFilled] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!filled) {
//       toast.warning("Choose quantity of atleasst one size!");
//       return;
//     }
//     try {
//       setSpinner(true);
//       const res = await createBeer({
//         beerId: brandName._id,
//         stock,
//         company,
//       });
//       if (res.success) {
//         toast.success(res.message);
//       }
//       setBrandName("");
//       setStock([]);
//     } catch (error) {
//     } finally {
//       setSpinner(false);
//     }
//   };

//   const handleStockChange = (e, size, price) => {
//     const { name, value } = e.target;
//     setStock((prevStock) => {
//       const stockIndex = prevStock.findIndex((item) => item.size === size);
//       if (stockIndex > -1) {
//         const updatedStock = [...prevStock];
//         updatedStock[stockIndex] = {
//           ...updatedStock[stockIndex],
//           [name]: name === "quantity" || name === "leak" ? Number(value) : value,
//         };
//         return updatedStock;
//       } else {
//         return [
//           ...prevStock,
//           {
//             size,
//             price,
//             [name]: name === "quantity" || name === "leak" ? Number(value) : value,
//           },
//         ];
//       }
//     });
//   };

//   const getBeerByComp = async () => {
//     setLoading(true);
//     try {
//       const res1 = await getCompany({ id: company });
//       setCompanyName(res1.company.company.name);
//       const res = await allGlobalBeer();
//       const filtered = await res.filter(
//         (beer) => beer.company === res1.company.company._id
//       );
//       setTemp(filtered);
//     } catch (e) {
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getBeerByComp();
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             className={`px-5 md:px-10 lg:px-20 py-10 md:py-5 ${
//               loading ? "blur-background" : ""
//             }`}
//           >
//             <BackButton />
//             <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-900">
//               Create Beer Brand
//             </h1>
//             <Box className="pb-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
//               <Box className="py-10">
//                 <h1 className="text-2xl font-semibold mb-5">Company</h1>
//                 <div className="flex gap-3 w-[90vw]">
//                   <TextField
//                     required
//                     aria-readonly
//                     label="Company Name"
//                     value={companyName}
//                     className="w-full"
//                     variant="outlined"
//                   />
//                   <FormControl fullWidth>
//                     <InputLabel id="brand-label">Brand Name</InputLabel>
//                     <Select
//                       required
//                       labelId="brand-label"
//                       id="brand-select"
//                       value={brandName}
//                       label="Brand Name"
//                       name="brand"
//                       className="w-[94%]"
//                       onChange={(e) => {
//                         setBrandName(e.target.value);
//                       }}
//                     >
//                       {temp?.map((b) => (
//                         <MenuItem key={b._id} value={b}>
//                           {b.brandName}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </div>
//               </Box>
//             </Box>
//             {brandName?.sizes?.map((b, index) => (
//               <div key={index}>
//                 <h1 className="text-2xl font-semibold mb-3">{b.size}</h1>
//                 <Box className="pb-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
//                   <TextField
//                     onChange={(e) => handleStockChange(e, b.size, b.price)}
//                     value={
//                       stock.find((item) => item.size === b.size)?.quantity || ""
//                     }
//                     name="quantity"
//                     type="number"
//                     inputProps={{ min: 0 }}
//                     onClick={() => {
//                       setFilled(true);
//                     }}
//                     label={`Stock ${b.size}`}
//                     variant="outlined"
//                     onFocus={(e) =>
//                       e.target.addEventListener(
//                         "wheel",
//                         function (e) {
//                           e.preventDefault();
//                         },
//                         { passive: false }
//                       )
//                     }
//                   />
//                   <TextField
//                     value={b?.price}
//                     inputProps={{ min: 0 }}
//                     aria-readonly
//                     label={`Price ${b.size}`}
//                     variant="outlined"
//                   />

// <TextField
//                   inputProps={{ min: 0 }}
//                   type="number"
//                   label={`Loose ${b.size}`}
//                   name="leak"
//                   variant="outlined"
//                   onChange={(e) => {
//                     handleStockChange(e, b.size, b.price);
//                   }}
//                   value={stock.find((item) => item.size === b.size)?.leak || ""}
//                   onFocus={(e) =>
//                     e.target.addEventListener(
//                       "wheel",
//                       function (e) {
//                         e.preventDefault();
//                       },
//                       { passive: false }
//                     )
//                   }
//                 />
//                 </Box>
//               </div>
//             ))}
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "end",
//               }}
//             >
//               {spinner ? (
//                 <Button
//                   variant="contained"
//                   className="p-4 !px-6"
//                   sx={{ minWidth: "6rem", minHeight: "2rem", fontSize: "1rem" }}
//                 >
//                   <Spinner />
//                 </Button>
//               ) : (
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   className="p-4 !px-6"
//                   sx={{ minWidth: "6rem", minHeight: "2rem", fontSize: "1rem" }}
//                 >
//                   Create
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         </>
//       )}
//     </>
//   );
// };

// export default BeerForm;

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
import Loader from "../../components/Layout/Loader";
import Spinner from "../../components/Layout/Spinner";
import BackButton from "../../components/BackButton";

const BeerForm = () => {
  const [brandName, setBrandName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [stock, setStock] = useState([]);
  const [temp, setTemp] = useState([]);
  const { getCompany } = useContext(CompanyContext);
  const { allGlobalBeer, createBeer } = useContext(BeerContext);
  const { company } = useParams();
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [filled, setFilled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!filled) {
      toast.warning("Choose quantity of atleast one size!");
      return;
    }
    try {
      setSpinner(true);

      // Ensure all sizes from brandName have entries in stock with default values
      const completeStock =
        brandName?.sizes?.map((size) => {
          // Find existing entry in stock for this size
          const existingEntry = stock.find((item) => item.size === size.size);

          // If entry exists, use it; otherwise create new entry with defaults
          if (existingEntry) {
            return {
              ...existingEntry,
              quantity: existingEntry.quantity || 0,
              leak: existingEntry.leak || 0,
            };
          } else {
            return {
              size: size.size,
              price: size.price,
              quantity: 0,
              leak: 0,
            };
          }
        }) || [];

      const res = await createBeer({
        beerId: brandName._id,
        stock: completeStock,
        company,
      });

      if (res.success) {
        toast.success(res.message);
      }

      setBrandName("");
      setStock([]);
    } catch (error) {
      console.error("Error creating beer:", error);
    } finally {
      setSpinner(false);
    }
  };

  const handleStockChange = (e, size, price) => {
    const { name, value } = e.target;

    // Convert to number and remove leading zeros
    const numericValue =
      name === "quantity" || name === "leak" ? Number(value) : value;

    setStock((prevStock) => {
      const stockIndex = prevStock.findIndex((item) => item.size === size);
      if (stockIndex > -1) {
        const updatedStock = [...prevStock];
        updatedStock[stockIndex] = {
          ...updatedStock[stockIndex],
          [name]: numericValue,
        };
        return updatedStock;
      } else {
        return [
          ...prevStock,
          {
            size,
            price,
            [name]: numericValue,
          },
        ];
      }
    });
  };

  const getBeerByComp = async () => {
    setLoading(true);
    try {
      const res1 = await getCompany({ id: company });
      setCompanyName(res1.company.company.name);
      const res = await allGlobalBeer();
      const filtered = await res.filter(
        (beer) => beer.company === res1.company.company._id
      );
      setTemp(filtered);
    } catch (e) {
      console.error("Error fetching beer data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBeerByComp();
  }, []);

  // When brandName changes, initialize stock entries for all sizes
  useEffect(() => {
    if (brandName?.sizes?.length) {
      // Initialize stock with all sizes from brandName
      const initializedStock = brandName.sizes.map((size) => {
        // Check if this size already exists in stock
        const existingEntry = stock.find((item) => item.size === size.size);

        // If it exists, keep it; otherwise create default entry
        if (existingEntry) {
          return existingEntry;
        } else {
          return {
            size: size.size,
            price: size.price,
            quantity: 0,
            leak: 0,
          };
        }
      });

      setStock(initializedStock);
    }
  }, [brandName]);

  // Helper function to get field value or empty string (not "0")
  const getFieldValue = (size, field) => {
    const item = stock.find((item) => item.size === size);
    if (!item || item[field] === undefined || item[field] === 0) {
      return "";
    }
    return item[field];
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box
            component="form"
            onSubmit={handleSubmit}
            className={`px-5 md:px-10 lg:px-20 py-10 md:py-5 ${
              loading ? "blur-background" : ""
            }`}
          >
            <BackButton />
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
                    className="w-full"
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
                      className="w-[94%]"
                      onChange={(e) => {
                        setBrandName(e.target.value);
                        setFilled(true); // Set filled to true when brand is selected
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
                    value={getFieldValue(b.size, "quantity")}
                    name="quantity"
                    type="number"
                    inputProps={{ min: 0 }}
                    onClick={() => {
                      setFilled(true);
                    }}
                    label={`Stock ${b.size}`}
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
                  />
                  <TextField
                    value={b?.price}
                    inputProps={{ min: 0 }}
                    aria-readonly
                    label={`Price ${b.size}`}
                    variant="outlined"
                  />

                  <TextField
                    inputProps={{ min: 0 }}
                    type="number"
                    label={`Loose ${b.size}`}
                    name="leak"
                    variant="outlined"
                    onChange={(e) => {
                      handleStockChange(e, b.size, b.price);
                    }}
                    value={getFieldValue(b.size, "leak")}
                    onFocus={(e) =>
                      e.target.addEventListener(
                        "wheel",
                        function (e) {
                          e.preventDefault();
                        },
                        { passive: false }
                      )
                    }
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
              {spinner ? (
                <Button
                  variant="contained"
                  className="p-4 !px-6"
                  sx={{ minWidth: "6rem", minHeight: "2rem", fontSize: "1rem" }}
                >
                  <Spinner />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  className="p-4 !px-6"
                  sx={{ minWidth: "6rem", minHeight: "2rem", fontSize: "1rem" }}
                >
                  Create
                </Button>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default BeerForm;
