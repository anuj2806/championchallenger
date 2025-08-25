// themePalettes.ts
import { PaletteOptions } from "@mui/material/styles";

export const lightPalette = {
  mode: "light",
  primary: { main: "#000000ff" },
  secondary: { main: "#2CB1BC" },
  header: { main: "#A0AEC0" },
  positive: "#8DD7B9",
  negative: "#F27D72",
  highlight: "#F6C560",
  alternative: "#5F6CAF",
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
  positive: "#8DD7B9",
  negative: "#F27D72",
  highlight: "#F6C560",
  alternative: "#5F6CAF",
  background: {
    default: "#121212",
    paper: "#1E1E1E",
  },
  text: {
    primary: "#E6E1E5",
    secondary: "#A1A1A1",
  },
};
