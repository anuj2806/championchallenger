// App.jsx
import { ThemeProvider } from "./Theme/ThemeContext.jsx";
import './App.css';  
import Main from "./pages/Main.jsx";
import { CssBaseline } from "@mui/material";

export default function App() {

  return (
    <ThemeProvider>
      <CssBaseline />
      <Main/>
    </ThemeProvider>
  );
}
