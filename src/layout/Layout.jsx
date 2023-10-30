import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../contexts/user/useUser";
import { SPOTIFY_AUTH_LINK, getCrrUser, getPlaylists } from "../services/user";
import { setAccessToken } from "../api/axiosConfig";
import Loader from "../components/Loader";
import Landing from "../components/Landing";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../assets/logo.svg";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user?.id) {
      setIsLoading(false);
    } else {
      checkUser();
    }
  }, []);

  const checkUser = async () => {
    const hash = window.location.hash;
    let token = localStorage.getItem("mis-463-token");

    if (hash) {
      setAccessToken(clearHash(hash));
      const newUser = await getCrrUser();
      if (newUser?.id) {
        const playlists = await getPlaylists(newUser?.id);
        setUser({
          ...newUser,
          token: clearHash(hash),
          playlists: playlists,
        });
        console.log(playlists);
      }
    } else if (token && !hash) {
      const newUser = await getCrrUser();
      if (newUser?.id) {
        const playlists = await getPlaylists(newUser?.id);
        setUser({
          ...newUser,
          token: token,
          playlists: playlists,
        });
        console.log(playlists);
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
    <div>
      <nav
        className="d-flex justify-content-between align-items-center"
        style={{
          height: 70,
        }}
      >
        <h3 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img src={Logo} width="50" alt="" />
          TuneMix<span className="ms-1 fs-6">v1</span>
        </h3>
        {isLoading ? null : user?.id ? (
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <img
              src={user?.images[1].url}
              width={32}
              height={32}
              className="rounded-circle"
            />
            <h6 style={{ fontSize: 14 }}>{user?.display_name}</h6>
            <p
              className="fw-bold"
              style={{ fontSize: 10, cursor: "pointer" }}
              onClick={() => {
                setUser({});
                localStorage.removeItem("mis-463-token");
                navigate("/");
              }}
            >
              <LogoutIcon sx={{ fontSize: 16 }} />
            </p>
          </Box>
        ) : (
          <Button
            color="info"
            variant="contained"
            onClick={() => {
              window.location.href = SPOTIFY_AUTH_LINK;
            }}
          >
            Login
          </Button>
        )}
      </nav>
      {isLoading ? (
        <Loader className={"absolute-center"} />
      ) : user?.id ? (
        <div
          className="pb-5"
          style={{
            backgroundColor: "#e2e6ec",
          }}
        >
          {children}
        </div>
      ) : (
        <Landing />
      )}
    </div>
  );
};

export default Layout;
