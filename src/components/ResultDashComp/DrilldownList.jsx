

import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Tooltip,
  useTheme,
} from "@mui/material";
import DecisionPill from "../DecisionPill"; // Custom component for decision styling

const DrilldownList = ({ ruleOutput }) => {
  const theme = useTheme();

  const decisions = ruleOutput?.decisions || [];
 
  const ruleNames = useMemo(() => {
    const set = new Set();
    decisions.forEach((d) => {
      d.ruleDecisions.forEach((rd) => set.add(rd.ruleName));
    });
    return Array.from(set);
  }, [decisions]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        maxHeight: "500px",
        overflowX: "auto",
      }}
    >
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Application ID</TableCell>
            {ruleNames.map((rule) => (
              <TableCell key={rule}>{rule}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {decisions.map((row) => (
            <TableRow key={row.applicationId} hover sx={{ alignItems: "center" }}>
              {/* Fixed Columns */}
              <TableCell>
                <Typography fontWeight={600}>{row.applicationId}</Typography>
              </TableCell>

              {/* Dynamic Rule Columns */}
              {ruleNames.map((rule) => {
                const rd = row.ruleDecisions.find((r) => r.ruleName === rule);
                return (
                  <TableCell key={rule}>
                    {rd ? (
                      <Tooltip
                        title={`Score: ${rd.score}, Time: ${rd.timeTakenMs}ms`}
                        arrow
                      >
                        <span>
                          <DecisionPill decision={rd.decision} />
                        </span>
                      </Tooltip>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DrilldownList;
