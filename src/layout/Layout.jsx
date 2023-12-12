import {
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
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
import MenuIcon from "@mui/icons-material/Menu";
const Layout = ({ children }) => {
  const navbarRef = useRef(null);
  const isSmScreen = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(false);
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
    let token = localStorage.getItem("tunemix-auth");

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
    <>
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item xs={12} lg={11} xl={window.innerWidth > 1600 ? 7 : 10}>
          <Box>
            {/* Navbar */}
            <Box
              ref={navbarRef}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              paddingX={6}
              sx={{
                height: "72px",
                borderBottom: user?.id ? 3 : 0,
                borderBottomColor: "#00000010",
              }}
            >
              <h3 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                <img src={Logo} width="150" alt="logo" />
              </h3>

              {isLoading ? null : user?.id ? (
                isSmScreen ? (
                  <IconButton>
                    <MenuIcon
                      sx={{
                        fontSize: 28,
                        color: "dark.main",
                      }}
                    />
                  </IconButton>
                ) : (
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
                          window.location.pathname.slice(1) ==
                          "playlist-analyzer"
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
                )
              ) : null}
            </Box>

            {/* Page */}
            {isLoading ? (
              <Loader className={"absolute-center"} />
            ) : user?.id ? (
              <Box
                paddingX={4}
                // className="pb-5"
                minHeight={`calc(100vh - ${
                  navbarRef.current.clientHeight + 3
                }px)`}
              >
                {children}
              </Box>
            ) : (
              <Landing />
            )}
          </Box>
        </Grid>
      </Grid>

      {/* User Popover Profile&Logout */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List
          className=""
          sx={{
            padding: 0,
            borderRadius: 0,
          }}
        >
          <ListItemButton
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
            <ListItemText primary="Profile" />
          </ListItemButton>
          <ListItemButton
            sx={{
              borderTop: 2,
              borderTopColor: "#ffffff10",
              paddingX: 1.4,
              paddingY: 1,
            }}
            onClick={() => {
              setAnchorEl(null);
              setUser({});
              localStorage.removeItem("tunemix-auth");
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
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Popover>
    </>
  );
};

export default Layout;
