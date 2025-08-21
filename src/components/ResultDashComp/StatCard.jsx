import { Box, Card, CardContent, Chip, Typography } from "@mui/material";


const StatCard = ({ title, left, right, delta, goodIsUp = true }) => {
  const improved = (right - left) * (goodIsUp ? 1 : -1) >= 0;
  return (
    <Card elevation={4}>
      <CardContent>
        <Typography variant="overline" color="text.secondary">
          {title}
        </Typography>
        <Box display="flex" alignItems="baseline" gap={2} mt={1} justifyContent={'space-between'}>
          <Box display="flex" justifyContent={'space-between'}>
            <Typography variant="h5">{left}{typeof left === "number" && title.toLowerCase().includes("rate") ? "%" : ""}</Typography>
            <Typography variant="h5">&nbsp; → &nbsp; </Typography>
            <Typography variant="h5" color={improved ? "success.main" : "error.main"}>
              {right}
              {typeof right === "number" && title.toLowerCase().includes("rate") ? "%" : title.toLowerCase().includes("tat") ? "ms" : title.toLowerCase().includes("revenue") ? "" : ""}
            </Typography>
          </Box>
          <Chip
            size="small"
            label={`${delta > 0 ? "+" : ""}${delta}${title.toLowerCase().includes("rate") ? "%" : title.toLowerCase().includes("tat") ? "ms" : title.toLowerCase().includes("revenue") ? "" : ""}`}
            color={improved ? "success" : "error"}
            variant="filled"
            sx={{marginTop:'-2px'}}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;