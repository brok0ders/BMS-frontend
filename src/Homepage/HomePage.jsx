import * as React from "react";
import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, alpha, createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import AppAppBar from "./components/AppAppBar";
import Hero from "./components/Hero";
import LogoCollection from "./components/LogoCollection";
import Highlights from "./components/Highlights";
import Pricing from "./components/Pricing";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";

import getLPTheme from "./getLPTheme.jsx";
import Footer from "../components/Layout/Footer.jsx";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user/userContext.jsx";

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: "background.default",
          "& .Mui-selected": {
            pointerEvents: "none",
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: "20px", mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function HomePage() {
  const { isLoggedIn, getUser } = React.useContext(UserContext);

  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const navigate = useNavigate();

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };
  React.useEffect(() => {
    getUser();
  }, []);

  if (isLoggedIn) {
    navigate("/dashboard");
  }

  return (
    <>
      <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
        <CssBaseline />
        <Box sx={{ bgcolor: "background.default" }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100vh", // Adjust height as needed
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: 'url("/images/bg.jpg")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                filter: "blur(3px)", // Blur intensity
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: alpha("#000000", 0.5), // Semi-transparent overlay
              }}
            />
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
              }}
            >
              <Hero />
            </Box>
          </Box>
          <Highlights />
          <FAQ />
          <Divider />
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}
