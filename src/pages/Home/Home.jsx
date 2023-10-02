import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import { SPOTIFY_AUTH_LINK, getCrrUser } from "../../services/auth";
import useUser from "../../contexts/user/useUser";
import Loader from "../../components/Loader";
import { Box, Button, Link } from "@mui/material";
import { setAccessToken } from "../../api/axiosConfig";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(new Date(), "ABOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    checkUser();
  }, []);

  const checkUser = async () => {
    setIsLoading(true);
    const hash = window.location.hash;
    let token = localStorage.getItem("mis-463-token");
    console.log("1111111111111111111111", hash, "222", token);

    if (hash) {
      console.log("1. ÇALIŞTI");
      setAccessToken(clearHash(hash));
      const newUser = await getCrrUser();
      if (newUser?.id) {
        setUser({
          ...newUser,
          token: clearHash(hash),
        });
      }
    } else if (token && !hash) {
      console.log("2. ÇALIŞTI");
      const newUser = await getCrrUser();
      if (newUser?.id) {
        setUser({
          ...newUser,
          token: token,
        });
      }
    }

    setIsLoading(false);
  };

  const clearHash = (hash) => {
    return hash
      .substring(1)
      .split("&")
      .find((elem) => elem.startsWith("access_token"))
      .split("=")[1];
  };

  return (
    <Layout>
      <main>
        {isLoading ? (
          <Loader className={"absolute-center"} />
        ) : user?.id ? (
          <div className="card-container absolute-center d-flex justify-content-center flex-column gap-2">
            <Box display="flex" alignItems={"center"} gap={2}>
              <img
                src={user.images[1].url}
                width={40}
                height={40}
                className="rounded-circle"
              />
              <h4>Welcome, {user.display_name || "User"}</h4>
            </Box>

            <div className="mt-2 d-flex flex-column gap-3">
              <Link
                variant="button"
                className="btn-primary text-center"
                href={user.external_urls.spotify}
                target="_blank"
              >
                Visit Your Page
              </Link>
              <Button
                variant="contained"
                className="btn-primary"
                onClick={() => navigate("/generator")}
              >
                Generate Playlists
              </Button>
              <Button
                variant="contained"
                className="w-100"
                color="error"
                onClick={() => {
                  setUser({});
                  localStorage.removeItem("mis-463-token");
                  navigate("/");
                }}
              >
                Log out
              </Button>
            </div>
          </div>
        ) : (
          <a className="btn-primary absolute-center" href={SPOTIFY_AUTH_LINK}>
            Login to Spotify
          </a>
        )}
      </main>
    </Layout>
  );
};

export default Home;
