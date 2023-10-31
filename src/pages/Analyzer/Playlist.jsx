import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { getPlaylistAudioFeatures } from "../../services/analyzer";
import Modal from "../../components/Modal";
import { BarChart } from "@mui/x-charts/BarChart";
import toast from "react-hot-toast";
const Playlist = ({ playlist }) => {
  const isSmScreen = useMediaQuery("(max-width:900px)");

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
        //acousticness, danceability, instrumentalness, liveness
      }
    } else {
      toast.error("The playlist shouldn't contain more than 50 songs!");
    }
  };

  const handleChartData = (res) => {
    let acousticness = 0;
    let danceability = 0;
    let instrumentalness = 0;
    let liveness = 0;
    const totalTracks = playlist?.tracks?.total;

    res?.map((item) => {
      acousticness += item.acousticness;
      danceability += item.danceability;
      instrumentalness += item.instrumentalness;
      liveness += item.liveness;
    });

    console.log("aa", acousticness, danceability, instrumentalness, liveness);

    acousticness /= totalTracks;
    danceability /= totalTracks;
    instrumentalness /= totalTracks;
    liveness /= totalTracks;

    setChartData([
      {
        name: "Acstc",
        value: acousticness,
      },
      {
        name: "Dance",
        value: danceability,
      },
      {
        name: "Instr",
        value: instrumentalness,
      },
      {
        name: "Live",
        value: liveness,
      },
    ]);
  };

  return (
    <Grid
      item
      paddingX={1}
      paddingY={1}
      className="w-100"
      sx={{ cursor: "pointer" }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Button
            variant="contained"
            color="primary"
            height={70}
            onClick={() => handleAnalyze(playlist?.id)}
          >
            <QueryStatsIcon />
          </Button>

          {playlist?.images ? (
            <img
              src={playlist?.images[0]?.url || "https://cataas.com/cat"}
              width={50}
              height={50}
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
          />
        </Modal>
      ) : null}
    </Grid>
  );
};

export default Playlist;
