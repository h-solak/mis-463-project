import axios from "axios";
import { projectApiBaseAxios, spotifyApiBaseAxios } from "../api/axiosConfig";
import { addItemsToPlaylist } from "./tracks";
import toast from "react-hot-toast";
import CafeCoverImg from "../assets/images/playlistCovers/cafe.jpg";
import BarCoverImg from "../assets/images/playlistCovers/bar.jpg";
import ClubCoverImg from "../assets/images/playlistCovers/club.jpg";
import CustomCoverImg from "../assets/images/playlistCovers/custom.jpg";
import convertBase64 from "../utils/convertBase64";
import OldCover from "../assets/tunemix.jpg";
import dayjs from "dayjs";

const cafeVectorPreset = {
  danceability: 37.4,
  energy: 70.1,
  acousticness: 55.8,
  valence: 69.4,
};
const barVectorPreset = {
  danceability: 76.9,
  energy: 84.6,
  acousticness: 58.2,
  valence: 80.2,
};
const clubVectorPreset = {
  danceability: 97.4,
  energy: 85.7,
  acousticness: 24.7,
  valence: 81.8,
};

const areVectorsEqual = (v1, v2) => {
  return JSON.stringify(v1) == JSON.stringify(v2);
};

const getPlaylistType = (vector) => {
  if (areVectorsEqual(vector, cafeVectorPreset)) {
    return "Cafe";
  } else if (areVectorsEqual(vector, barVectorPreset)) {
    return "Bar";
  } else if (areVectorsEqual(vector, clubVectorPreset)) {
    return "Club";
  } else {
    return "Your Own";
  }
};

const createBusinessPlaylist = async (user_id, playlistVectors, filterForm) => {
  try {
    let playlistDate = new Date();
    playlistDate = dayjs(playlistDate).format("DD/MM/YYYY");
    const playlistType = getPlaylistType(playlistVectors);

    //fun fact
    const uselessres = await axios.get(
      "https://uselessfacts.jsph.pl/api/v2/facts/random"
    );

    //create the playlist on spotify
    const playlistId = await createNewSpotifyPlaylist(
      user_id,
      `Tunemix - ${playlistType} Playlist`,
      `Useless fun fact: ${uselessres?.data?.text}`
      // `Generated at ${playlistDate}`
    );

    await addCustomPlaylistCoverImg(playlistId, playlistType);

    //project API
    const res = await projectApiBaseAxios.post("/business-playlist", {
      playlistVectors: playlistVectors,
      filterForm: filterForm,
    });
    const playlist = res?.data?.playlist; //array of IDs
    const similarity = res?.data?.similarity; //array of IDs
    const tableData = res?.data?.tableData; //array of objects
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

    return {
      playlistId: playlistId,
      similarity: similarity,
      tableData: tableData,
    };
  } catch (err) {
    console.log(err);
  }
};

const addCustomPlaylistCoverImg = async (playlistId, playlistType) => {
  try {
    const coverImg =
      playlistType == "Cafe"
        ? CafeCoverImg
        : playlistType == "Bar"
        ? BarCoverImg
        : playlistType == "Club"
        ? ClubCoverImg
        : CustomCoverImg;
    const base64Img = await convertBase64(coverImg);
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
