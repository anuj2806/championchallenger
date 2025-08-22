import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ExcelUploader from "./ExcelUploader";
const RunSimulationDialog = ({
  file,
  setFile,
  ruleData,
  dialogOpen,
  setDialogOpen,
  selectedChampion,
  selectedChallenger,
  setSelectedChampion,
  setSelectedChallenger,
  handleRunSimulation,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const challengerOptions = useMemo(() => {
    console.log(selectedChampion);
  return ruleData.filter(
    (r) => r.championName === selectedChampion && r.ruleTag === "Challenger"
  );
}, [selectedChampion, ruleData]);
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
            <FormControl fullWidth>
              <InputLabel>Champion Rule</InputLabel>
              <Select
                input={<OutlinedInput label="Champion Rule" />}
                value={selectedChampion}
                onChange={(e) => setSelectedChampion(e.target.value)}
              >
                {ruleData
                  .filter((r) => r.ruleTag === "Champion")
                  .map((rule) => (
                    <MenuItem key={rule.ruleName} value={rule.ruleName}>
                      {rule.ruleName} ({rule.ruleVersion})
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>Pick current production version</FormHelperText>
            </FormControl>
          </StepContentWrapper>
        )}

        {activeStep === 1 && (
          <StepContentWrapper>
            <FormControl fullWidth>
              <InputLabel>Challenger Rule</InputLabel>
              <Select
                input={<OutlinedInput label="Challenger Rule" />}
                multiple
                value={selectedChallenger} // should be an array
                onChange={(e) => setSelectedChallenger(e.target.value)}
                renderValue={(selected) => selected.join(", ")} // display selected names
              >
                {challengerOptions.map((rule) => (
                  <MenuItem key={rule.ruleName} value={rule.ruleName}>
                    <Checkbox
                      checked={selectedChallenger.indexOf(rule.ruleName) > -1}
                    />
                    <ListItemText
                      primary={`${rule.ruleName} (${rule.ruleVersion})`}
                    />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Select new rule version(s) to test
              </FormHelperText>
            </FormControl>
          </StepContentWrapper>
        )}

        {activeStep === 2 && (
          <StepContentWrapper>
              <ExcelUploader file={file} setFile={setFile}/> 
          </StepContentWrapper>
        )}

        {activeStep === 3 && (
          <StepContentWrapper>
            <SummaryRow label="Champion" value={selectedChampion} />
            <SummaryRow label="Challenger" value={selectedChallenger} />
            <SummaryRow label="Dataset" value={file.name} />
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
