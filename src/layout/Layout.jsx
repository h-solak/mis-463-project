import {
  Box,
  Button,
  Grid,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../contexts/user/useUser";
import { SPOTIFY_AUTH_LINK, getCrrUser, getPlaylists } from "../services/user";
import { setAccessToken } from "../api/axiosConfig";
import Loader from "../components/Loader";
import Landing from "../components/Landing";
import { Logo } from "../assets/images";

/* Icons */
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import GitHubIcon from "@mui/icons-material/GitHub";
const Layout = ({ children }) => {
  const isSmScreen = useMediaQuery("(min-width:0px)");
  const isMdScreen = useMediaQuery("(min-width:900px)");
  const isLgScreen = useMediaQuery("(min-width:1200px)");
  const isXlScreen = useMediaQuery("(min-width:1536px)");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
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
  console.log(window.location.pathname.slice(1));
  console.log(window.innerWidth / 100);
  return (
    <>
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item md={12} lg={11} xl={window.innerWidth > 1600 ? 7 : 10}>
          <Box>
            {/* Navbar */}
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{
                height: 72,
                borderBottom: user?.id ? 2 : 0,
                borderBottomColor: "#00000020",
              }}
            >
              <h3 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                <img src={Logo} width="150" alt="logo" />
              </h3>

              {isLoading ? null : user?.id ? (
                <Box display={"flex"} alignItems={"center"} gap={2}>
                  <Button
                    onClick={() => navigate("/")}
                    sx={{
                      color:
                        window.location.pathname.slice(1) == "my-playlists" ||
                        window.location.pathname.slice(1) == ""
                          ? "primary.main"
                          : "dark.main",
                      fontWeight: 600,
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    My Playlists
                  </Button>
                  <Button
                    onClick={() => navigate("/generator")}
                    sx={{
                      color:
                        window.location.pathname.slice(1) == "generator"
                          ? "primary.main"
                          : "dark.main",
                      fontWeight: 600,
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    Generate
                  </Button>
                  <Button
                    onClick={() => navigate("/playlist-analyzer")}
                    sx={{
                      color:
                        window.location.pathname.slice(1) == "playlist-analyzer"
                          ? "primary.main"
                          : "dark.main",
                      fontWeight: 600,
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    Analyze
                  </Button>
                  <Button
                    onClick={() => navigate("/shuffle")}
                    sx={{
                      color:
                        window.location.pathname.slice(1) == "shuffle"
                          ? "primary.main"
                          : "dark.main",
                      fontWeight: 600,
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    Shuffle
                  </Button>
                  <Button
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    startIcon={
                      <img
                        src={user?.images[1].url}
                        width={22}
                        height={22}
                        style={{ borderRadius: 99 }}
                      />
                    }
                    sx={{
                      color: "#000",
                      textTransform: "capitalize",
                      fontWeight: 600,
                    }}
                  >
                    {user?.display_name}
                    {anchorEl ? (
                      <ArrowDropUpIcon sx={{ color: "#000" }} />
                    ) : (
                      <ArrowDropDownIcon sx={{ color: "#000" }} />
                    )}
                  </Button>
                </Box>
              ) : null}
            </Box>
            {/* Page */}
            {isLoading ? (
              <Loader className={"absolute-center"} />
            ) : user?.id ? (
              <div
              // className="pb-5"
              >
                {children}
              </div>
            ) : (
              <Landing />
            )}
          </Box>
        </Grid>
      </Grid>
      <Popover
        id={anchorEl ? "simple-popover" : undefined}
        open={anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="" style={{ width: "100%", height: "100%" }}>
          <List
            className=""
            sx={{
              padding: 0,
              borderRadius: 0,
            }}
          >
            <ListItemButton
              disablePadding
              sx={{
                paddingX: 1.4,
                paddingY: 1,
              }}
              onClick={() => {
                setAnchorEl(null);
                window.open(user?.external_urls?.spotify, "_blank");
              }}
            >
              <ListItemIcon>
                <PersonIcon
                  sx={{
                    fontSize: 22,
                    color: "#000",
                  }}
                />
              </ListItemIcon>
              <ListItemText>Visit Profile</ListItemText>
            </ListItemButton>
            <ListItemButton
              disablePadding
              sx={{
                borderTop: 2,
                borderTopColor: "#ffffff10",
                paddingX: 1.4,
                paddingY: 1,
              }}
              onClick={() => {
                setAnchorEl(null);
                setUser({});
                localStorage.removeItem("mis-463-token");
                window.history.pushState(
                  "object or string",
                  "Title",
                  "/" +
                    window.location.href
                      .substring(window.location.href.lastIndexOf("/") + 1)
                      .split("?")[0]
                );
                navigate("/");
              }}
            >
              <ListItemIcon>
                <LogoutIcon
                  sx={{
                    fontSize: 22,
                    color: "#000",
                  }}
                />
              </ListItemIcon>
              <ListItemText sx={{ color: "white.main" }}>Logout</ListItemText>
            </ListItemButton>
          </List>
        </div>
      </Popover>
    </>
  );
};

export default Layout;
