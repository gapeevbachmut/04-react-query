import css from './Loader.module.css';

export default function Loader() {
  return (
    <p className={css.text}>
      Йде завантаження фільмів, будь ласка зачекайте...
    </p>
  );
}
