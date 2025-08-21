// App.jsx
import React, { useState } from "react";
import BreChampionChallengerUI from "./pages/BreChampionChallengerUI.jsx";
import { ThemeProvider } from "./Theme/ThemeContext.jsx";
import { CssBaseline } from "@mui/material";

export default function App() {
  
  return (
    <ThemeProvider>
        <CssBaseline />
        <BreChampionChallengerUI/>
    </ThemeProvider>
   
  );
}
