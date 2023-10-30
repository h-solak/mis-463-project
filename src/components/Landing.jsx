import React from "react";
import { SPOTIFY_AUTH_LINK } from "../services/user";
import { Box } from "@mui/material";

const Landing = () => {
  return (
    <div>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        className="absolute-center"
      >
        <h3>Welcome to TuneMix!</h3>
        <a className="btn-primary" href={SPOTIFY_AUTH_LINK}>
          Login to Spotify
        </a>
      </Box>
    </div>
  );
};

export default Landing;
