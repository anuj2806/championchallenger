
import { Box, Chip } from "@mui/material";

const DecisionPill = ({ decision }) => {
  const decisionLower = decision.toLowerCase();

  // Map decisions to colors
  let color = "default";
  if (decisionLower.includes("approve")) {
    color = "success";
  } else if (decisionLower.includes("review")) {
    color = "warning";
  } else if (decisionLower.includes("decline")) {
    color = "error";
  }

  return (
    <Box display="inline-flex" alignItems="center" gap={1}>
      <Chip size="small" label={decision} color={color} />
    </Box>
  );
};

export default DecisionPill;
