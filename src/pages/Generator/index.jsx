import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import Loader from "../../components/Loader";
import useUser from "../../contexts/user/useUser";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { createBusinessPlaylist } from "../../services/playlist";
import { getPlaylists } from "../../services/user";
import { getPlaylist } from "../../services/tracks";
import LottieCelebrate from "../../assets/lottieCelebrate.json";
import LottieLoading from "../../assets/lottieLoading.json";
import Lottie from "lottie-react";
import Modal from "../../components/Modal";
import SpotifyLogo from "../../assets/spotify.svg";
import Vectors from "./Vectors";
import ActionButton from "../../components/base/ActionButton";
import FilterForm from "./FilterForm";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import HistoryIcon from "@mui/icons-material/History";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copyToClipboard from "../../utils/copyToClipboard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import CafeVectorSvg from "../../assets/svg/cafeVector.svg";
import BarVectorSvg from "../../assets/svg/barVector.svg";
import ClubVectorSvg from "../../assets/svg/clubVector.svg";
import YourownVectorSvg from "../../assets/svg/yourownVector.svg";
import GenrePieChart from "./GenrePieChart";
import VectorDistribution from "./VectorDistribution";
import { ScatterChart } from "@mui/x-charts";
import CloseIcon from "@mui/icons-material/Close";

function areObjectsEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

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

