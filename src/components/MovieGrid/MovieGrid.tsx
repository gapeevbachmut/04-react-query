import css from './MovieGrid.module.css';
import { type Movie } from '../../types/movie';

interface MovieGridProps {
  onSelect: (movieId: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map(movies => (
        <li key={movies.id} onClick={() => onSelect(movies)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
              alt={movies.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movies.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
