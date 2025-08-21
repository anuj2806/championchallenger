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

const MetricsTable = () => {
  const theme = useTheme();

  const rows = [
    { metric: "Approval Rate", champ: "62%", chall: "68%", result: "+6%", color: "success.main" },
    { metric: "Default Rate", champ: "4.2%", chall: "4.9%", result: "-0.7%", color: "error.main" },
    { metric: "Revenue per Loan", champ: "$320", chall: "$345", result: "+$25", color: "success.main" },
    { metric: "Decision Latency", champ: "120ms", chall: "150ms", result: "-30ms", color: "error.main" },
  ];

  return (
    <TableContainer component={Paper} sx={{ border: `1px solid ${theme.palette.divider}` }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Metric</TableCell>
            <TableCell>Champion</TableCell>
            <TableCell>Challenger</TableCell>
            <TableCell>Δ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.metric} hover>
              <TableCell>
                <Typography fontWeight={600}>{r.metric}</Typography>
              </TableCell>
              <TableCell>{r.champ}</TableCell>
              <TableCell>{r.chall}</TableCell>
              <TableCell sx={{ color: theme.palette[r.color.split(".")[0]][r.color.split(".")[1]] }}>
                {r.result}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MetricsTable;
