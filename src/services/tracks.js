import { baseAxios } from "../api/axiosConfig";
import toast from "react-hot-toast";

const getPlaylistTracks = async (playlist_id) => {
  try {
    const res = await baseAxios.get(`/playlists/${playlist_id}/tracks`);
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
    const res = await baseAxios.put(`/playlists/${playlist_id}/tracks`, {
      range_start: range_start,
      insert_before: insert_before,
      //   range_length: 2,
    });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error.message);
    return {};
  }
};

export { getPlaylistTracks, reorderPlaylistTracks };
