import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CompanyContext from "../../context/company/companyContext";
import { toast } from "react-toastify";
import Spinner from "../../components/Layout/Spinner";
import Loader from "../../components/Layout/Loader";

const CompanyForm = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [data, setData] = useState([]);
  const [comps, setComps] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createCompany, getAllCompany, allGlobalCompany, getCompany } =
    useContext(CompanyContext);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const filterByCompanyType = async (compType) => {
    const filtered = comps.filter((c) => c.companyType === compType);
    setData(filtered);
  };

  const handleSubmit = async (e) => {
    setSpinner(true);
    e.preventDefault();
    try {
      const res = await createCompany({ compId: name });
      console.log(res);
      if (res?.success) {
        await getAllCompany();
        toast.success(`New Supplier created successfully`);
      }
      setName(""); // Reset form
      setCompanyType("");
      onClose(); // Close the modal
      await getAllCompany();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSpinner(false);
    }
  };

  const getGlobalCompany = async () => {
    setLoading(true);
    try {
      const res = await allGlobalCompany();
      setComps(res.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getGlobalCompany();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle
              className="text-center"
              sx={{
                fontWeight: "semibold",
                fontSize: { xs: "1.5rem", md: "2rem" },
                my: 0,
              }}
            >
              Create Supplier
            </DialogTitle>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 1, sm: 1 },
              }}
            >
              <DialogContent
                sx={{
                  my: 0,
                  py: 1,
                }}
              >
                <FormControl sx={{ minWidth: "100%" }}>
                  <InputLabel id="comapny-label">Supplier Type</InputLabel>
                  <Select
                    required
                    labelId="company-label"
                    id="company-select"
                    value={companyType}
                    label="Supplier Type"
                    name="companyType"
                    className="w-full"
                    onChange={(event) => {
                      setCompanyType(event.target.value);
                      filterByCompanyType(event.target.value);
                    }}
                  >
                    <MenuItem value="beer">Beer</MenuItem>
                    <MenuItem value="liquor">Liquor</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: "100%", marginTop: 3 }}>
                  <InputLabel id="comapny-label">Supplier Name</InputLabel>
                  <Select
                    required
                    labelId="company-label"
                    id="company-select"
                    value={name}
                    label="Supplier Name"
                    name="companyType"
                    className="w-full"
                    onChange={handleChange}
                  >
                    {data.map((company) => (
                      <MenuItem key={company._id} value={company._id}>
                        {company.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions
                sx={{
                  mt: 4,
                  mb: 1,
                }}
              >
                <Button onClick={onClose} color="inherit">
                  Cancel
                </Button>
                {spinner ? (
                  <Button variant="contained" className=" p-2 !px-4" sx = {{minWidth: '6rem', height: '2rem'}}>
                    {<Spinner />}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    className=" p-2 !px-4"
                    sx = {{minWidth: '6rem', minHeight: '2rem'}}
                  >
                    Create
                  </Button>
                )}
              </DialogActions>
            </Box>
          </Dialog>
        </>
      )}
    </>
  );
};

export default CompanyForm;
