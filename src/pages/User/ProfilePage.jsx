import { Add, Preview } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserContext from "../../context/user/userContext";
import ProfileUpdateForm from "./ProfileUpdateForm";
import DeleteIcon from "@mui/icons-material/Delete";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [userData, setUserData] = useState({});
  const { getUser, user, setUser, deleteEmail } = useContext(UserContext);

  const getUserProfile = async () => {
    try {
      const data = await getUser();
      setUserData(data?.user);
    } catch (error) {
      // API fetching
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleEmailDelete = async ({ email }) => {
    try {
      const data = await deleteEmail({ email });
      if (data.success) {
        getUserProfile();
        toast.success("Email deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete email");
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleEmailChange = (e, index) => {
    const newEmails = [...userData.email];
    newEmails[index] = e.target.value;
    setUserData((prev) => ({ ...prev, email: newEmails }));
  };

  return (
    <div>
      <h1 className="text-center text-5xl text-slate-900 my-10 font-bold">
        My Profile
      </h1>
      <h4 className="text-center">
        <span className="font-bold">User Id : </span>
        {userData?.username}
      </h4>
      <Box className="shadow-md p-5 max-w-[45rem] mx-auto border border-gray-400 rounded-xl mb-20">
        <Box className="grid  grid-cols-1 md:grid-cols-2 gap-8 ">
          {/* Profile Form */}
          <TextField
            margin="normal"
            focused={false}
            variant="standard"
            fullWidth
            label="Name"
            name="name"
            inputProps={{
              readOnly: true,
            }}
            value={userData?.name || ""}
          />
          <TextField
            margin="normal"
            focused={false}
            variant="standard"
            fullWidth
            label="Mobile"
            name="mobile"
            inputProps={{
              readOnly: true,
            }}
            value={userData?.mobile || ""}
          />{" "}
          <TextField
            margin="normal"
            focused={false}
            variant="standard"
            fullWidth
            label="FL Liscensee"
            name="FLliscensee"
            inputProps={{
              readOnly: true,
            }}
            value={userData?.FLliscensee || ""}
          />{" "}
          <TextField
            margin="normal"
            focused={false}
            variant="standard"
            fullWidth
            label="Address"
            name="address"
            inputProps={{
              readOnly: true,
            }}
            value={userData?.address || ""}
          />{" "}
          <TextField
            margin="normal"
            focused={false}
            variant="standard"
            fullWidth
            label="Godown Address"
            name="addressGodown"
            inputProps={{
              readOnly: true,
            }}
            value={userData?.addressGodown || ""}
          />
          <TextField
            margin="normal"
            focused={false}
            variant="standard"
            fullWidth
            label="TIN No."
            name="TINno"
            inputProps={{
              readOnly: true,
            }}
            value={userData?.TINno || ""}
          />
          <TextField
            margin="normal"
            focused={false}
            variant="standard"
            fullWidth
            label="Pan No"
            name="PANno"
            inputProps={{
              readOnly: true,
            }}
            value={userData?.PANno || ""}
          />
          {userData?.email?.length > 0 &&
            userData.email.map((email, i) => (
              <Box key={i} display="flex" alignItems="center">
                <TextField
                  key={i}
                  margin="normal"
                  focused={false}
                  variant="standard"
                  fullWidth
                  label={`Email ${i + 1}`}
                  name={`email${i}`}
                  value={email}
                  inputProps={{
                    readOnly: true,
                  }}
                />
                <IconButton
                  onClick={() => handleEmailDelete({ email })}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
        </Box>
        <Box className="flex justify-end my-5">
          <Button onClick={handleOpen} variant="contained" startIcon={<Add />}>
            Add Email
          </Button>
        </Box>
      </Box>
      <ProfileUpdateForm
        open={open}
        onClose={handleClose}
        emails={userData?.email}
      />
    </div>
  );
};

export default ProfilePage;
