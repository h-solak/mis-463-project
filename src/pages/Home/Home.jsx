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
import { Box, Button, Grid, Link, Tooltip } from "@mui/material";
import { setAccessToken } from "../../api/axiosConfig";
import Playlist from "./Playlist";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

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
        <>
          <div
            className="d-flex justify-content-center flex-column gap-2"
            style={{ width: "100%" }}
          >
            <div className="mt-2 d-flex flex- gap-3">
              <Link
                variant="button"
                className="btn-primary text-center bg-transparent"
                href={user?.external_urls?.spotify}
                target="_blank"
              >
                Visit Your Page
              </Link>
              <Button
                variant="contained"
                className=""
                onClick={() => navigate("/generator")}
              >
                Generate Playlists
              </Button>
              <Button
                variant="contained"
                className=""
                color="info"
                onClick={() => navigate("/shuffle")}
              >
                Shuffle Playlists
              </Button>
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
              >
                Analyze Playlists
              </Button>
            </div>
          </div>
          {user?.playlists ? (
            <div className="card-container mt-5" style={{ width: 600 }}>
              <Tooltip title="New playlist with 30 random songs">
                <Button
                  variant="contained"
                  onClick={() => handleCreateRandomPlaylist()}
                >
                  Create Random Playlist
                </Button>
              </Tooltip>
              <h6 className="text-secondary pt-3">
                Your playlists ({user?.playlists?.total})
              </h6>
              <Grid
                container
                className="d-flex flex-column align-items-start mt-4"
              >
                {user?.playlists?.items.map((playlist, index) => (
                  <Playlist playlist={playlist} key={index} />
                ))}
              </Grid>
            </div>
          ) : null}
        </>
      </main>
    </Layout>
  );
};

export default Home;
