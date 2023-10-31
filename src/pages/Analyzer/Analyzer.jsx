import React from "react";
import Layout from "../../layout/Layout";
import Playlist from "./Playlist";
import useUser from "../../contexts/user/useUser";
import { Box } from "@mui/material";

const Analyzer = () => {
  const { user, setUser } = useUser();
  return (
    <Layout>
      <Box paddingX={4} paddingY={2}>
        <h4>Playlist Analyzer</h4>
        {user?.playlists?.items.map((playlist, index) => (
          <Playlist playlist={playlist} key={index} />
        ))}
      </Box>
    </Layout>
  );
};

export default Analyzer;
