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
      <main className="p-4">
        {user?.playlists ? (
          <Grid container className="card-container mt-4">
            <Grid item xs={12}>
              <Typography color={"secondary.main"} fontWeight={500}>
                Your playlists ({user?.playlists?.total})
              </Typography>
            </Grid>
            <Grid container className="mt-4">
              {user?.playlists?.items.map((playlist, index) => (
                <Playlist playlist={playlist} key={index} />
              ))}
            </Grid>
          </Grid>
        ) : null}
      </main>
    </Layout>
  );
};

export default Home;
