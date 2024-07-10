import React, { useContext, useState } from "react";
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

const CompanyForm = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const {createCompany, getAllCompany} = useContext(CompanyContext);
  const handleChange = (event) => {
    setCompanyType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = { name, companyType };
      // Send the form data to the server
      const res = await createCompany(formdata);
      if (res?.success) {
        await getAllCompany();
        toast.success(`New Company created successfully`);
      }
      setName(""); // Reset form
      setCompanyType("");
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
        Create Company
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
            <InputLabel id="comapny-label">Company Name</InputLabel>
            <Select
              required
              labelId="company-label"
              id="company-select"
              value={name}
              label="Company Type"
              name="companyType"
              className="w-full"
              onChange={handleChange}
            >
              <MenuItem
                value='beer'
              >Beer</MenuItem>
              <MenuItem
                value='liquor'
              >Liquor</MenuItem>
            </Select>
          </FormControl>

          <TextField
          sx={{ minWidth: "100%", marginTop: 3 }}
            onChange={(e) => setName(e.target.value)}
            value={companyType}
            id="outlined-basic"
            label="Company Type"
            variant="outlined"
            fullWidth
            className="mb-0"

          />
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
          <Button type="submit" variant="contained" className=" p-2 !px-4">
            Create
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CompanyForm;
