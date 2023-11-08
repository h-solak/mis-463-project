import { Box, Grid } from "@mui/material";
import React from "react";

const Playlist = ({ playlist }) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      paddingX={1}
      paddingY={1}
      onClick={() => {
        window.open(playlist.external_urls.spotify, "_blank");
      }}
      className="default-hvr w-100"
      sx={{ cursor: "pointer" }}
    >
      <Box display={"flex"} alignItems={"center"} gap={2}>
        {playlist?.images ? (
          <img
            src={playlist?.images[0]?.url || "https://cataas.com/cat"}
            width={70}
            height={70}
            alt=""
          />
        ) : null}
        <div className="d-flex flex-column">
          <h6>{playlist.name}</h6>
          {playlist?.description ? (
            <h6 className="text-secondary" style={{ fontSize: 10 }}>
              {playlist.description}
            </h6>
          ) : null}
          <h6 className="text-secondary" style={{ fontSize: 14 }}>
            {playlist.tracks.total} tracks
          </h6>
        </div>
      </Box>
    </Grid>
  );
};

export default Playlist;
