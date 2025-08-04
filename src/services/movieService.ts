import axios from 'axios';
import { type Movie } from '../types/movie';

export interface MovieResponce {
  results: Movie[];
}

const myKey = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const config = {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${myKey}`,
    },
  };

  const responce = await axios.get<MovieResponce>(
    `https://api.themoviedb.org/3/search/movie`,
    config
    //?query=${query}
  );
  // console.log(responce.data.results); // масив за пошуком

  return responce.data.results;
};
