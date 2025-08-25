import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Link,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";
import { HelpOutline, Launch } from "@mui/icons-material";
import logo from "../assets/logo.svg";

function NewgenHeaderComponent({ openChallengerModel }) {
    const theme = useTheme();
  return (
    <Box
      display="flex"
      height="50px"
      sx={{
        backgroundColor: "white",
        borderBottom: "2px solid #f79e55ff",
        padding: "0px 4px",
      }}
    >
      {/* --- Left Section: Logo and Title --- */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="Newgen Logo" width={"150px"} />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 2, my: 1, bgcolor: "#cfcfcfff" }}
        />
        <Typography variant="h6" color="black" component="div">
          Newgen CDE
        </Typography>
      </Box>

      {/* This Box will grow and push the right section to the end */}
      <Box sx={{ flexGrow: 1 }} />

      {/* --- Right Section: Links and User Avatar --- */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Link
          href="#"
          underline="none"
          sx={{ display: "flex", alignItems: "center", color: theme.palette.primary.main }}
        >
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Automation Studio
          </Typography>
          <IconButton onClick={openChallengerModel} sx={{color:"blue"}} > 
            <Launch sx={{ fontSize: 16}} />
          </IconButton>
        </Link>
        <HelpOutline color="disabled" />
        <Avatar
          sx={{ bgcolor: "#d2691e", width: 32, height: 32, fontSize: "1rem" }}
        >
          C
        </Avatar>
      </Box>
    </Box>
  );
}

export default NewgenHeaderComponent;
