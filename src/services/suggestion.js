import axios from "axios";
import { projectApiBaseAxios } from "../api/axiosConfig";

const getRandomSongs = async () => {
  try {
    const res = await projectApiBaseAxios.get("/suggestion");
    return res.data.tracks;
  } catch (err) {
    console.log(err);
  }
};

export { getRandomSongs };
