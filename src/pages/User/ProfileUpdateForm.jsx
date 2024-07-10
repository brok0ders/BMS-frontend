import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import UserContext from "../../context/user/userContext";

const ProfileUpdateForm = ({ open, onClose, setUserData }) => {
  const [emails, setEmails] = useState([""]);
  const { userUpdate, getUser } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userUpdate({ email: emails });
      console.log(res);
      if (res?.success) {
        const data = await getUser();
        setUserData(data?.user);
        toast.success(`Emails added successfully`);
      }
      setEmails([""]); // Reset form
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const addEmailField = () => {
    setEmails([...emails, ""]);
  };

  const handleDeleteEmail = (index) => {
    if (index === 0) return;
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
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
        Add Emails
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
          {emails?.length > 0 &&
            emails.map((email, i) => (
              <Box key={i} display="flex" alignItems="center">
                <TextField
                  required
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  label={`Email ${i + 1}`}
                  name={`email${i}`}
                  value={email}
                  onChange={(e) => handleEmailChange(i, e.target.value)}
                />
                <IconButton
                  onClick={() => handleDeleteEmail(i)}
                  color="error"
                  sx={{ ml: 2 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          <Button
            onClick={addEmailField}
            color="primary"
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Add Email
          </Button>
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

export default ProfileUpdateForm;
