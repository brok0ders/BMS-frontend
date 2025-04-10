import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import LiquorContext from "../../context/liquor/liquorContext";
import CompanyContext from "../../context/company/companyContext";
import { toast } from "react-toastify";
import Loader from "../../components/Layout/Loader";
import Spinner from "../../components/Layout/Spinner";
import BackButton from "../../components/BackButton";

const UpdateLiquorForm = () => {
  const [brandName, setBrandName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [stock, setStock] = useState([]);
  const { id } = useParams();
  const { getLiquor, updateLiquor } = useContext(LiquorContext);
  const { getCompany } = useContext(CompanyContext);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (index, e) => {
    const { name, value } = e.target;
    const newStock = [...stock];

    // Convert to number and handle empty string as 0
    const numericValue = value === "" ? 0 : Number(value);

    if (name === "quantity") {
      newStock[index].quantity = numericValue;
    } else if (name === "leak") {
      newStock[index].leak = numericValue;
    }

    setStock(newStock);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);

      // Make sure all stock entries have at least 0 for quantity and leak
      const processedStock = stock.map((item) => ({
        ...item,
        quantity: item.quantity !== undefined ? item.quantity : 0,
        leak: item.leak !== undefined ? item.leak : 0,
      }));

      const res = await updateLiquor({ id, stock: processedStock });
      toast.success("Liquor updated successfully!");
      setBrandName("");
      setStock([]);
      navigate(-1);
      setSpinner(false);
    } catch (error) {
      console.error("Error:", error);
      setSpinner(false);
    }
  };

  // Get the liquor data
  const getLiquorData = async () => {
    try {
      setLoading(true);
      // Data fetching
      const res = await getLiquor({ id });
      const res1 = await getCompany({ id: res?.liquor?.company?._id });
      setCompanyName(res1?.company?.company?.name);

      setBrandName(res.liquor?.liquor?.brandName);

      // Process stock data to ensure quantity and leak are properly initialized
      const processedStock = res.liquor.stock.map((item) => ({
        ...item,
        quantity: item.quantity !== undefined ? item.quantity : 0,
        leak: item.leak !== undefined ? item.leak : 0,
      }));

      setStock(processedStock);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching liquor data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLiquorData();
  }, [id]);

  // Helper function to get display value (empty string or actual value)
  const getDisplayValue = (value) => {
    return value === 0 ? "" : value;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="w-full px-5 md:px-10 lg:px-20 py-10 md:py-16"
        >
          <BackButton />
          <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-900">
            Edit Liquor Details
          </h1>
          <Box className="pb-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
            <Box className="py-10">
              <h1 className="text-2xl font-semibold mb-5">Company</h1>
              <TextField
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
                  inputProps={{ min: 0 }}
                  name="quantity"
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
                  label={`Price ${s?.size}`}
                  variant="outlined"
                />
                <TextField
                  inputProps={{ min: 0 }}
                  type="number"
                  label={`Loose ${s.size}`}
                  name="leak"
                  variant="outlined"
                  onChange={(e) => {
                    handleQuantityChange(index, e);
                  }}
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
                sx={{ fontSize: "1rem" }}
                variant="contained"
                className=" p-4 px-6"
              >
                <Spinner />
              </Button>
            ) : (
              <Button
                sx={{ fontSize: "1rem", minWidth: "6rem", minHeight: "2rem" }}
                type="submit"
                variant="contained"
                className=" p-4 px-6"
              >
                Update
              </Button>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default UpdateLiquorForm;
