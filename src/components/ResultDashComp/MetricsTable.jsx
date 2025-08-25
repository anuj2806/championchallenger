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
  const [rows, setRows] = useState([]);
  useEffect(() => {
    // Usage
    const rows = ruleOutput?.summary || [];
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
          {rows.map((r,index) => (
            <TableRow key={r.rule} hover>
              <TableCell>
                <Typography fontWeight={600}>{r.ruleName}</Typography>
              </TableCell>
              <TableCell>{r.approvePercent.toFixed(2)}</TableCell>
              <TableCell>{Number(r.approvedLoanAmount.toFixed(2)).toLocaleString("en-US")}</TableCell>
              <TableCell>{((r.avgTime)/1000).toFixed(2)}</TableCell>
              <TableCell sx={{ color:r.approveDifference>=0?theme.palette.positive:theme.palette.negative}}>
                {index==0?"":`${r.approveDifference>=0?"+":""}${r.approveDifference.toFixed(2)}`}
              </TableCell>
              <TableCell sx={{ color:r.loanAmountDifference>=0?theme.palette.positive:theme.palette.negative}}>
                {index==0?"":`${r.loanAmountDifference>=0?"+":""}${Number(r.loanAmountDifference.toFixed(2)).toLocaleString("en-US")}`}
              </TableCell>
              <TableCell sx={{ color:r.avgTimeDifference<0?theme.palette.positive:theme.palette.negative}}>
                {index==0?"":`${r.avgTimeDifference>=0?"+":""}${((r.avgTimeDifference)/1000).toFixed(2)}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MetricsTable;
