import PropTypes from 'prop-types';
import FilmGalleryItem from '../filmGalleryItem/FilmGalleryItem';
import css from './FilmGallery.module.css';

const FilmGallery = ({ films }) => {
  return (
    <ul className={css.gallery}>
      {films &&
        films.map(({ id, title, poster, voteAverage, voteCount }) => (
          <FilmGalleryItem
            key={id}
            id={id}
            title={title}
            poster={poster}
            voteAverage={voteAverage}
            voteCount={voteCount}
          />
        ))}
    </ul>
  );
};

FilmGallery.propTypes = {
  films: PropTypes.array.isRequired,
};

export default FilmGallery;
