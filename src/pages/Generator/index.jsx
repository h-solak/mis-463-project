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
  const [celebrationIsPlaying, setCelebrationIsPlaying] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [pageBg, setPageBg] = useState("#fff");
  const [playlistVectors, setPlaylistVectors] = useState(cafeVectorPreset);
  const [filterForm, setFilterForm] = useState({
    popularity: "None",
    timeSignature: [3, 4, 5, 7],
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
      "Jazz",
      "R&B",
      "Blues",
      "Easy Listening",
      "Classical",
      "Folk/Acoustic",
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
    const playlistId = await createBusinessPlaylist(
      userId,
      playlistVectors,
      filterForm
    );
    const newPlaylist = await getPlaylist(playlistId);
    setGeneratedPlaylist(newPlaylist);
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
    if (playlistVectors == cafeVectorPreset) {
      setPageBg("#fff");
    } else if (playlistVectors == barVectorPreset) {
      setPageBg("#f5f5f5");
    } else if (playlistVectors == clubVectorPreset) {
      setPageBg("#ededed");
    } else {
      setPageBg("#fff");
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
          justifyContent={"space-around"}
          textAlign={"center"}
          height={"calc(100vh - 76px)"}
          gap={1}
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
              sm={12}
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
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={1}
                paddingY={1}
                paddingX={2}
                sx={{
                  backgroundColor: "secondary.light",
                  borderRadius: 4,
                }}
                className="opening-animation"
              >
                <Typography color={"#757575"} sx={{ zIndex: 10 }}>
                  {generatedPlaylist?.external_urls?.spotify}
                </Typography>
                <Button
                  color={"highlight"}
                  variant="contained"
                  startIcon={
                    isLinkCopied ? <CheckCircleIcon /> : <ContentCopyIcon />
                  }
                  onClick={() => {
                    copyToClipboard(generatedPlaylist?.external_urls?.spotify);
                    setIsLinkCopied(true);
                  }}
                  sx={{
                    borderRadius: 99,
                    textTransform: "capitalize",
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  Copy Link
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              sm={12}
              md={12}
              marginTop={2}
              className="opening-animation"
            >
              <iframe
                style={{ borderRadius: "12px" }}
                src={
                  generatedPlaylist?.external_urls?.spotify.slice(0, 25) +
                  "embed/" +
                  generatedPlaylist?.external_urls?.spotify.slice(25) +
                  "?utm_source=generator"
                }
                width={isSmScreen ? "100%" : "75%"}
                height="360"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </Grid>
            <Grid item sm={12} marginTop={2}>
              <ActionButton
                variant="contained"
                onClick={() => {
                  setCrrStep(0);
                  setGeneratedPlaylist({});
                }}
                fontSize={20}
                sx={{
                  maxHeight: "54px",
                }}
              >
                New Playlist
              </ActionButton>
            </Grid>
          </Grid>
        </Box>
      )}
      {/* </main> */}
    </Layout>
  );
};

export default Generator;
