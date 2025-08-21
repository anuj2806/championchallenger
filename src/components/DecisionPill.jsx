import { Box, Chip, Typography } from "@mui/material";

const DecisionPill =({ decision, details })=> {
  const positive = decision.toLowerCase().includes("approved");
  return (
    <Box display="inline-flex" alignItems="center" gap={1}>
      <Chip size="small" label={decision} color={positive ? "success" : "error"} />
      <Typography variant="body2" color="text.secondary">{details}</Typography>
    </Box>
  );
}
export default DecisionPill;