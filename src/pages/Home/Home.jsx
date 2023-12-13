import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import {
  SPOTIFY_AUTH_LINK,
  getCrrUser,
  getPlaylists,
} from "../../services/user";
import useUser from "../../contexts/user/useUser";
import Loader from "../../components/Loader";
import {
  Box,
  Button,
  Grid,
  Link,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { setAccessToken } from "../../api/axiosConfig";
import Playlist from "./Playlist";
import { createBusinessPlaylist } from "../../services/playlist";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [isPlaylistLoading, setIsPlaylistLoading] = useState(false);
  const isSmScreen = useMediaQuery("(max-width:900px)");

  const handleCreateRandomPlaylist = async () => {
    await createRandomPlaylist(user?.id, "TuneMix Random Playlist");
    const playlists = await getPlaylists(user?.id);
    setUser({
      ...user,
      playlists: playlists,
    });
  };

  return (
    <Layout>
      <Box paddingBottom={4}>
        {user?.playlists ? (
          <Grid container>
            <Grid item xs={12} marginTop={2}>
              <Typography variant="h6" fontWeight={600} className="fade-in-ltr">
                Playlists
              </Typography>
              <Typography className="fade-in-rtl">
                Tap into the tunes! Click on the playlist to journey straight to
                your Spotify library.
              </Typography>
            </Grid>
            <Grid container marginTop={0} spacing={2}>
              {user?.playlists?.items.map((playlist, index) => (
                <Playlist playlist={playlist} key={index} />
              ))}
            </Grid>
          </Grid>
        ) : null}
      </Box>
    </Layout>
  );
};

export default Home;
