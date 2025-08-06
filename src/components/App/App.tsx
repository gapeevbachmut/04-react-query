import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { type Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import ReactPaginate from 'react-paginate';
import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import toast from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { useEffect } from 'react';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoadingLoader, setIsLoadingLoader] = useState(false);
  const [isErrorRequest, setIsErrorRequest] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const closeModal = () => {
    setIsModalOpen(null);
  };

  const { data, isSuccess } = useQuery({
    queryKey: ['movies', searchQuery, currentPage],
    queryFn: () => fetchMovies(searchQuery, currentPage),
    enabled: !searchQuery,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) setMovies(data.results);
  }, [data]);

  const totalPages = data?.total_pages || 0;

  const handleSearchBar = async (query: string) => {
    // console.log('input - ', query);

    try {
      setIsLoadingLoader(true);
      setIsErrorRequest(false);
      setMovies([]);

      const responce = await fetchMovies(query, currentPage);

      // if (responce === 0) {
      //   toast.error('За вашим запитом фільмів не знайдено.');
      //   // console.log('No movies found for your request.');
      // }
      // console.log('responce', responce);
      setSearchQuery(query);
      setCurrentPage(1);
      setMovies(responce.results);
    } catch {
      toast.error(`Виникла помилка під час запиту на сервер.`); // Error while requesting movies
      setIsErrorRequest(true);
    } finally {
      setIsLoadingLoader(false);
    }
  };

  return (
    <>
      <a href="index.html">
        <h1>
          <img className={css.logo} src="/react.svg" alt="react" />
          React
          <img className={css.logo} src="/react.svg" alt="react" />- домашня
          робота № 4
        </h1>
      </a>

      <SearchBar onSubmit={handleSearchBar} />
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {isLoadingLoader && <Loader />}

      {isErrorRequest && <ErrorMessage />}
      {isModalOpen && <MovieModal movie={isModalOpen} onClose={closeModal} />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={movie => setIsModalOpen(movie)} />
      )}
      <Toaster />
    </>
  );
}
