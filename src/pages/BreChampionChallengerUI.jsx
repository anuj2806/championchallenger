import React, { useState, useMemo, useEffect } from "react";
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
import SectionCard from "../components/SectionCard";
import RuleRepositoryTable from "../components/RuleRepositoryTable";
import { useThemeContext } from "../Theme/ThemeContext";
import ResultDashboard from "./ResultDashboard";
import RunSimulationDialog from "../components/RunSimulationDialog";
import getAllRules from "../apis/allrulesData";
import executeRuleData from "../apis/executerRuleData";
import Loader from "../components/Loader";

export default function BreChampionChallengerUI() {
  const [query, setQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [RULE_ROWS, setRULE_ROWS] = useState([]);
  const [ruleOutput, setRuleOutput] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedChampion, setSelectedChampion] = useState();
  const [selectedChallenger, setSelectedChallenger] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showResults, setShowResults] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  
  const rulesArray = useMemo(() => {
    const result = [];

    // 1. Add Champion rule
    const championRule = RULE_ROWS.find(
      (r) => r.ruleName === selectedChampion && r.ruleTag === "Champion"
    );
    if (championRule) {
      result.push({
        ruleName: championRule.ruleName,
        ruleVersion: championRule.ruleVersion,
      });
    }

    // 2. Add all selected challengers
    selectedChallenger.forEach((challengerName) => {
      const challengerRule = RULE_ROWS.find(
        (r) => r.ruleName === challengerName && r.ruleTag === "Challenger"
      );
      if (challengerRule) {
        result.push({
          ruleName: challengerRule.ruleName,
          ruleVersion: challengerRule.ruleVersion,
        });
      }
    });

    return result;
  }, [selectedChampion, selectedChallenger, RULE_ROWS]);

  const handleRunSimulation = async () => {
    if (!file) {
      setSnackbar({
        open: true,
        message: "Please select a file before uploading!",
        severity: "error",
      });
      return;
    }

    setDialogOpen(false);
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file); // File object from input
    formData.append("rules", JSON.stringify(rulesArray));
    var ruleoutput = await executeRuleData(formData);
    setRuleOutput(ruleoutput);
    setShowResults(true);
    setLoading(false);
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
  const filteredRows = useMemo(() => {
    return RULE_ROWS.filter(
      (r) =>
        (filter === "All" || r.ruleTag === filter) &&
        `${r.ruleName} ${r.ruleVersion} ${r.ruleTag} ${r.ownerName}`
          .toLowerCase()
          .includes(query.toLowerCase())
    );
  }, [RULE_ROWS, query, filter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allRules = await getAllRules();
        if (allRules && Array.isArray(allRules)) {
          setRULE_ROWS(allRules);
        }
        console.log("All Rules:", allRules);
      } catch (error) {
        console.error("Error fetching all rules:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Container sx={{ py: 3, width: "100%", flexGrow: 1 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          {[
            { label: "All", color: "default" },
            { label: "Champion", color: "success" },
            { label: "Challenger", color: "warning" },
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
          {loading && <Loader text="Loading Champion & Challenger rule insights..." />}
          {showResults && (
            <ResultDashboard
              ruleOutput={ruleOutput}
              selectedChampion={selectedChampion}
              selectedChallenger={selectedChallenger}
              handlePromote={handlePromote}
              handleReject={handleReject}
            />
          )}
        </Grid>
      </Container>
      <RunSimulationDialog
        file={file}
        setFile={setFile}
        ruleData={RULE_ROWS}
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
    </>
  );
}