const Generator = () => {
  const { user, setUser } = useUser();
  const [crrStep, setCrrStep] = useState(0); //0-> form, 1-> loading/generating, 2-> completed playlist
  const [generatedPlaylist, setGeneratedPlaylist] = useState({});
  const [tableData, setTableData] = useState({});
  const [chartsModal, setChartsModal] = useState(false);

  /*
  array of obj
   {
    "Unnamed: 0":5071333,
    "track_id":"5IJhLYBgah78GpBU66RJyx",
    "artist_id":"3EysZz5xY5jXl3HiDmwBof",
    "genre":"Rock",
    "popularity":0,
    "duration":142,
    "time_signature":4,
    "key":1,
    "tempo":137,
    "mode":1,
    "loudness":-5.414,
    "speechiness":0.038,
    "instrumentalness":0.63,
    "liveness":0.1,
    "explicit":0,
    "danceability":0.543,
    "energy":0.915,
    "acousticness":0.451,
    "valence":0.895
  },
  
  */
  const [celebrationIsPlaying, setCelebrationIsPlaying] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [activeSvg, setActiveSvg] = useState(CafeVectorSvg);
  const [playlistVectors, setPlaylistVectors] = useState(cafeVectorPreset);
  const [filterForm, setFilterForm] = useState({
    popularity: "None",
    timeSignature: [3, 4, 5],
    key: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    mode: "None",
    // explicit: "None",
    speechy: "no",
    instrumental: "None",
    live: "None",
    numberOfTracks: "None", //default: 30
    customerChoiceGenres: true, //if this is disabled, customerChoiceGenres is enabled
    genres: [
      "Rock",
      "Pop",
      "Metal",
      "Hip Hop",
      "Electronic",
      "Latin",
      "World/Traditional",
      "Jazz",
      "R&B",
      "Blues",
      "Easy Listening",
      "Classical",
      "Folk/Acoustic",
      "Country",
      "New Age",
    ],
  });

  useEffect(() => {
    if (isLinkCopied) {
      setTimeout(() => setIsLinkCopied(false), 400);
    }
  }, [isLinkCopied]);

  /*
  Defaults
   {'cafe': [0.374, 0.701, 0.558, 0.694], 
    "'bar': [0.769, 0.846, 0.582, 0.802],
    'club': [0.974, 0.857, 0.247, 0.818]"}
  */
  const isSmScreen = useMediaQuery("(max-width:900px)");

  const handleCreateBusinessPlaylist = async (userId) => {
    setCrrStep(1);
    const res = await createBusinessPlaylist(
      userId,
      playlistVectors,
      filterForm
    );
    const playlistId = res?.playlistId;
    //similarities: [cafe,bar,club]
    const similarities = res?.similarity;
    setTableData(res?.tableData);
    const newPlaylist = await getPlaylist(playlistId);
    setGeneratedPlaylist({
      playlist: newPlaylist,
      similarities: similarities,
    });
    setCrrStep(2);
    setCelebrationIsPlaying(true);
  };

  useEffect(() => {
    if (celebrationIsPlaying) {
      setTimeout(() => {
        setCelebrationIsPlaying(false);
      }, 1500);
    }
  }, [celebrationIsPlaying]);
  useEffect(() => {
    //JSON kullanmazsan olmaz bu
    if (areObjectsEqual(playlistVectors, cafeVectorPreset)) {
      setActiveSvg(CafeVectorSvg);
    } else if (areObjectsEqual(playlistVectors, barVectorPreset)) {
      setActiveSvg(BarVectorSvg);
    } else if (areObjectsEqual(playlistVectors, clubVectorPreset)) {
      setActiveSvg(ClubVectorSvg);
    } else {
      setActiveSvg(YourownVectorSvg);
    }
  }, [playlistVectors]);
  return (
    <Layout>
      {/* <main className="" style={{ background: pageBg }}> */}
      {crrStep == 0 ? (
        <Grid container>
          <Vectors
            playlistVectors={playlistVectors}
            setPlaylistVectors={setPlaylistVectors}
            activeIcon={activeSvg}
            setFilterForm={setFilterForm}
          />
          <FilterForm filterForm={filterForm} setFilterForm={setFilterForm} />
          <Grid
            item
            md={12}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            height={"72px"}
          >
            <Grid container>
              {/* <Grid item xs={12} md={4} display={"flex"} alignItems={"center"}>
                <Tooltip title="Playlist History">
                  <IconButton>
                    <HistoryIcon />
                  </IconButton>
                </Tooltip>
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                      border: 2,
                      fontWeight: 600,
                      borderRadius: 99,
                      textTransform: "capitalize",
                    }}
                  >
                    Reset
                  </Button>
              </Grid> */}
              <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                <ActionButton
                  variant="contained"
                  onClick={() => {
                    handleCreateBusinessPlaylist(user?.id);
                  }}
                  fontSize={20}
                  sx={{
                    maxHeight: "54px",
                  }}
                >
                  Generate Playlist
                </ActionButton>
              </Grid>
              <Grid item sm={4}></Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : crrStep == 1 ? (
        <>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            textAlign={"center"}
            className={"absolute-fade-in-ltr absolute-center"}
            sx={{
              height: "100%",
            }}
          >
            <Box marginBottom={-10}>
              <Typography textAlign={"center"} variant="h6" fontWeight={600}>
                Your playlist is on the way!
              </Typography>
            </Box>

            <Lottie
              animationData={LottieLoading}
              loop={true}
              style={{
                width: 350,
              }}
            />
            <Box marginTop={-8}>
              <Typography textAlign={"center"}>
                Good tunes take time :)
              </Typography>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          textAlign={"center"}
          paddingY={4}
        >
          {celebrationIsPlaying && (
            <div className="absolute-center">
              <Lottie
                animationData={LottieCelebrate}
                loop={true}
                style={{
                  height: 400,
                  width: 650,
                }}
              />
            </div>
          )}

          <Grid container>
            <Grid
              item
              xs={12}
              md={12}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={1}
            >
              <Typography variant="h4" fontWeight={700} className="fade-in-ltr">
                Your playlist is{" "}
                <Typography
                  component="span"
                  color={"primary.main"}
                  variant="h4"
                  fontWeight={700}
                >
                  READY!
                </Typography>
                {/* <span style={{ fontSize: 40 }}>😼</span> */}
              </Typography>
              <Typography fontWeight={500} className="fade-in-rtl">
                Ta-da! Your playlist is now living its best life in your Spotify
                library.
                {/* <br /> Hit play and enjoy the music! */}
              </Typography>
            </Grid>

            <Grid container marginTop={0} spacing={4}>
              <Grid
                item
                xs={12}
                md={6}
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                <iframe
                  className="opening-animation"
                  style={{ borderRadius: "12px" }}
                  src={
                    generatedPlaylist?.playlist?.external_urls?.spotify.slice(
                      0,
                      25
                    ) +
                    "embed/" +
                    generatedPlaylist?.playlist?.external_urls?.spotify.slice(
                      25
                    ) +
                    "?utm_source=generator"
                  }
                  //hard-code for testing src="https://open.spotify.com/embed/playlist/0oQzDq2uup55SiP43mYBXj?utm_source=generator"
                  width={"100%"}
                  height="380"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                display={"flex"}
                alignItems={"start"}
                justifyContent={"space-around"}
                flexDirection={"column"}
                sx={{
                  textOverflow: "ellipsis",
                }}
              >
                {generatedPlaylist?.similarities && (
                  <>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        textAlign={"start"}
                      >
                        {Math.max(...generatedPlaylist?.similarities) * 100 >
                        86 ? (
                          <>
                            Your playlist resembles a{" "}
                            <Typography
                              component={"span"}
                              variant="h6"
                              fontWeight={600}
                              color={"highlight.main"}
                            >
                              {Math.max(...generatedPlaylist?.similarities) ==
                              generatedPlaylist?.similarities[0]
                                ? "CAFE"
                                : Math.max(
                                    ...generatedPlaylist?.similarities
                                  ) == generatedPlaylist?.similarities[1]
                                ? "BAR"
                                : "CLUB"}{" "}
                            </Typography>
                            playlist by{" "}
                            {(
                              Math.max(...generatedPlaylist?.similarities) * 100
                            ).toFixed(1)}
                            %
                          </>
                        ) : (
                          <>
                            Your playlist is exceptional and{" "}
                            <Typography
                              component={"span"}
                              variant="h6"
                              fontWeight={700}
                              color={"highlight.main"}
                            >
                              UNIQUE!
                            </Typography>{" "}
                          </>
                        )}
                      </Typography>
                    </Box>
                    <Grid
                      container
                      display={"flex"}
                      alignItems={"center"}
                      gap={8}
                    >
                      <Box
                        display={"flex"}
                        alignItems={"start"}
                        flexDirection={"column"}
                        gap={2}
                        className="fade-in-ltr"
                      >
                        <Box
                          padding={1}
                          paddingLeft={2}
                          width={`calc(50px + ${
                            300 * generatedPlaylist?.similarities[0]
                          }px)`}
                          sx={{
                            backgroundColor: "dark.main",
                            color: "light.main",
                          }}
                          textAlign={"start"}
                        >
                          <Typography variant="h6">
                            Cafe{" "}
                            {`${(
                              generatedPlaylist?.similarities[0] * 100
                            ).toFixed(1)}%`}
                          </Typography>
                        </Box>
                        <Box
                          padding={1}
                          paddingLeft={2}
                          width={`calc(50px + ${
                            300 * generatedPlaylist?.similarities[1]
                          }px)`}
                          sx={{
                            backgroundColor: "dark.main",
                            color: "light.main",
                          }}
                          textAlign={"start"}
                        >
                          <Typography variant="h6">
                            Bar{" "}
                            {`${(
                              generatedPlaylist?.similarities[1] * 100
                            ).toFixed(1)}%`}
                          </Typography>
                        </Box>
                        <Box
                          padding={1}
                          paddingLeft={2}
                          width={`calc(50px + ${
                            300 * generatedPlaylist?.similarities[2]
                          }px)`}
                          sx={{
                            backgroundColor: "dark.main",
                            color: "light.main",
                          }}
                          textAlign={"start"}
                        >
                          <Typography variant="h6">
                            Club{" "}
                            {`${(
                              generatedPlaylist?.similarities[2] * 100
                            ).toFixed(1)}%`}
                          </Typography>
                        </Box>
                      </Box>
                      <img
                        src={
                          Math.max(...generatedPlaylist?.similarities) * 100 <
                          86
                            ? YourownVectorSvg
                            : Math.max(...generatedPlaylist?.similarities) ==
                              generatedPlaylist?.similarities[0]
                            ? CafeVectorSvg
                            : Math.max(...generatedPlaylist?.similarities) ==
                              generatedPlaylist?.similarities[1]
                            ? BarVectorSvg
                            : ClubVectorSvg
                        }
                        width={100}
                        height={100}
                        alt="business"
                        style={{
                          padding: 12,
                          backgroundColor: "#f2f2f2",
                          borderRadius: 99,
                        }}
                      />
                    </Grid>
                  </>
                )}
                <Grid
                  item
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"start"}
                  gap={1}
                  paddingY={1}
                  paddingX={2}
                  sx={{
                    backgroundColor: "secondary.light",
                    borderRadius: 4,
                  }}
                  className="opening-animation"
                >
                  <Typography
                    color={"#757575"}
                    sx={{
                      textOverflow: "ellipsis",
                      zIndex: 10,
                    }}
                  >
                    {generatedPlaylist?.playlist?.external_urls?.spotify}
                    {/* dummy https://open.spotify.com/playlist/5DMGtKA5Ayh5AibHFNFgNFSDAFDASFADSFSFSDFDAS */}
                  </Typography>
                  <IconButton
                    color={"highlight"}
                    variant="contained"
                    onClick={() => {
                      copyToClipboard(
                        generatedPlaylist?.playlist?.external_urls?.spotify
                      );
                      setIsLinkCopied(true);
                    }}
                    sx={{
                      borderRadius: 99,
                      fontWeight: 600,
                      color: "white",
                    }}
                  >
                    {/* Copy Link */}
                    {isLinkCopied ? (
                      <CheckCircleIcon
                        sx={{
                          color: "dark.main",
                        }}
                      />
                    ) : (
                      <ContentCopyIcon
                        sx={{
                          color: "dark.main",
                        }}
                      />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid container marginTop={3} alignItems={"center"}>
              <Grid
                item
                xs={12}
                textAlign={"center"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={1}
              >
                <Button
                  color="highlight"
                  variant="contained"
                  size="large"
                  onClick={() => {
                    setCrrStep(0);
                    setGeneratedPlaylist({});
                  }}
                  fontSize={20}
                  sx={{
                    color: "#fff",
                    borderRadius: 999,
                    width: 200,
                  }}
                >
                  New Playlist
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setChartsModal(true)}
                  sx={{
                    background: "#000",
                    borderRadius: 99,
                    width: 200,
                  }}
                >
                  Analyze
                </Button>
              </Grid>
              <Modal isModalOpen={chartsModal} setIsModalOpen={setChartsModal}>
                <Box height={"85vh"}>
                  <Grid
                    item
                    xs={12}
                    paddingBottom={2}
                    sx={{
                      borderBottom: 2,
                      borderColor: "#00000020",
                    }}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Typography variant="h5" fontWeight={600}>
                      {generatedPlaylist?.playlist?.name}
                    </Typography>
                    <IconButton onClick={() => setChartsModal(false)}>
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                  {tableData && (
                    <Box
                      height={"75vh"}
                      width={"50vw"}
                      sx={{
                        overflowY: "scroll",
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        paddingBottom={1}
                        marginTop={4}
                        id="vector-distributions"
                      >
                        <Typography variant="h6" fontWeight={600}>
                          Vector Averages
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        {/* <Typography>Vector Distributions</Typography> */}
                        <VectorDistribution
                          data={tableData?.map((item) => ({
                            danceability: item?.danceability,
                            energy: item?.energy,
                            acousticness: item?.acousticness,
                            valence: item?.valence,
                          }))}
                          resemble={
                            Math.max(...generatedPlaylist?.similarities) * 100 <
                            86
                              ? ""
                              : Math.max(...generatedPlaylist?.similarities) ==
                                generatedPlaylist?.similarities[0]
                              ? "Cafe"
                              : Math.max(...generatedPlaylist?.similarities) ==
                                generatedPlaylist?.similarities[1]
                              ? "Bar"
                              : "Club"
                          }
                        />
                      </Grid>
                      <Grid item xs={12} paddingY={1} marginTop={4}>
                        <Typography variant="h6" fontWeight={600}>
                          Genre Distributions of your playlist
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        display={"flex"}
                        justifyContent={"center"}
                        textAlign={"center"}
                      >
                        <GenrePieChart
                          data={tableData?.map((item) => ({
                            id: item?.track_id,
                            genre: item?.genre,
                          }))}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        paddingTop={4}
                        marginTop={4}
                        paddingBottom={1}
                        id="vector-distributions"
                      >
                        <Typography variant="h6" fontWeight={600}>
                          Scatter Plot
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        display={"flex"}
                        justifyContent={"center"}
                        textAlign={"center"}
                      >
                        <ScatterChart
                          data={tableData?.map((item) => ({
                            x: item?.popularity,
                            y: item?.energy,
                          }))}
                          width={600}
                          height={300}
                          series={[
                            {
                              label: "(Danceability, Energy)",
                              data: tableData?.map((item) => ({
                                x: item?.danceability,
                                y: item?.energy,
                              })),
                            },
                          ]}
                        />
                      </Grid>
                    </Box>
                  )}
                </Box>
              </Modal>
            </Grid>
          </Grid>
        </Box>
      )}
      {/* </main> */}
    </Layout>
  );
};

export default Generator;
