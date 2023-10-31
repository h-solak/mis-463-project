import { spotifyApiBaseAxios } from "../api/axiosConfig";
import { getPlaylistTracks } from "./tracks";

const getPlaylistAudioFeatures = async (playlistId) => {
  try {
    const playlist = await getPlaylistTracks(playlistId);
    let trackIds = [];
    playlist?.items?.map((item) => trackIds.push(item?.track?.id));
    console.log("2", trackIds);

    const ids = `ids=${trackIds.join(",")}`;
    const res = await spotifyApiBaseAxios.get(`/audio-features?${ids}`);
    console.log(res);
    if (res?.data?.audio_features) {
      return res?.data?.audio_features;
    }
  } catch (err) {
    return null;
  }
  /*
        PAYLOAD: ids=7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B
    */
};

export { getPlaylistAudioFeatures };
