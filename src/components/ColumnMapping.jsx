import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const ColumnMapping = ({setIsModeOpen}) => {
  const [columnMapping, setColumnMapping] = useState({});

  // Core attributes
  const attributes = [
    "Application Id",
    "Applicant Age",
    "Bankruptcy Flag",
    "Beacon Score",
    "BNI Score",
    "Calculated DTI",
    "Calculated LTV",
    "Citizenship Status",
    "Collateral Age",
    "Collateral Value",
    "Days Past Due 30",
    "Days Past Due 60",
    "Days Past Due 90",
    "Foreclosure Flag",
    "Annual Income",
    "Loan Amount",
    "Loan Term",
    "Max DTI",
    "Max DTI Tier A I",
    "Max DTI Tier B",
    "Max DTI Tier C I",
    "Max Loan Amount",
    "Max Loan Term",
    "Max LTV",
    "Max LTV Tier A",
    "Max LTV Tier B",
    "Max LTV Tier C",
    "Min Beacon Score",
    "Min Loan Amount",
    "Occupancy Type",
    "Scheme Id",
    "Short Sale Flag",
    "State Code",
    "Time In Job",
    "Time In Residence",
    "Trades Due",
    "Trades Reported",
    "Policy Violations",
    "Loan Amount DTI Tier A I",
    "Loan Amount DTI Tier B",
    "Loan Amount DTI Tier C",
    "Loan Amount LTV Tier A",
    "Loan Amount LTV Tier B",
    "Loan Amount LTV Tier C",
    "Tier Category",
  ];

  // Mapped values
  const mappedOptions = [
    "applicantage",
    "bankruptcy4",
    "beaconvalue",
    "bni",
    "calcdti",
    "calcltv",
    "citizenship",
    "collateralage",
    "collateralvalue",
    "day30",
    "day60",
    "day90",
    "foreclosure",
    "income",
    "loanamount",
    "loanamt",
    "loanterm",
    "maxdti",
    "maxdtitierb",
    "maxdttierai",
    "maxdttierci",
    "maxloanamount",
    "maxloanamt",
    "maxloanterm",
    "maxltv",
    "maxltvtiera",
    "maxltvtierb",
    "maxltvtierc",
    "minbeacon",
    "minloanamount",
    "minloanamt",
    "occupancy",
    "schemeid",
    "shortsalepl",
    "state",
    "timejob",
    "timeres",
    "tradesdue",
    "tradesreported",
    "violations",
    "loanamtdtitierb",
    "loanamtdtitierc",
    "loanamtdttierai",
    "loanamtltvtiera",
    "loanamtltvtierb",
    "loanamtltvtierc",
    "tier",
    "applicationId",
  ];

  const handleMappingChange = (index, value) => {
    setColumnMapping((prevMapping) => ({
      ...prevMapping,
      [index]: value,
    }));
  };

  const handleReset = (index) => {
    setColumnMapping((prevMapping) => {
      const newMapping = { ...prevMapping };
      delete newMapping[index];
      return newMapping;
    });
  };

  const selectedValues = Object.values(columnMapping);

  const onMapClick = () => {
    console.log("Final Mapping:", columnMapping);
    setIsModeOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Typography variant="h6" >
        Map Model Data Required to Source Data Fields
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Confirm each attribute is matched to the correct column in your imported
        file.
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Model Data Required</strong>
              </TableCell>
              <TableCell>
                <strong> Source Data Fields</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attributes.map((attribute, index) => {
              const mappedColumn = columnMapping[index];

              return (
                <TableRow key={index}>
                  <TableCell>{attribute}</TableCell>
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <Select
                        value={mappedColumn || ""}
                        onChange={(e) =>
                          handleMappingChange(index, e.target.value)
                        }
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 250,
                              overflowY: "auto",
                            },
                          },
                        }}
                      >
                        {mappedOptions
                          .filter(
                            (option) =>
                              !selectedValues.includes(option) ||
                              mappedColumn === option
                          )
                          .map((option, idx) => (
                            <MenuItem key={idx} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        <MenuItem value="" onClick={() => handleReset(index)}>
                          <em>Clear Selection</em>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={onMapClick}
      >
        Map Data
      </Button>
    </Box>
  );
};

export default ColumnMapping;
