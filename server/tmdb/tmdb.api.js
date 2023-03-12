import axiosClient from "../axios/axios.client.js";
import tmdbEndpoints from "./tmdb.endpoints.js";

const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }) => await axiosClient.get(
    tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })
  )
};

export default tmdbApi;