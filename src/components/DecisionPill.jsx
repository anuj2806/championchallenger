
import { Box, Chip, useTheme } from "@mui/material";

const DecisionPill = ({ decision }) => {
  const decisionLower = decision.toLowerCase();
  const theme = useTheme();

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
      <Chip size="small" label={decision} color={color} sx={{backgroundColor:decisionLower.includes("approve") ?  theme.palette.positive : decisionLower.includes("decline")? theme.palette.negative:theme.palette.highlight}}
/>
    </Box>
  );
};

export default DecisionPill;
