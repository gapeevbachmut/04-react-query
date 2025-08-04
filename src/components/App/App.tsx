import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { type Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import toast from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState<Movie | null>(null);

  const closeModal = () => {
    setIsModalOpen(null);
  };

  const handleSearchBar = async (query: string) => {
    // console.log('input - ', query);

    try {
      setIsLoading(true);
      setIsError(false);
      setMovie([]);

      const responce = await fetchMovies(query);
      if (responce.length === 0) {
        toast.error('No movies found for your request.');
        // console.log('No movies found for your request.');
      }

      setMovie(responce);
    } catch {
      toast.error(`Error while requesting movies.`);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <a href="index.html">
        <h1>
          <img className={css.logo} src="/react.svg" alt="react" />
          React
          <img className={css.logo} src="/react.svg" alt="react" />- домашня
          робота № 3
        </h1>
      </a>

      <SearchBar onSubmit={handleSearchBar} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isModalOpen && <MovieModal movie={isModalOpen} onClose={closeModal} />}
      {movie.length > 0 && (
        <MovieGrid movies={movie} onSelect={movie => setIsModalOpen(movie)} />
      )}
      <Toaster />
    </>
  );
}
