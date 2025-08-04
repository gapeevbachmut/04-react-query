// Компонент MovieGrid - це список карток фільмів. Він приймає два пропси:
// onSelect - функцію для обробки кліку на картку фільму;
// movies - масив фільмів.

import css from './MovieGrid.module.css';
import { type Movie } from '../../types/movie';

interface MovieGridProps {
  onSelect: (movieId: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {/* Набір елементів списку з фільмами */}
      {movies.map(movies => (
        <li
          key={movies.id}
          // onClick={openModal}      //  how  ---  ????
          onClick={() => onSelect(movies)}
        >
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

//
//
//
//
// <ul>
//   {movie.map(({ id, title }) => (
//     <li key={id}>
//       <a href="" target="_blank">
//         {title}
//       </a>
//     </li>
//   ))}
// </ul>
