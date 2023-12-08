import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Slider from "./Slider";

const BusinessButton = ({ children, onClick, isActive }) => {
  return (
    <Button
      variant={isActive ? "contained" : "outlined"}
      onClick={onClick}
      color={isActive ? "highlight" : "dark"}
      sx={{
        borderRadius: 99,
        borderWidth: 2,
        textTransform: "capitalize",
        paddingX: 4,
        fontWeight: 600,
        color: isActive ? "#fff" : "#000",
        "&:hover": {
          borderWidth: 2,
        },
      }}
      size="small"
    >
      {children}
    </Button>
  );
};

const cafeVectorPreset = {
  danceability: 37.4,
  energy: 70.1,
  acousticness: 55.8,
  valence: 69.4,
};
const barVectorPreset = {
  danceability: 76.9,
  energy: 84.6,
  acousticness: 58.2,
  valence: 80.2,
};
const clubVectorPreset = {
  danceability: 97.4,
  energy: 85.7,
  acousticness: 24.7,
  valence: 81.8,
};

const areVectorsEqual = (v1, v2) => {
  return JSON.stringify(v1) == JSON.stringify(v2);
};
const Vectors = ({ playlistVectors, setPlaylistVectors }) => {
  const [vectorType, setVectorType] = useState("Cafe");

  useEffect(() => {
    let newVectorType;
    switch (JSON.stringify(playlistVectors)) {
      case JSON.stringify(barVectorPreset):
        newVectorType = "Bar";
        break;
      case JSON.stringify(clubVectorPreset):
        newVectorType = "Club";
        break;
      case JSON.stringify(cafeVectorPreset):
        newVectorType = "Cafe";
        break;
      default:
        newVectorType = "Custom";
    }

    setVectorType(newVectorType);
  }, [playlistVectors]);
  useEffect(() => {
    console.log(playlistVectors);
  }, [playlistVectors]);

  return (
    <Grid item xs={12} md={6} marginTop={4} paddingX={5}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"start"}
        gap={4}
      >
        <Typography
          textAlign={"start"}
          variant="h3"
          color={"primary.main"}
          fontWeight={700}
        >
          {vectorType}
        </Typography>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <BusinessButton
            onClick={() => setPlaylistVectors(cafeVectorPreset)}
            isActive={areVectorsEqual(playlistVectors, cafeVectorPreset)}
          >
            Cafe
          </BusinessButton>
          <BusinessButton
            onClick={() => setPlaylistVectors(barVectorPreset)}
            isActive={areVectorsEqual(playlistVectors, barVectorPreset)}
          >
            Bar
          </BusinessButton>
          <BusinessButton
            onClick={() => setPlaylistVectors(clubVectorPreset)}
            isActive={areVectorsEqual(playlistVectors, clubVectorPreset)}
          >
            Club
          </BusinessButton>
          <button className="rainbow-btn">
            <span
              style={{
                backgroundImage:
                  vectorType == "Custom"
                    ? "linear-gradient(90deg,#00c0ff 0%,#ffcf00 49%,#fc4f4f 100%)"
                    : "none",
              }}
            >
              Create Your Own
            </span>
          </button>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          <Slider
            label={"Danceability"}
            value={playlistVectors.danceability}
            onChange={(e) =>
              setPlaylistVectors((oldVectors) => ({
                ...oldVectors,
                danceability: e.target.value,
              }))
            }
          />
          <Slider
            label={"Energy"}
            value={playlistVectors.energy}
            onChange={(e) =>
              setPlaylistVectors((oldVectors) => ({
                ...oldVectors,
                energy: e.target.value,
              }))
            }
          />
          <Slider
            label={"Acousticness"}
            value={playlistVectors.acousticness}
            onChange={(e) =>
              setPlaylistVectors((oldVectors) => ({
                ...oldVectors,
                acousticness: e.target.value,
              }))
            }
          />
          <Slider
            label={"Valence"}
            value={playlistVectors.valence}
            onChange={(e) =>
              setPlaylistVectors((oldVectors) => ({
                ...oldVectors,
                valence: e.target.value,
              }))
            }
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default Vectors;
