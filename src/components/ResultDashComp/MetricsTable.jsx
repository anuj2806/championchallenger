import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { use, useEffect, useState } from "react";

const MetricsTable = ({ruleOutput}) => {
  const theme = useTheme();

  const transformRuleOutputToRows = (ruleOutput) => {
  if (!ruleOutput || !ruleOutput.summary) return [];

  const { summary } = ruleOutput;

  // Simulate revenueLoan since it's not provided in API
  const mockRevenue = {
    CreditPolicy: 680,
    CreditPolicy_Challenger1: 630,
    CreditPolicy_Challenger2: 670,
  };

  // Create base rows
  const baseRows = summary.map((item) => {
    const ruleDisplayName = item.ruleName;
    const approvalRate = `${item.approvePct}%`;
    const revenueLoan = `$${mockRevenue[item.ruleName]}`;
    const decisionLatency = `${(item.avgTimeMs / 1000).toFixed(1)}s`;

    return {
      rule: ruleDisplayName,
      approvalRate,
      revenueLoan,
      decisionLatency,
      raw: {
        approvePct: item.approvePct,
        avgTime: item.avgTimeMs,
        revenue: mockRevenue[item.ruleName],
      },
    };
  });

  // Calculate deltas based on Champion
  const champion = baseRows[0];
  return baseRows.map((row, idx) => {
    if (idx === 0) {
      return { ...row, deltaAR: "", deltaRL: "", deltaDL: "", color: "success.main" };
    }

    const deltaAR = row.raw.approvePct - champion.raw.approvePct;
    const deltaRL = row.raw.revenue - champion.raw.revenue;
    const deltaDL = (row.raw.avgTime - champion.raw.avgTime) / 1000;

    // Determine color based on value
    const color = (value) => (value >= 0 ? "success.main" : "error.main");

    return {
      ...row,
      deltaAR: `${deltaAR >= 0 ? "+" : ""}${deltaAR.toFixed(0)}%`,
      deltaRL: `${deltaRL >= 0 ? "+" : ""}${deltaRL}$`,
      deltaDL: `${deltaDL >= 0 ? "+" : ""}${deltaDL.toFixed(1)}s`,
      color: color(deltaAR), // or choose which delta to reflect the color
    };
  });
};

  const [rows, setRows] = useState([]);
  useEffect(() => {
    // Usage
    const rows = transformRuleOutputToRows(ruleOutput);
    console.log(rows);
    setRows(rows);
  }, [ruleOutput]);

  return (
    <TableContainer
      component={Paper}
      sx={{ border: `1px solid ${theme.palette.divider}` }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Rule</TableCell>
            <TableCell>Approval Rate(%)</TableCell>
            <TableCell>Revenue per Loan($)</TableCell>
            <TableCell>Latency(s)</TableCell>
            <TableCell>Δ(AR)</TableCell>
            <TableCell>Δ(R/L)</TableCell>
            <TableCell>Δ(L)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.rule} hover>
              <TableCell>
                <Typography fontWeight={600}>{r.rule}</Typography>
              </TableCell>
              <TableCell>{r.approvalRate}</TableCell>
              <TableCell>{r.revenueLoan}</TableCell>
              <TableCell>{r.decisionLatency}</TableCell>
              <TableCell
                sx={{
                  color:
                    theme.palette[r.color.split(".")[0]][r.color.split(".")[1]],
                }}
              >
                {r.deltaAR}
              </TableCell>
              <TableCell
                sx={{
                  color:
                    theme.palette[r.color.split(".")[0]][r.color.split(".")[1]],
                }}
              >
                {r.deltaRL}
              </TableCell>
              <TableCell
                sx={{
                  color:
                    theme.palette[r.color.split(".")[0]][r.color.split(".")[1]],
                }}
              >
                {r.deltaDL}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MetricsTable;
