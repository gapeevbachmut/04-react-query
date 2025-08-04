import css from './MovieModal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { type Movie } from '../../types/movie';

interface MovieModalProps {
  onClose: () => void;
  movie: Movie;
}

export default function MovieModal({ onClose, movie }: MovieModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      //  очищення стану обраного фільму                  ???
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      {/* як передати  */}
      {/* {({ id, backdrop_path, title, overview, release_date, vote_average }) => ()} */}
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong>
            {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
