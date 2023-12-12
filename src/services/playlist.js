import axios from "axios";
import { projectApiBaseAxios, spotifyApiBaseAxios } from "../api/axiosConfig";
import { addItemsToPlaylist } from "./tracks";
import toast from "react-hot-toast";
import CoverImg from "../assets/tunemix.jpg";
import convertBase64 from "../utils/convertBase64";

/*
UserVectorSettings:
DANCEABILITY = None
ENERGY = None
ACOUSTICNESS = None
VALENCE = None


*/
const createBusinessPlaylist = async (user_id, playlistVectors, filterForm) => {
  try {
    //create the playlist on spotify
    const playlistId = await createNewSpotifyPlaylist(
      user_id,
      "Tunemix Playlist",
      new Date().toLocaleDateString("en-US")
    );

    await addCustomPlaylistCoverImg(playlistId, CoverImg);

    //project API
    const res = await projectApiBaseAxios.post("/business-playlist", {
      playlistVectors: playlistVectors,
      filterForm: filterForm,
    });
    const playlist = res.data.playlist; //array of IDs
    let uris = [];
    playlist?.map((item) => uris?.push(`spotify:track:${item}`));
    await addItemsToPlaylist(playlistId, uris);

    // //save the new playlist to local storage
    // let newPlaylistHistory = JSON.parse(
    //   localStorage.getItem("tunemix-history")
    // );
    // newPlaylistHistory.push({
    //   playlistId: playlistId,
    //   userId: user_id,
    // });
    // localstorage.setItem("tunemix-history", JSON.stringify(newPlaylistHistory));

    return playlistId;
  } catch (err) {
    console.log(err);
  }
};

const addCustomPlaylistCoverImg = async (playlistId, img) => {
  const base64Img = await convertBase64(img);
  await axios.put(
    `https://api.spotify.com/v1/playlists/${playlistId}/images`,
    base64Img,
    {
      headers: {
        "Content-Type": "image/jpeg",
        Authorization: `Bearer ${localStorage.getItem("tunemix-auth")}`,
      },
    }
  );
};

const createNewSpotifyPlaylist = async (user_id, name, description) => {
  const newPlaylist = await spotifyApiBaseAxios.post(
    `/users/${user_id}/playlists`,
    {
      name: name,
      description: description ? description : "",
    }
  );
  const playlistId = newPlaylist?.data?.id;
  return playlistId;
};

export { createBusinessPlaylist, addCustomPlaylistCoverImg };

// const getRandomSongs = async () => {
//   try {
//     const res = await projectApiBaseAxios.get("/suggestion");
//     return res.data.tracks;
//   } catch (err) {
//     console.log(err);
//   }
// };

// const createRandomPlaylist = async (user_id, name, description) => {
//   try {
//     let uris = [];
//     const randomSongs = await getRandomSongs();
//     randomSongs?.map((item) => uris?.push(`spotify:track:${item.track_id}`));

//     const newPlaylist = await spotifyApiBaseAxios.post(
//       `/users/${user_id}/playlists`,
//       {
//         name: name,
//         description: description ? description : "",
//       }
//     );
//     const playlistId = newPlaylist?.data?.id;
//     await addItemsToPlaylist(playlistId, uris);

//     toast.success("New random playlist created!");
//   } catch (err) {
//     toast.error(err?.response?.data?.error?.message || "Error!!!");
//     return {};
//   }
// };
