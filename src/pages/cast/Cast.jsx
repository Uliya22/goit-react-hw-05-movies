import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../API/getApi';
import Loader from '../../components/loader/Loader';
import noImage from '../../utilities/noImages.jpg';
import css from './Cast.module.css';

const BASE_URL = 'https://image.tmdb.org/t/p/w500/';

const Cast = () => {
  const [actors, setActors] = useState(null);
  const [status, setStatus] = useState('idle');
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    setStatus('pending');

    getMovieCredits(movieId)
      .then(responce => {
        setActors(responce.data.cast);
        setStatus('resolved');
      })
      .catch(error => {
        console.log(error);
        setStatus('rejected');
      });
  }, [movieId]);

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolved') {
    return (
      <div className={css.castContainer}>
        <h2 className={css.castTitle}>Cast &#11015;</h2>
        <ul className={css.castList}>
          {actors &&
            actors.map(actor => (
              <li className={css.castItem} key={actor.id}>
                <img
                  className={css.castPhoto}
                  src={
                    actor.profile_path
                      ? `${BASE_URL}${actor.profile_path}`
                      : noImage
                  }
                  alt={actor.name}
                />
                <p className={css.castName}>{actor.name}</p>
                <p className={css.castText}>Character: {actor.character}</p>
              </li>
            ))}
        </ul>
      </div>
    );
  }
};

export default Cast;