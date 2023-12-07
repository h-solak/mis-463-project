import { spotifyApiBaseAxios } from "../api/axiosConfig";
import toast from "react-hot-toast";

const getPlaylist = async (playlist_id) => {
  try {
    const res = await spotifyApiBaseAxios.get(`/playlists/${playlist_id}`);
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error.message);
    return {};
  }
};

const getPlaylistTracks = async (playlist_id) => {
  try {
    const res = await spotifyApiBaseAxios.get(
      `/playlists/${playlist_id}/tracks`
    );
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error.message);
    return {};
  }
};

const reorderPlaylistTracks = async (
  playlist_id,
  range_start,
  insert_before
  //   range_length
) => {
  try {
    const res = await spotifyApiBaseAxios.put(
      `/playlists/${playlist_id}/tracks`,
      {
        range_start: range_start,
        insert_before: insert_before,
        //   range_length: 2,
      }
    );
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error.message);
    return {};
  }
};

const addItemsToPlaylist = async (playlist_id, uris) => {
  try {
    const res = await spotifyApiBaseAxios.post(
      `/playlists/${playlist_id}/tracks`,
      uris
    );
  } catch (err) {
    console.log(err);
  }
};

export {
  getPlaylist,
  getPlaylistTracks,
  reorderPlaylistTracks,
  addItemsToPlaylist,
};
