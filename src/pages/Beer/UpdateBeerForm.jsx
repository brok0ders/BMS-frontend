// import React, { useContext, useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import { Button, TextField } from "@mui/material";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import BeerContext from "../../context/beer/beerContext";
// import CompanyContext from "../../context/company/companyContext";
// import { toast } from "react-toastify";
// import Loader from "../../components/Layout/Loader";
// import Spinner from "../../components/Layout/Spinner";
// import BackButton from "../../components/BackButton";
// const UpdateBeerForm = () => {
//   const [brandName, setBrandName] = useState("");
//   const [companyName, setCompanyName] = useState("");
//   const [stock, setStock] = useState([]);
//   const { getBeer, updateBeer } = useContext(BeerContext);
//   const { getCompany } = useContext(CompanyContext);
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [spinner, setSpinner] = useState(false);

//   const handleQuantityChange = (index, e) => {
//     const { name, value } = e.target;
//     const newStock = [...stock];

//     if (name === "quantity") {
//       newStock[index].quantity = Number(value);
//     } else if (name === "leak") {
//       newStock[index].leak = Number(value);
//     }

//     setStock(newStock);
//   };
//   const handleSubmit = async (e) => {
//     setSpinner(true);
//     e.preventDefault();
//     try {
//       const res = await updateBeer({ id, stock });
//       toast.success("Beer updated succesfully!");
//       setBrandName("");
//       setStock([]);
//       navigate(-1);
//       // Handle success (e.g., reset form, display success message)
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setSpinner(false);
//     }
//   };
//   const getBeerData = async () => {
//     setLoading(true);
//     try {
//       // Data fetching
//       const res = await getBeer({ id });
//       console.log(res);
//       const res1 = await getCompany({ id: res?.beer?.company });
//       setCompanyName(res1?.company?.company?.name);

//       setBrandName(res.beer.beer?.brandName);
//       setStock(res.beer.stock);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getBeerData();
//   }, [id]);

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             className="w-full px-5 md:px-10 lg:px-20 py-10 md:py-16"
//           >
//             <BackButton />
//             <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-900">
//               Edit Beer Details
//             </h1>
//             <Box className="pb-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
//               <Box className="py-10">
//                 <h1 className="text-2xl font-semibold mb-5">Company</h1>
//                 <TextField
//                   required
//                   aria-readonly
//                   value={companyName}
//                   className="w-full "
//                   label="Company Name"
//                   variant="outlined"
//                 />
//               </Box>
//               <Box className="py-10">
//                 <h1 className="text-2xl font-semibold mb-5">Brand</h1>
//                 <TextField
//                   required
//                   onChange={(e) => setBrandName(e.target.value)}
//                   value={brandName}
//                   className="w-full "
//                   label="Brand Name"
//                   variant="outlined"
//                 />
//               </Box>
//             </Box>
//             {stock?.map((s, index) => (
//               <>
//                 <h1 className="text-2xl font-semibold mb-3">{s.size}</h1>
//                 <Box className="pb-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
//                   <TextField
//                     onChange={(e) =>
//                       handleQuantityChange(index, e.target.value)
//                     }
//                     value={s?.quantity}
//                     type="number"
//                     inputProps={{ min: 0 }}
//                     required
//                     label={`Quantity ${s?.size}`}
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
//                     value={s.price}
//                     label={`Price ${s.size}`}
//                     variant="outlined"
//                   />
//                   <TextField
//                     inputProps={{ min: 0 }}
//                     type="number"
//                     label={`Loose ${s.size}`}
//                     name="leak"
//                     variant="outlined"
//                     onChange={(e) => {
//                       handleQuantityChange(index, e);
//                     }}
//                     value={s?.leak}
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
//                 </Box>
//               </>
//             ))}

//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "end",
//               }}
//             >
//               <Link to={-1}>
//                 <Button
//                   sx={{
//                     fontSize: "1rem",
//                     color: "black",
//                     fontWeight: "medium",
//                   }}
//                   type="submit"
//                   variant="text"
//                   className="p-4 !px-6"
//                 >
//                   Cancel
//                 </Button>
//               </Link>
//               {spinner ? (
//                 <Button
//                   sx={{ fontSize: "1rem", minWidth: "6rem", minHeight: "2rem" }}
//                   variant="contained"
//                   className=" p-4 !px-6"
//                 >
//                   {<Spinner />}
//                 </Button>
//               ) : (
//                 <Button
//                   sx={{ fontSize: "1rem", minWidth: "6rem", minHeight: "2rem" }}
//                   type="submit"
//                   variant="contained"
//                   className=" p-4 !px-6"
//                 >
//                   Update
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         </>
//       )}
//     </>
//   );
// };

