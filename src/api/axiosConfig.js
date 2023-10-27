import axios from "axios";

const spotifyApiBaseAxios = axios.create({
  baseURL: "https://api.spotify.com/v1/",
  headers: {
    "Content-Type": "application/json",
    //   Authorization: `Bearer ${accessToken}`,
  },
});

const projectApiBaseAxios = axios.create({
  baseURL: "http://localhost:8800/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const setAccessToken = (token) => {
  if (token) {
    localStorage.setItem("mis-463-token", token);
    spotifyApiBaseAxios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  } else {
    removeAccessToken();
  }
};

const removeAccessToken = () => {
  localStorage.removeItem("mis-463-token");
  delete spotifyApiBaseAxios.defaults.headers.common["Authorization"];
};

const accessToken = localStorage.getItem("mis-463-token");

if (accessToken) {
  setAccessToken(accessToken);
}

export {
  spotifyApiBaseAxios,
  projectApiBaseAxios,
  setAccessToken,
  removeAccessToken,
};
