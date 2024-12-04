import React from "react";
import { Typography, Box } from "@mui/material";
import { MainAppBar } from "../components/AppBar/MainAppBar/MainAppBar";

// NotFoundPage Component
const NotFoundPage = () => {
  return (
    <>
      {/* Navigation Bar */}
      <MainAppBar onLogout={() => {}} showLogoutButton={false}/>

      {/* Content Container */}
      <Box
        id="hero"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "100vh",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "3rem", md: "4rem" },
          }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          sx={{
            marginY: "20px",
          }}
        >
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: "40px",
          }}
        >
          It might have been moved, renamed, or maybe it never existed.
        </Typography>
      </Box>
    </>
  );
};

export default NotFoundPage;
