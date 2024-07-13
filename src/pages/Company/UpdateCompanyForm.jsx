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

const UpdateCompanyForm = ({ id, open, onClose }) => {
  const [name, setName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const { company, updateCompany, getCompany, getAllCompany } =
    useContext(CompanyContext);
  const handleChange = (event) => {
    setCompanyType(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateCompany({ id, name, companyType });
      if (res?.success) {
        toast.success(`Supplier updated successfully!`);
      }
      getCompany2();
      await getAllCompany();
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getCompany2 = async () => {
    try {
      const res = await getCompany({ id });
      console.log(res);
      setName(res?.company?.name);
      setCompanyType(res?.company?.companyType);
    } catch (e) {}
  };

  useEffect(() => {
    getCompany2();
  }, []);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        className="text-center"
        sx={{
          fontWeight: "semibold",
          fontSize: { xs: "1.5rem", md: "2rem" },
          my: 0,
        }}
      >
        Update Supplier
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
          <TextField
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="outlined-basic"
            label="Supplier Name"
            variant="outlined"
            fullWidth
            className="mb-0"
          />
          <FormControl sx={{ minWidth: "50%", marginTop: 3 }}>
            <InputLabel id="comapny-label">Supplier Type</InputLabel>
            <Select
              required
              labelId="company-label"
              id="company-select"
              value={companyType}
              label="Supplier Type"
              name="companyType"
              className="w-full"
              onChange={handleChange}
            >
              <MenuItem value="beer">Beer</MenuItem>
              <MenuItem value="liquor">Liquor</MenuItem>
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
          <Button type="submit" variant="contained" className="p-2 !px-4">
            Update
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default UpdateCompanyForm;
