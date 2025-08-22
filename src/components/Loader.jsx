import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = ({ text = "Loading..." }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
      sx={{ minHeight: "200px" }}
    >
      <CircularProgress size={48} thickness={4} color="primary" />
      <Typography variant="body1" mt={2} color="textSecondary">
        {text}
      </Typography>
    </Box>
  );
};

export default Loader;
