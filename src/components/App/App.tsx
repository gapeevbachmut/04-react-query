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

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const closeModal = () => {
    setIsModalOpen(null);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', searchQuery, currentPage],
    queryFn: () => fetchMovies(searchQuery, currentPage),
    enabled: !!searchQuery,
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.total_pages || 0;

  const handleSearchBar = (query: string) => {
    if (query.trim() === '') {
      toast.error('Введіть запит для пошуку');
      return;
    }
    setSearchQuery(query);
    setCurrentPage(1);
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
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && data.results.length > 0 && (
        <>
          {totalPages > 1 && (
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
          <MovieGrid
            movies={data.results}
            onSelect={movie => setIsModalOpen(movie)}
          />
        </>
      )}

      {isModalOpen && <MovieModal movie={isModalOpen} onClose={closeModal} />}
      <Toaster />
    </>
  );
}
