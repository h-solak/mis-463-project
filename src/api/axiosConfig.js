import axios from "axios";

const spotifyApiBaseAxios = axios.create({
  baseURL: "https://api.spotify.com/v1/",
  headers: {
    "Content-Type": "application/json",
    //   Authorization: `Bearer ${accessToken}`,
  },
});

const projectApiBaseAxios = axios.create({
  baseURL:
    "http://localhost:8800/api" || "https://tunemix-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const setAccessToken = (token) => {
  if (token) {
    localStorage.setItem("tunemix-auth", token);
    spotifyApiBaseAxios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  } else {
    removeAccessToken();
  }
};

const removeAccessToken = () => {
  localStorage.removeItem("tunemix-auth");
  delete spotifyApiBaseAxios.defaults.headers.common["Authorization"];
};

const accessToken = localStorage.getItem("tunemix-auth");

if (accessToken) {
  setAccessToken(accessToken);
}

export {
  spotifyApiBaseAxios,
  projectApiBaseAxios,
  setAccessToken,
  removeAccessToken,
};
