import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import TunemixLogo from "../../assets/pngLogo.png";
const Playlist = ({ playlist }) => {
  const isTunemixGenerated = playlist?.name?.includes("Tunemix");
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
          position: "relative",
          backgroundColor: "",
          borderRadius: "64px",
          backgroundColor: isTunemixGenerated
            ? "primary.main"
            : "secondary.light",
          "&:hover": {
            backgroundColor: isTunemixGenerated
              ? "highlight.main"
              : "#00000020",
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
          <Typography
            fontSize={14}
            fontWeight={600}
            color={isTunemixGenerated ? "#fff" : ""}
          >
            {playlist.name}
          </Typography>
          {/* {playlist?.description ? (
            <h6 className="text-secondary" style={{ fontSize: 10 }}>
              {playlist.description.toString().slice(0, 44)}
            </h6>
          ) : null} */}
          <Typography
            style={{ fontSize: 12 }}
            color={isTunemixGenerated ? "#fff" : ""}
          >
            {playlist.tracks.total} tracks
          </Typography>
        </Box>
        {isTunemixGenerated && (
          <img
            src={TunemixLogo}
            width={100}
            alt="logo"
            style={{
              position: "absolute",
              left: "80%",
              bottom: -4,
              transform: "translateX(-50%)",
              background: "#fff",
              borderRadius: 99,
            }}
          />
        )}
      </Box>
    </Grid>
  );
};

export default Playlist;
