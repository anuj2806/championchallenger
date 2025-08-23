// themePalettes.ts
import { PaletteOptions } from "@mui/material/styles";

export const lightPalette = {
  mode: "light",
  primary: { main: "#8d8d8dff" },
  secondary: { main: "#b9b8b8ff" },
  header: { main: "#555555ff" },
  background: {
    default: "#FDFDFD",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#1C1B1F",
    secondary: "#49454F",
  },
};

export const darkPalette = {
  mode: "dark",
  primary: { main: "#D0BCFF" },
  secondary: { main: "#B5CEA8" },
  header: { main: "#6e6680ff" },
  background: {
    default: "#121212",
    paper: "#1E1E1E",
  },
  text: {
    primary: "#E6E1E5",
    secondary: "#A1A1A1",
  },
};
