import React, { useState, useMemo } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FormControlLabel from "@mui/material/FormControlLabel";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Box,
  Toolbar,
  Typography,
  AppBar,
  Button,
  Grid,
  Container,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SectionCard from "../components/SectionCard";
import RuleRepositoryTable from "../components/RuleRepositoryTable";
import { useThemeContext } from "../Theme/ThemeContext";
import ResultDashboard from "./ResultDashboard";
import RunSimulationDialog from "../components/RunSimulationDialog";

const RULE_ROWS = [
  {
    id: "CreditPolicy",
    version: "v1.0",
    status: "Champion",
    owner: "Raj",
    updated: "10 Aug 2025",
  },
  {
    id: "CreditPolicy",
    version: "v1.1",
    status: "Challenger",
    owner: "Meena",
    updated: "15 Aug 2025",
  },
  {
    id: "IncomeCheck",
    version: "v2.0",
    status: "Champion",
    owner: "Amit",
    updated: "05 Aug 2025",
  },
  {
    id: "IncomeCheck",
    version: "v2.1",
    status: "Challenger",
    owner: "Amit",
    updated: "18 Aug 2025",
  },
  {
    id: "FraudRules",
    version: "v3.3",
    status: "Archived",
    owner: "Neeraj",
    updated: "22 Jul 2025",
  },
];

export default function BreChampionChallengerUI() {
  const [query, setQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedChampion, setSelectedChampion] = useState("CreditPolicy v1.0");
  const [selectedChallenger, setSelectedChallenger] =
    useState("CreditPolicy v1.1");

  const [showResults, setShowResults] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const { darkMode, toggleDarkMode } = useThemeContext();
  const theme = useTheme();
  const filteredRows = useMemo(() => {
    return RULE_ROWS.filter(
      (r) =>
        (filter === "All" || r.status === filter) &&
        `${r.id} ${r.version} ${r.status} ${r.owner}`
          .toLowerCase()
          .includes(query.toLowerCase())
    );
  }, [query, filter]);

  const handleRunSimulation = () => {
    setShowResults(true);
    setDialogOpen(false);
    setSnackbar({
      open: true,
      message: "Simulation completed on sample set.",
      severity: "success",
    });
  };

  const handlePromote = () => {
    setSnackbar({
      open: true,
      message: "Challenger promoted to Champion.",
      severity: "success",
    });
  };

  const handleReject = () => {
    setSnackbar({
      open: true,
      message: "Challenger rejected.",
      severity: "info",
    });
  };

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
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            BRE Rule Versions
          </Typography>
          <TextField
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
          />
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
            label={darkMode ? "Dark" : "Light"}
          />
          <IconButton
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
            <MenuItem onClick={() => setFilter("Archived")}>Archived</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3, width: "100%", flexGrow: 1 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          {[
            { label: "All", color: "default" },
            { label: "Champion", color: "success" },
            { label: "Challenger", color: "warning" },
            { label: "Archived", color: "default" },
          ].map((c) => (
            <Chip
              key={c.label}
              label={c.label}
              color={filter === c.label ? c.color : "default"}
              variant={filter === c.label ? "filled" : "outlined"}
              onClick={() => setFilter(c.label)}
            />
          ))}
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <SectionCard
              title="Rules Repository"
              actions={
                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => setDialogOpen(true)}
                  >
                    Run Simulation
                  </Button>
                </Box>
              }
            >
              <RuleRepositoryTable filteredRows={filteredRows} />
            </SectionCard>
          </Grid>

          {showResults && (
            <ResultDashboard
              selectedChampion={selectedChampion}
              selectedChallenger={selectedChallenger}
              handlePromote={handlePromote}
              handleReject={handleReject}
            />
          )}
        </Grid>
      </Container>
      <RunSimulationDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        selectedChampion={selectedChampion}
        selectedChallenger={selectedChallenger}
        setSelectedChampion={setSelectedChampion}
        setSelectedChallenger={setSelectedChallenger}
        handleRunSimulation={handleRunSimulation}
      />
      <Tooltip title="Create Challenger">
        <Fab
          color="secondary"
          sx={{ position: "fixed", bottom: 24, right: 24 }}
          onClick={() => setDialogOpen(true)}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
