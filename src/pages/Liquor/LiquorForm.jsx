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
import LiquorContext from "../../context/liquor/liquorContext";
import { useParams } from "react-router-dom";
import CompanyContext from "../../context/company/companyContext";
import { toast } from "react-toastify";
import Loader from "../../components/Layout/Loader";
import Spinner from "../../components/Layout/Spinner";
import BackButton from "../../components/BackButton";

const LiquorForm = () => {
  const [temp, setTemp] = useState([]);
  const [brandName, setBrandName] = useState({});
  const [stock, setStock] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const { brands, getLiquorCom, allGlobalLiquor, createLiquor } =
    useContext(LiquorContext);
  const { getCompany } = useContext(CompanyContext);
  const { company } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      const res = await createLiquor({
        liquorId: brandName._id,
        stock,
        company,
      });
      if (res.success) {
        toast.success(res.message);
      }
      setBrandName("");
      setStock([]);
      setSpinner(false);
    } catch (error) {
      console.error("Error:", error);
      setSpinner(false);
    }
  };
  const handleStockChange = (e, size, price) => {
    setLoading(true);
    const { name, value } = e.target;
    setStock((prevStock) => {
      const stockIndex = prevStock.findIndex((item) => item.size === size);
      if (stockIndex > -1) {
        const updatedStock = [...prevStock];
        updatedStock[stockIndex] = {
          ...updatedStock[stockIndex],
          [name]: name === "quantity" ? Number(value) : value,
        };
        return updatedStock;
      } else {
        return [
          ...prevStock,
          {
            size,
            price,
            [name]: name === "quantity" ? Number(value) : value,
          },
        ];
      }
    });
    setLoading(false);
  };

  const getLiquorByComp = async () => {
    setLoading(true);
    try {
      const res1 = await getCompany({ id: company });
      setCompanyName(res1.company.company.name);
      const res = await allGlobalLiquor();
      const filtered = await res.filter(
        (liq) => liq.company === res1.company.company._id
      );
      setTemp(filtered);
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => {
    getLiquorByComp();
  }, [company]);
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
            Create Liquor Brand
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
                  className="w-full "
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
                    className="w-full"
                    onChange={(e) => {
                      setBrandName(e.target.value);
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
                  value={
                    stock.find((item) => item.size === b.size)?.quantity || ""
                  }
                  name="quantity"
                  type="number"
                  inputProps={{ min: 0 }}
                  required
                  label={`Stock ${b.size}`}
                  variant="outlined"
                />
                <TextField
                  value={b?.price}
                  inputProps={{ min: 0 }}
                  aria-readonly
                  label={`Price ${b.size}`}
                  variant="outlined"
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
                sx={{ fontSize: "1rem" }}
                variant="contained"
                className=" p-4 !px-6"
              >
                {<Spinner />}
              </Button>
            ) : (
              <Button
                sx={{ fontSize: "1rem" }}
                type="submit"
                variant="contained"
                className=" p-4 !px-6"
              >
                Create
              </Button>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default LiquorForm;
