
import React, { useState } from "react";

import { useThemeContext } from "../Theme/ThemeContext.jsx";
import {
  AppBar,
  Box,
  Button,
  FormControlLabel,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import PreLandingDashboard from "./PreLandingDashboard.jsx";
import BreChampionChallengerUI from "./BreChampionChallengerUI.jsx";
import SearchIcon from "@mui/icons-material/Search";

const Main = () => {
      const { darkMode, toggleDarkMode } = useThemeContext();
      const [simulationPage, setSimulationPage] = useState(false);
  return (
    <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <AppBar position="sticky" color="primary" elevation={1}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, fontWeight: 700, color: "white" }}
            >
              BRE Rule Versions
            </Typography>
            {/* <TextField
            size="small"
            placeholder="Search rules, owners…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ mr: 2, width: 320, display: { xs: "none", sm: "block" } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          /> */}
         
          <Button variant="contained" sx={{mr:4}} onClick={() => setSimulationPage(!simulationPage)}>{simulationPage?"Back to Dashboard":"Initiate Champion/Challenger Analysis"}</Button>
           <FormControlLabel
            control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
            label={darkMode ? "Dark" : "Light"}
          />
          {/* <IconButton
            color="inherit"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => setFilter("All")}>All</MenuItem>
            <MenuItem onClick={() => setFilter("Champion")}>Champion</MenuItem>
            <MenuItem onClick={() => setFilter("Challenger")}>
              Challenger
            </MenuItem>
          </Menu> */}
          </Toolbar>
        </AppBar>
        {simulationPage?<BreChampionChallengerUI />:<PreLandingDashboard />}
      </Box>
  )
}

export default Main