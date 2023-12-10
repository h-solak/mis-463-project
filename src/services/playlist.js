import axios from "axios";
import { projectApiBaseAxios, spotifyApiBaseAxios } from "../api/axiosConfig";
import { addItemsToPlaylist } from "./tracks";
import toast from "react-hot-toast";
import CoverImg from "../assets/tunemix.jpg";
import imageToBase64 from "image-to-base64";

/*
UserVectorSettings:
DANCEABILITY = None
ENERGY = None
ACOUSTICNESS = None
VALENCE = None


*/
const createBusinessPlaylist = async (user_id, playlistVectors, filterForm) => {
  try {
    const res = await projectApiBaseAxios.post("/business-playlist", {
      playlistVectors: playlistVectors,
      filterForm: filterForm,
    });
    const playlist = res.data.playlist; //array of IDs
    let uris = [];
    playlist?.map((item) => uris?.push(`spotify:track:${item}`));

    const playlistId = await createNewSpotifyPlaylist(
      user_id,
      "Tunemix Playlist",
      new Date().toLocaleDateString("en-US")
    );
    await axios.put(
      `https://api.spotify.com/v1/playlists/${playlistId}/images`,
      CoverImg,
      {
        headers: {
          "Content-Type": "image/jpeg",
          Authorization: `Bearer ${localStorage.getItem("mis-463-token")}`,
        },
      }
    );
    await addItemsToPlaylist(playlistId, uris);
    return playlistId;
  } catch (err) {
    console.log(err);
  }
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
  // const coverImgBase64 = await convertToBase64(CoverImg);
  // console.log("1");
  // await spotifyApiBaseAxios.put(
  //   `/playlists/${playlistId}/images`,
  //   tunemixLogoCoverBase64
  // );
  // console.log("2");
  return playlistId;
};

export { createBusinessPlaylist };

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
