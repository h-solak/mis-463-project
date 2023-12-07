import React from "react";
import { SPOTIFY_AUTH_LINK } from "../services/user";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import ActionButton from "./base/ActionButton";
import { LandingCasettes, Soundwaves } from "../assets/images";

const Landing = () => {
  const isSmScreen = useMediaQuery("(max-width:900px)");

  return (
    <Grid container className="">
      <Grid
        item
        md={5}
        paddingX={4}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"start"}
        gap={4}
        height={"calc(100vh - 250px)"}
      >
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Typography variant="h3" fontWeight={600}>
            Generate the perfect playlist with{" "}
            <Typography
              component={"span"}
              color={"primary.main"}
              variant="h3"
              fontWeight={600}
            >
              TuneMix
            </Typography>
          </Typography>
          <Typography fontWeight={500}>
            Need some popular tunes to dance or atmospheric songs for a cafe? We
            got you!
          </Typography>
        </Box>
        <ActionButton
          onClick={() => (window.location.href = SPOTIFY_AUTH_LINK)}
        >
          Login With Spotify
        </ActionButton>
      </Grid>
      <Grid
        item
        md={7}
        paddingX={4}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"end"}
        height={"calc(100vh - 250px)"}
      >
        <Box position={"relative"}>
          <img src={LandingCasettes} width={400} alt="casettes" />
        </Box>
      </Grid>
      {!isSmScreen && (
        <Grid
          item
          md={12}
          display={"flex"}
          alignItems={"center"}
          sx={{
            overflow: "hidden",
          }}
        >
          <img
            src={Soundwaves}
            width={"50%"}
            alt="soundwaves"
            style={{
              maxHeight: 90,
            }}
          />
          <img
            src={Soundwaves}
            width={"50%"}
            alt="soundwaves"
            style={{
              maxHeight: 90,
              marginLeft: "-36px",
            }}
          />
          <img
            src={Soundwaves}
            width={"50%"}
            alt="soundwaves"
            style={{
              maxHeight: 90,
              marginLeft: "-36px",
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Landing;
