import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import Loader from "../../components/Loader";
import useUser from "../../contexts/user/useUser";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
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
  const [pageBg, setPageBg] = useState("#fff");
  const [playlistVectors, setPlaylistVectors] = useState(cafeVectorPreset);
  /*
  Defaults
   {'cafe': [0.374, 0.701, 0.558, 0.694], 
    "'bar': [0.769, 0.846, 0.582, 0.802],
    'club': [0.974, 0.857, 0.247, 0.818]"}
  */

  const handleCreateBusinessPlaylist = async (userId, businessType) => {
    setCrrStep(1);
    const playlistId = await createBusinessPlaylist(userId, businessType);
    const newPlaylist = await getPlaylist(playlistId);
    setGeneratedPlaylist(newPlaylist);
    console.log("yeni", newPlaylist);
    newPlaylist?.items?.map((item) =>
      console.log(item?.track?.name, " - ", item?.track?.artists[0].name)
    );
    // const playlists = await getPlaylists(user?.id); //refresh all playlists
    // setUser({
    //   ...user,
    //   playlists: playlists,
    // });
    setCrrStep(2);
  };

  useEffect(() => {
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
      <main style={{ background: pageBg }}>
        {crrStep == 0 ? (
          <Grid container>
            <Vectors
              playlistVectors={playlistVectors}
              setPlaylistVectors={setPlaylistVectors}
            />
            <Grid
              item
              md={12}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <ActionButton
                variant="contained"
                onClick={() => {
                  handleCreateBusinessPlaylist(user?.id, "club");
                }}
                fontSize={16}
              >
                Generate Playlist
              </ActionButton>
            </Grid>
          </Grid>
        ) : crrStep == 1 ? (
          <>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              gap={1}
              className={`fade-in-rtl`}
            >
              <Typography textAlign={"center"} fontWeight={600}>
                Your playlist is on the way!
              </Typography>
              <Lottie
                animationData={LottieLoading}
                loop={true}
                style={{
                  height: 150,
                  width: 150,
                }}
              />
              <Typography textAlign={"center"}>
                Good tunes take time :)
              </Typography>
            </Box>
          </>
        ) : (
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={1}
            paddingX={5}
          >
            <Typography fontWeight={600}>
              Your playlist is saved to your spotify library!
            </Typography>
            <img
              src={generatedPlaylist.images[0]?.url}
              width={150}
              height={150}
              alt=""
            />
            <Typography>{generatedPlaylist?.name}</Typography>
            <Link
              href={generatedPlaylist?.external_urls?.spotify}
              target="_blank"
            >
              <Button
                variant="outlined"
                sx={{
                  color: "#1ED760",
                  borderColor: "#1ED760",
                  "&:hover": {
                    borderColor: "#1ED760",
                    backgroundColor: "#00000005",
                  },
                }}
                startIcon={<img src={SpotifyLogo} width={25} />}
              >
                Check it out
              </Button>
            </Link>
          </Box>
        )}
      </main>
    </Layout>
  );
};

export default Generator;

/*

<Grid
                container
                sx={{ backgroundColor: "red", minHeight: 400, minWidth: 400 }}
              >
                {generatedPlaylist?.items?.map((item) => {
                  <Grid
                    item
                    xs={12}
                    md={3}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <img
                      src={item?.track?.album?.images[0]?.url}
                      width={50}
                      height={50}
                      alt=""
                    />
                    <h6>{item?.track?.artists[0]?.name}</h6>
                    <h6>{item?.track?.name}</h6>
                  </Grid>;
                })}
              </Grid>
*/
