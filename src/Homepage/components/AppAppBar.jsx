import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import MenuIntroduction from "../../components/Layout/Avatar";
import UserContext from "../../context/user/userContext";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

function AppAppBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isLoggedIn, getUser } = React.useContext(UserContext);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        top: 10,
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            borderRadius: "999px",
            bgcolor:
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(24px)",
            maxHeight: 40,
            border: "1px solid",
            borderColor: "divider",
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              ml: "-18px",
              px: 0,
              textAlign: "center",
            }}
          >
            <img
              src={"/images/logo.png"}
              style={logoStyle}
              alt="logo of sitemark"
              className="rounded-full"
              onClick={() => {
                localStorage.getItem("token")
                  ? navigate("/dashboard")
                  : navigate("/");
              }}
            />
            <Box
              sx={{
                flexGrow: 5,
                alignItems: "center",
                ml: "-18px",
                px: 0,
                textAlign: "center",
                justifyContent: "center",
                display: { xs: "none", lg: "flex" },
              }}
            >
              <MenuItem
                onClick={() => {
                  localStorage.getItem("token")
                    ? navigate("/dashboard")
                    : navigate("/");
                }}
                sx={{ py: "6px", px: "12px", mx: "1%" }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ fontSize: "1rem" }}
                >
                  Home
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/about");
                }}
                sx={{ py: "6px", px: "12px", mx: "1%" }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ fontSize: "1rem" }}
                >
                  About
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/contact");
                }}
                sx={{ py: "6px", px: "12px", mx: "1%" }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ fontSize: "1rem" }}
                >
                  Contact us
                </Typography>
              </MenuItem>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 0.5,
              alignItems: "center",
            }}
          >
            {localStorage.getItem("token") ? (
              <>
                <MenuIntroduction />
              </>
            ) : (
              <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                sx={{ fontSize: "0.8rem" }}
              >
                <Link to={"/login"}>Sign in</Link>
              </Button>
            )}
          </Box>

          {/* <Box sx={{ display: { sm: "none", md: "none" } }}>
            <Box
              sx={{
                minWidth: "60dvw",
                p: 2,
                backgroundColor: "background.paper",
                flexGrow: 1,
              }}
            >
              <MenuItem onClick={() => navigate("/home")}>Home</MenuItem>
              <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
              <MenuItem onClick={() => navigate("contact")}>
                Contact Us
              </MenuItem>

              <Divider />

              <MenuItem>
                <Button
                  color="primary"
                  variant="outlined"
                  component="a"
                  href="/login"
                  target="_blank"
                  sx={{ width: "100%" }}
                >
                  Sign in
                </Button>
              </MenuItem>
            </Box>
          </Box> */}
          <>
            <Box sx={{ display: { sm: "block", md: "none" } }}>
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },

                  gap: 2,
                  alignItems: "center",
                }}
              >
                {isLoggedIn ? (
                  <>
                    <MenuIntroduction />
                  </>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component="a"
                    sx={{ fontSize: "0.8rem" }}
                  >
                    <Link to={"/login"}>Sign in</Link>
                  </Button>
                )}
                <IconButton
                  color="default"
                  aria-label="open drawer"
                  edge="start"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Box>
            <Drawer
              anchor="left"
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{
                  minWidth: "80vw",
                  p: 2,
                  backgroundColor: "background.paper",
                  flexGrow: 1,
                }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
                <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
                <MenuItem onClick={() => navigate("contact")}>
                  Contact Us
                </MenuItem>

                <Divider />

                {!isLoggedIn && (
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      onClick={() => navigate("/login")}
                      sx={{ width: "100%" }}
                    >
                      Sign in
                    </Button>
                  </MenuItem>
                )}
              </Box>
            </Drawer>
          </>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppAppBar;
