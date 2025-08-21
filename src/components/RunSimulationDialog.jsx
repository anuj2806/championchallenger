import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Slider,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { motion } from "framer-motion";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
const RunSimulationDialog = ({
  dialogOpen,
  setDialogOpen,
  selectedChampion,
  selectedChallenger,
  setSelectedChampion,
  setSelectedChallenger,
  handleRunSimulation
}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [dataset, setDataset] = useState("Historical – Jan–Jun 2025");
    const [sample, setSample] = useState(25000);
    const [fullPortfolio, setFullPortfolio] = useState(false);
  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Run Simulation</DialogTitle>
      <DialogContent dividers>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
          {["Champion", "Challenger", "Dataset", "Confirm"].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <StepContentWrapper>
            <TextField
              fullWidth
              label="Champion Rule"
              value={selectedChampion}
              onChange={(e) => setSelectedChampion(e.target.value)}
              helperText="Pick current production version"
            />
          </StepContentWrapper>
        )}

        {activeStep === 1 && (
          <StepContentWrapper>
            <TextField
              fullWidth
              label="Challenger Rule"
              value={selectedChallenger}
              onChange={(e) => setSelectedChallenger(e.target.value)}
              helperText="Select new rule version to test"
            />
          </StepContentWrapper>
        )}

        {activeStep === 2 && (
          <StepContentWrapper>
            <Grid container spacing={2}>
              <Grid size={{xs:4}}>
                <TextField
                  fullWidth
                  label="Dataset"
                  value={dataset}
                  onChange={(e) => setDataset(e.target.value)}
                />
              </Grid>
              <Grid size={{xs:4}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={fullPortfolio}
                      onChange={(e) => setFullPortfolio(e.target.checked)}
                    />
                  }
                  label="Full Portfolio"
                />
              </Grid>
              <Grid size={{xs:4}}>
                <Typography gutterBottom>Sample Size</Typography>
                <Slider
                  value={sample}
                  onChange={(_, v) => setSample(v)}
                  min={1000}
                  max={100000}
                  step={1000}
                  valueLabelDisplay="auto"
                />
              </Grid>
            </Grid>
          </StepContentWrapper>
        )}

        {activeStep === 3 && (
          <StepContentWrapper>
            <SummaryRow label="Champion" value={selectedChampion} />
            <SummaryRow label="Challenger" value={selectedChallenger} />
            <SummaryRow label="Dataset" value={dataset} />
            <SummaryRow
              label="Run Mode"
              value={
                fullPortfolio
                  ? "Full Portfolio"
                  : `Random Sample (${sample.toLocaleString()} apps)`
              }
            />
          </StepContentWrapper>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        {activeStep > 0 && (
          <Button onClick={() => setActiveStep((s) => s - 1)}>Back</Button>
        )}
        {activeStep < 3 ? (
          <Button
            variant="contained"
            onClick={() => setActiveStep((s) => s + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            onClick={handleRunSimulation}
          >
            Run
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RunSimulationDialog;

const StepContentWrapper = ({ children }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {children}
  </Box>
);
const SummaryRow = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between" py={1}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography fontWeight={600}>{value}</Typography>
  </Box>
);
