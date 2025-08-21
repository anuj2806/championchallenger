import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import DecisionPill from "../DecisionPill";

const DrilldownList=()=> {
   const theme = useTheme();
  const rows = [
    { id: "100234", champ: { decision: "Declined", reason: "Low Score (640)" }, chall: { decision: "Approved", reason: "Score 660, DTI OK" } },
    { id: "100235", champ: { decision: "Approved", reason: "Score 720" }, chall: { decision: "Approved", reason: "Score 710" } },
    { id: "100236", champ: { decision: "Declined", reason: "High DTI 48%" }, chall: { decision: "Declined", reason: "High DTI 46%" } },
  ];
  return (
    <TableContainer component={Paper} sx={{ border: `1px solid ${theme.palette.divider}` }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Application ID</TableCell>
            <TableCell>Champion Decision</TableCell>
            <TableCell>Challenger Decision</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id} hover>
              <TableCell>
                <Typography fontWeight={600}>{r.id}</Typography>
              </TableCell>
              <TableCell>
                <DecisionPill decision={r.champ.decision} details={r.champ.reason} />
              </TableCell>
              <TableCell>
                <DecisionPill decision={r.chall.decision} details={r.chall.reason} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default DrilldownList;
