import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import PosterPlug from '../../utilities/posterPlug.jpg';
import css from './FilmGalleryItem.module.css';


const FilmGalleryItem = ({ id, title, poster, voteAverage, voteCount }) => {
  console.log(id);
  const location = useLocation();
  return (
    <li className={css.galleryItem}>
      <Link
        to={`/movies/${id}`}
        state={{ from: location }}
        className={css.link}
      >
        <h2 className={css.filmTitle}>
          {title ? title : 'Movie without a title'}
        </h2>
        <img
          className={css.galleryItemImage}
          src={
            poster ? `https://image.tmdb.org/t/p/w500/${poster}` : PosterPlug
          }
          alt={title}
        />

        <div className={css.wrapper}>
          <p className={css.voteText}>Vote average: {voteAverage}</p>
          <p className={css.voteText}>Vote count: {voteCount}</p>
        </div>
      </Link>
    </li>
  );
};

FilmGalleryItem.propTypes = {
  title: PropTypes.string,
  poster: PropTypes.string,
  voteAverage: PropTypes.number,
  voteCount: PropTypes.number,
};

export default FilmGalleryItem;
