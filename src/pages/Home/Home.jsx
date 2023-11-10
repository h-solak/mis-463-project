import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import {
  SPOTIFY_AUTH_LINK,
  createRandomPlaylist,
  getCrrUser,
  getPlaylists,
} from "../../services/user";
import useUser from "../../contexts/user/useUser";
import Loader from "../../components/Loader";
import { Box, Button, Grid, Link, Tooltip, useMediaQuery } from "@mui/material";
import { setAccessToken } from "../../api/axiosConfig";
import Playlist from "./Playlist";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [isRandomPlaylistLoading, setIsRandomPlaylistLoading] = useState(false);
  const isSmScreen = useMediaQuery("(max-width:900px)");

  const handleCreateRandomPlaylist = async () => {
    setIsRandomPlaylistLoading(true);
    await createRandomPlaylist(user?.id, "TuneMix Random Playlist");
    const playlists = await getPlaylists(user?.id);
    setUser({
      ...user,
      playlists: playlists,
    });
    setIsRandomPlaylistLoading(false);
  };
  return (
    <Layout>
      <main className="p-4">
        <>
          <Grid container>
            <Grid
              item
              xs={12}
              md={3}
              marginY={isSmScreen ? 0.6 : 0}
              paddingRight={isSmScreen ? 0 : 2}
            >
              {" "}
              <Button
                variant="outlined"
                sx={{ borderColor: "secondary.main" }}
                fullWidth
              >
                <Link
                  variant="inherit"
                  href={user?.external_urls?.spotify}
                  target="_blank"
                  sx={{ color: "#000" }}
                >
                  Visit Your Page
                </Link>
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              marginY={isSmScreen ? 0.6 : 0}
              paddingRight={isSmScreen ? 0 : 2}
            >
              {" "}
              <Button
                variant="contained"
                className=""
                onClick={() => navigate("/generator")}
                fullWidth
              >
                Generate Playlists
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              marginY={isSmScreen ? 0.6 : 0}
              paddingRight={isSmScreen ? 0 : 2}
            >
              <Button
                variant="contained"
                className=""
                color="info"
                onClick={() => navigate("/shuffle")}
                fullWidth
              >
                Shuffle Playlists
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              marginY={isSmScreen ? 0.6 : 0}
              paddingLeft={isSmScreen ? 0 : 0}
            >
              <Button
                variant="contained"
                className=""
                color="inherit"
                sx={{
                  backgroundColor: "#e0ad04",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#a88205",
                  },
                }}
                onClick={() => navigate("/playlist-analyzer")}
                fullWidth
              >
                Analyze Playlists
              </Button>
            </Grid>
          </Grid>
          {user?.playlists ? (
            <Grid container className="card-container mt-4">
              <Grid item xs={12}>
                <Tooltip title="New playlist with 30 random songs">
                  <Button
                    variant="contained"
                    onClick={() => handleCreateRandomPlaylist()}
                    disabled={isRandomPlaylistLoading ? true : false}
                  >
                    Create Random Playlist
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <h6 className="text-secondary pt-3">
                  Your playlists ({user?.playlists?.total})
                </h6>
              </Grid>
              <Grid container className="mt-4">
                {user?.playlists?.items.map((playlist, index) => (
                  <Playlist playlist={playlist} key={index} />
                ))}
              </Grid>
            </Grid>
          ) : null}
        </>
      </main>
    </Layout>
  );
};

export default Home;
