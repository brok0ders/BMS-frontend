import * as React from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <Box
      id="hero"
      sx={{
        width: "100%",
        height: "100vh", // Full viewport height
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          zIndex: -1,
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
          zIndex: -1,
        }}
      />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          color: "#FFFFFF", // White text color
          zIndex: 1,
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
              fontWeight: "bold",
            }}
          >
            Welcome to&nbsp;
            <Typography
              className="text-amber-500"
              component="span"
              variant="h1"
              sx={{
                fontSize: "clamp(3rem, 10vw, 4rem)",
              }}
            >
              BOTTLERS
            </Typography>
          </Typography>
          <Typography
            className="text-sky-300"
            variant="h5"
            sx={{
              fontSize: "1.5rem",
              fontWeight: 500,
              maxWidth: { sm: "100%", md: "80%" },
              mx: "auto",
            }}
          >
            Simplify Your Calculations, Streamline Your Workflow
          </Typography>
          <Typography
            className="text-white"
            variant="body1"
            sx={{
              maxWidth: { sm: "100%", md: "80%" },
              mx: "auto",
            }}
          >
            Our product revolutionizes the way you handle FL2/CL2 calculations,
            cutting through complexity and reducing paperwork. Enjoy a
            systematic, user-friendly structure designed to enhance accuracy and
            boost productivity. Experience efficiency like never before.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign in
            </Button>
          </Stack>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            By clicking &quot;Sign in&quot; you can access your account.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
