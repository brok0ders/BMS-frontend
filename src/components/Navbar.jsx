import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getLPTheme from "../Homepage/getLPTheme.jsx";
import AppAppBar from "../Homepage/components/AppAppBar.jsx";

export default function Navbar() {
  const [mode, setMode] = React.useState("light");
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
    </ThemeProvider>
  );
}
