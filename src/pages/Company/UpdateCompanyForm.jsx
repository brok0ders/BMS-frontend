import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const UpdateCompanyForm = ({ id, open, onClose }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = { name };
      console.log(formdata);

      // Send the form data to the server

      // Handle success (e.g., reset form, display success message)
      setName(""); // Reset form
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getCompany = () => {
    // Fetch the company data from the server using the provided id

    setName("Test Company");
  };

  useEffect(() => {
    getCompany();
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
          <TextField
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="outlined-basic"
            label="Company Name"
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
          <Button type="submit" variant="contained" className="p-2 !px-4">
            Create
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default UpdateCompanyForm;
