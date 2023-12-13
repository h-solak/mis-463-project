import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import Playlist from "./Playlist";
import useUser from "../../contexts/user/useUser";
import { Box, Grid, Typography } from "@mui/material";
import LottiePageLoader from "../../assets/lottiePageLoader.json";
import { getPlaylists } from "../../services/user";
import Lottie from "lottie-react";

const Analyzer = () => {
  const { user, setUser } = useUser();
  const [isPlaylistLoading, setIsPlaylistLoading] = useState(true);

  const handleGetPlaylists = async () => {
    setIsPlaylistLoading(true);

    const playlists = await getPlaylists(user?.id);
    setUser({
      ...user,
      playlists: playlists,
    });
    setIsPlaylistLoading(false);
  };

  useEffect(() => {
    handleGetPlaylists();
  }, []);
  return (
    <Layout>
      <Grid container paddingBottom={4}>
        <Grid item xs={12} marginTop={2}>
          <Typography variant="h6" fontWeight={600} className="fade-in-ltr">
            Analyze
          </Typography>
          <Typography className="fade-in-rtl">
            Get ready to groove! Pick a playlist and let the magic happen with a
            single click – it's musical analysis made fun and easy!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container marginTop={0} spacing={2}>
            {isPlaylistLoading ? (
              <Lottie
                animationData={LottiePageLoader}
                loop={true}
                className="absolute-center"
                style={{
                  width: 200,
                }}
              />
            ) : (
              user?.playlists?.items?.map((playlist, index) => (
                <Playlist playlist={playlist} key={index} />
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Analyzer;
