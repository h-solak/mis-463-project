import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const Playlist = ({ playlist }) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      onClick={() => {
        window.open(playlist.external_urls.spotify, "_blank");
      }}
      sx={{ cursor: "pointer" }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={2}
        sx={{
          backgroundColor: "secondary.light",
          borderRadius: "64px",
          "&:hover": {
            backgroundColor: "#00000020",
            boxShadow: "none",
          },
        }}
      >
        {playlist?.images ? (
          <img
            src={playlist?.images[0]?.url || "https://cataas.com/cat"}
            width={75}
            height={75}
            alt=""
            style={{
              borderRadius: "64px 0px 0px 64px",
            }}
          />
        ) : null}
        <Box display={"flex"} alignItems={"start"} flexDirection={"column"}>
          <Typography fontSize={14} fontWeight={600}>
            {playlist.name}
          </Typography>
          {/* {playlist?.description ? (
            <h6 className="text-secondary" style={{ fontSize: 10 }}>
              {playlist.description.toString().slice(0, 44)}
            </h6>
          ) : null} */}
          <Typography style={{ fontSize: 12 }}>
            {playlist.tracks.total} tracks
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default Playlist;
