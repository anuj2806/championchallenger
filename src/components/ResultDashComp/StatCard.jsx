import { Box, Card, CardContent, Chip, Typography, useTheme } from "@mui/material";


const StatCard = ({ title, left, right, delta, goodIsUp = true }) => {
  const improved = (right - left) * (goodIsUp ? 1 : -1) >= 0;
  const theme = useTheme();
  return (
    <Card elevation={4}>
      <CardContent>
        <Typography variant="overline" color="text.secondary">
          {title}
        </Typography>
        <Box display="flex" alignItems="baseline" gap={2} mt={1} justifyContent={'space-between'}>
          <Box display="flex" justifyContent={'space-between'}>
            <Typography variant="h5">{title.toLowerCase().includes("loan") ? Number(left).toLocaleString("en-US") : left}</Typography>
            <Typography variant="h5">&nbsp; → &nbsp; </Typography>
            <Typography variant="h5" color={improved ?  theme.palette.positive :  theme.palette.negative}>
              {title.toLowerCase().includes("loan") ? Number(right).toLocaleString("en-US") : right}
            </Typography>
          </Box>
          <Chip
            size="small"
            label={`${delta > 0 ? "+" : ""}${title.toLowerCase().includes("loan") ? Number(delta).toLocaleString("en-US") : delta}`}
            color={improved ? "success" : "error"}
            variant="filled"
            sx={{marginTop:'-2px',backgroundColor:improved ?  theme.palette.positive :  theme.palette.negative}}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;