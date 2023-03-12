import tmdbConfig from "./tmdb.config.js";

const tmdbEndpoints = {
  mediaList: ({ mediaType, mediaCategory, page }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaCategory}`, { page }
  )
};

export default tmdbEndpoints;