// export default UpdateBeerForm;

import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import BeerContext from "../../context/beer/beerContext";
import CompanyContext from "../../context/company/companyContext";
import { toast } from "react-toastify";
import Loader from "../../components/Layout/Loader";
import Spinner from "../../components/Layout/Spinner";
import BackButton from "../../components/BackButton";

const UpdateBeerForm = () => {
  const [brandName, setBrandName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [stock, setStock] = useState([]);
  const { getBeer, updateBeer } = useContext(BeerContext);
  const { getCompany } = useContext(CompanyContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const handleQuantityChange = (index, e) => {
    const { name, value } = e.target;
    const newStock = [...stock];

    // Convert the input value to a number and remove any leading zeros
    const numericValue = value === "" ? 0 : Number(value);

    if (name === "quantity") {
      newStock[index].quantity = numericValue;
    } else if (name === "leak") {
      newStock[index].leak = numericValue;
    }

    setStock(newStock);
  };

  const handleSubmit = async (e) => {
    setSpinner(true);
    e.preventDefault();
    try {
      const res = await updateBeer({ id, stock });
      toast.success("Beer updated succesfully!");
      setBrandName("");
      setStock([]);
      navigate(-1);
      // Handle success (e.g., reset form, display success message)
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSpinner(false);
    }
  };

  const getBeerData = async () => {
    setLoading(true);
    try {
      // Data fetching
      const res = await getBeer({ id });
      console.log(res);
      const res1 = await getCompany({ id: res?.beer?.company });
      setCompanyName(res1?.company?.company?.name);

      setBrandName(res.beer.beer?.brandName);
      setStock(res.beer.stock);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const getDisplayValue = (value) => {
    return value === 0 ? "" : value;
  };
  useEffect(() => {
    getBeerData();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box
            component="form"
            onSubmit={handleSubmit}
            className="w-full px-5 md:px-10 lg:px-20 py-10 md:py-16"
          >
            <BackButton />
            <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-900">
              Edit Beer Details
            </h1>
            <Box className="pb-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
              <Box className="py-10">
                <h1 className="text-2xl font-semibold mb-5">Company</h1>
                <TextField
                  required
                  aria-readonly
                  value={companyName}
                  className="w-full "
                  label="Company Name"
                  variant="outlined"
                />
              </Box>
              <Box className="py-10">
                <h1 className="text-2xl font-semibold mb-5">Brand</h1>
                <TextField
                  required
                  onChange={(e) => setBrandName(e.target.value)}
                  value={brandName}
                  className="w-full "
                  label="Brand Name"
                  variant="outlined"
                />
              </Box>
            </Box>
            {stock?.map((s, index) => (
              <React.Fragment key={index}>
                <h1 className="text-2xl font-semibold mb-3">{s.size}</h1>
                <Box className="pb-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                  <TextField
                    onChange={(e) => handleQuantityChange(index, e)}
                    value={getDisplayValue(s?.quantity)}
                    type="number"
                    name="quantity"
                    inputProps={{ min: 0 }}
                    // required
                    label={`Quantity ${s?.size}`}
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
                    value={s.price}
                    label={`Price ${s.size}`}
                    variant="outlined"
                  />
                  <TextField
                    inputProps={{ min: 0 }}
                    type="number"
                    label={`Loose ${s.size}`}
                    name="leak"
                    variant="outlined"
                    onChange={(e) => handleQuantityChange(index, e)}
                    value={getDisplayValue(s?.leak)}
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
              </React.Fragment>
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Link to={-1}>
                <Button
                  sx={{
                    fontSize: "1rem",
                    color: "black",
                    fontWeight: "medium",
                  }}
                  type="submit"
                  variant="text"
                  className="p-4 !px-6"
                >
                  Cancel
                </Button>
              </Link>
              {spinner ? (
                <Button
                  sx={{ fontSize: "1rem", minWidth: "6rem", minHeight: "2rem" }}
                  variant="contained"
                  className="p-4 !px-6"
                >
                  {<Spinner />}
                </Button>
              ) : (
                <Button
                  sx={{ fontSize: "1rem", minWidth: "6rem", minHeight: "2rem" }}
                  type="submit"
                  variant="contained"
                  className="p-4 !px-6"
                >
                  Update
                </Button>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default UpdateBeerForm;
