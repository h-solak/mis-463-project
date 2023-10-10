import axios from "axios";
import toast from "react-hot-toast";
import { baseAxios, removeAccessToken } from "../api/axiosConfig";

const CLIENT_ID = "a7190502be9547ff9a5fb3b916e3bcec";
// const REDIRECT_URL = "https://frolicking-dolphin-81d134.netlify.app";
const REDIRECT_URL = "http://localhost:5173";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SPOTIFY_AUTH_LINK = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=playlist-modify-public`;

const getCrrUser = async () => {
  try {
    const res = await baseAxios.get("/me");
    return res.data;
  } catch (err) {
    // toast.error(err.response.data.error.message); --> access token has expired.. showing this error is unnecessary
    removeAccessToken();
    return {};
  }
};

const getPlaylists = async (user_id) => {
  try {
    const res = await baseAxios.get(`/users/${user_id}/playlists`);
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error.message);
    return {};
  }
};

const createPlaylist = async (user_id, name, description, isPublic) => {
  try {
    const res = await baseAxios.post(`/users/${user_id}/playlists`, {
      name: name,
      description: description,
      public: isPublic,
    });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error.message);
    return {};
  }
};

/*
getUser response type
{
  "display_name" : "britisheep",
  "external_urls" : {
    "spotify" : "https://open.spotify.com/user/rc989wq8rct7mxd8aapzs6091"
  },
  "href" : "https://api.spotify.com/v1/users/rc989wq8rct7mxd8aapzs6091",
  "id" : "rc989wq8rct7mxd8aapzs6091",
  "images" : [ {
    "url" : "https://i.scdn.co/image/ab67757000003b8247854cbf9f142aabbd7437da",
    "height" : 64,
    "width" : 64
  }, {
    "url" : "https://i.scdn.co/image/ab6775700000ee8547854cbf9f142aabbd7437da",
    "height" : 300,
    "width" : 300
  } ],
  "type" : "user",
  "uri" : "spotify:user:rc989wq8rct7mxd8aapzs6091",
  "followers" : {
    "href" : null,
    "total" : 17
  }
}

*/

export { SPOTIFY_AUTH_LINK, getCrrUser, getPlaylists, createPlaylist };
