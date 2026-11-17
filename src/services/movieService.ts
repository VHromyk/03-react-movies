import * as axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    accept: "application/json",
  },
  params: { language: "en-US" },
});

export const movieService = {
  search: async (query: string, page = 1) => {
    const { data } = await tmdb.get("/search/movie", {
      params: { query, page, include_adult: false },
    });
    return data;
  },
  getById: async (id: number) => {
    const { data } = await tmdb.get(`/movie/${id}`);
    return data;
  },
};

export default movieService;
