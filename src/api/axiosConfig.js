import axios from "axios";

const baseAxios = axios.create({
  baseURL: "https://api.spotify.com/v1/",
  headers: {
    "Content-Type": "application/json",
    //   Authorization: `Bearer ${accessToken}`,
  },
});

const setAccessToken = (token) => {
  if (token) {
    localStorage.setItem("mis-463-token", token);
    baseAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    removeAccessToken();
  }
};

const removeAccessToken = () => {
  localStorage.removeItem("mis-463-token");
  delete baseAxios.defaults.headers.common["Authorization"];
};

const accessToken = localStorage.getItem("mis-463-token");

if (accessToken) {
  setAccessToken(accessToken);
}

export { baseAxios, setAccessToken, removeAccessToken };
