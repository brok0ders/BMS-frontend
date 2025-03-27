import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserContext from "../../context/user/userContext";
import { Alert, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import LiquorContext from "../../context/liquor/liquorContext";
import ClContext from "../../context/cl/clContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
export default function RegisterPage() {
  const { userRegister } = useContext(UserContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [addressGodown, setAddressGodown] = useState("");
  const [FLliscensee, setFLliscensee] = useState("");
  const [address, setAddress] = useState("");
  const [TINno, setTINno] = useState("");
  const [PANno, setPANno] = useState("");
  const [gType, setgType] = useState("");
  const { createCL } = useContext(ClContext);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await userRegister({
        name,
        username,
        email,
        mobile,
        password,
        addressGodown,
        FLliscensee,
        address,
        TINno,
        PANno,
        gType,
      });
      if (data.success) {
        // const res = await createCL({
        //   userId: data.user._id,
        // });
        toast.success(
          `${data.user.username} has been registered successfully!`
        );
        navigate(`/dashboard/`);
        localStorage.setItem("token", data?.token);
      } else {
        toast.warning(`Wrong data input format`);
      }
    } catch (e) {
      toast.error(`Registration failed!`);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (e) => {
    setgType(e.target.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  value={name}
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Grid>
              <FormControl
                sx={{ marginTop: "1rem", marginLeft: "14px" }}
                variant="outlined"
                fullWidth
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        sx={{ width: 36, height: 36 }}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile Number"
                  name="mobile"
                  autoComplete="mobile number"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="addressGodown"
                  label="Godown Address"
                  name="addressGodown"
                  autoComplete="addressGodown"
                  value={addressGodown}
                  onChange={(e) => {
                    setAddressGodown(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ minWidth: 400 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Godown Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={gType}
                    onChange={handleChange}
                    fullWidth
                    label="Godown Type"
                  >
                    <MenuItem value={"fl"}>FL2</MenuItem>
                    <MenuItem value={"cl"}>CL2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="FLliscensee"
                  label="FL/CL Liscensee Name"
                  name="FLliscensee"
                  autoComplete="FLliscensee"
                  value={FLliscensee}
                  onChange={(e) => {
                    setFLliscensee(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="tin"
                  label="TIN number"
                  name="TINno"
                  autoComplete="TIN no"
                  value={TINno}
                  onChange={(e) => {
                    setTINno(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="pan"
                  label="PAN number"
                  name="PANno"
                  autoComplete="PAN no"
                  value={PANno}
                  onChange={(e) => {
                    setPANno(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" className="text-sm text-blue-700">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
