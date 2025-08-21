import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";

const RiskHeatmap=({ buckets, matrix }) =>{
  const theme = useTheme();
  const max = Math.max(...matrix.flat()); 
  return (
    <Box>
      <TableContainer component={Paper} sx={{ border: `1px solid ${theme.palette.divider}` }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Champion ↓ / Challenger →</TableCell>
              {buckets.map((b) => (
                <TableCell key={`to-${b}`} align="center">{b}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {matrix.map((row, rIdx) => (
              <TableRow key={`from-${buckets[rIdx]}`}>
                <TableCell sx={{ fontWeight: 600 }}>{buckets[rIdx]}</TableCell>
                {row.map((val, cIdx) => {
                  const intensity = val / max;
                  const bg = `rgba(30,136,229,${0.15 + intensity * 0.55})`;
                  const color = intensity > 0.6 ? "#fff" : undefined;
                  return (
                    <TableCell key={`cell-${rIdx}-${cIdx}`} align="center" sx={{ bgcolor: bg, color, borderRadius: 1,height:'5px' }}>
                      {val}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
        Numbers represent % share of applications migrating from Champion bucket (rows) to Challenger bucket (columns).
      </Typography>
    </Box>
  );
}
export default RiskHeatmap;