import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import React from "react";

function RuleRepositoryTable({filteredRows}) {
  const theme = useTheme(); 
  return (
    <TableContainer component={Paper} sx={{ border: `1px solid ${theme.palette.divider}` }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Rule ID</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row, idx) => (
            <TableRow key={`${row.ruleName}-${row.ruleVersion}-${idx}`} hover>
              <TableCell>
                <Typography fontWeight={600}>{row.ruleName}</Typography>
              </TableCell>
              <TableCell>{row.ruleVersion}</TableCell>
              <TableCell>
                <Chip
                  label={row.ruleTag}
                  size="small"
                  color={
                    row.ruleTag === "Champion"
                      ? "success"
                      : row.ruleTag === "Challenger"
                      ? "warning"
                      : "default"
                  }
                  variant="filled"
                />
              </TableCell>
              <TableCell>{row.ownerName}</TableCell>
              <TableCell>{row.updatedDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RuleRepositoryTable;
