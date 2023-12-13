import React from "react";
import Layout from "../../layout/Layout";
import Playlist from "./Playlist";
import useUser from "../../contexts/user/useUser";
import { Box, Grid, Typography } from "@mui/material";

const Analyzer = () => {
  const { user, setUser } = useUser();
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
            {user?.playlists?.items.map((playlist, index) => (
              <Playlist playlist={playlist} key={index} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Analyzer;
