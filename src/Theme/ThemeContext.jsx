// ThemeContext.tsx
import React, { createContext, useContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { lightPalette, darkPalette } from "./themePalettes.js";



const ThemeContext = createContext(undefined);

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used inside ThemeProvider");
  return ctx;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false); 

  const theme = useMemo(
    () =>
      createTheme({
        palette: darkMode ? darkPalette : lightPalette,
        shape: { borderRadius: 16 },
        typography: {
          fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system",
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
