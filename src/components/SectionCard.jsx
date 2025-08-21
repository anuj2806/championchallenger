import { Box, Card, CardContent, Typography } from "@mui/material";

const SectionCard = ({ title, children, actions, sx }) => (
  <Card elevation={4} sx={{...sx }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="subtitle1" fontWeight={600}>{title}</Typography>
        <Box>{actions}</Box>
      </Box>
      {children}
    </CardContent>
  </Card>
);
export default SectionCard