import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { getPlaylistAudioFeatures } from "../../services/analyzer";
import Modal from "../../components/Modal";
import { BarChart } from "@mui/x-charts/BarChart";
import toast from "react-hot-toast";
import TunemixLogo from "../../assets/pngLogo.png";

const Playlist = ({ playlist }) => {
  const isSmScreen = useMediaQuery("(max-width:900px)");

  const isTunemixGenerated = playlist?.name?.includes("Tunemix");

  const [displayAnalyze, setDisplayAnalyze] = useState(false);
  const [audioFeatures, setAudioFeatures] = useState(null);
  const [chartData, setChartData] = useState([]);
  const handleAnalyze = async (playlistId) => {
    if (playlist?.tracks?.total <= 50) {
      const res = await getPlaylistAudioFeatures(playlistId);
      if (res) {
        setAudioFeatures(res);
        setDisplayAnalyze(true);
        handleChartData(res);
        //valence, energy, acousticness, danceability
      }
    } else {
      toast.error("The playlist shouldn't contain more than 50 songs!");
    }
  };

  const handleChartData = (res) => {
    let valence = 0;
    let energy = 0;
    let acousticness = 0;
    let danceability = 0;
    const totalTracks = playlist?.tracks?.total;

    res?.map((item) => {
      valence += item.valence;
      energy += item.energy;
      acousticness += item.acousticness;
      danceability += item.danceability;
    });

    valence /= totalTracks;
    energy /= totalTracks;
    acousticness /= totalTracks;
    danceability /= totalTracks;

    setChartData([
      {
        name: "Dance",
        value: danceability,
      },
      {
        name: "Energy",
        value: energy,
      },

      {
        name: "Acoust",
        value: acousticness,
      },
      {
        name: "Happy",
        value: valence,
      },
    ]);
  };

  return (
    <Grid item xs={12} sm={6} md={4} sx={{ cursor: "pointer" }}>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={2}
        paddingRight={2}
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
        onClick={() => handleAnalyze(playlist?.id)}
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
              left: "90%",
              bottom: -6,
              transform: "translateX(-50%)",
              background: "#fff",
              borderRadius: 8,
            }}
          />
        )}
      </Box>

      {chartData?.length > 0 ? (
        <Modal isModalOpen={displayAnalyze} setIsModalOpen={setDisplayAnalyze}>
          <Typography
            textAlign={isSmScreen ? "center" : "start"}
            width={"100%"}
          >
            <b>Analyzed Playlist: </b>
            {playlist?.name}
          </Typography>
          <BarChart
            dataset={chartData}
            yAxis={[{ scaleType: "band", dataKey: "name" }]}
            series={[{ dataKey: "value" }]}
            layout="horizontal"
            width={isSmScreen ? 300 : 600}
            height={isSmScreen ? 200 : 400}
            sx={{
              fillShadowGradient: "#ff0000",
            }}
            colors={["#15A649"]}
          />
        </Modal>
      ) : null}
    </Grid>
  );
};

export default Playlist;
