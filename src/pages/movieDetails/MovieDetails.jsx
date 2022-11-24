import { useState, useEffect } from 'react';
import {
  NavLink,
  useLocation,
  useParams,
  Outlet,
} from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import PosterPlug from '../../utilities/posterPlug.jpg';
import { getMovieDetails } from '../../API/getApi';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const [filmsDetails, setfilmsDetails] = useState('');
  const [status, setStatus] = useState('idle');
  const { movieId } = useParams();

  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    if (!movieId) return;
    setStatus('pending');
    getMovieDetails(movieId)
      .then(responce => {
        setfilmsDetails(responce.data);
        setStatus('resolved');
      })
      .catch(error => {
        console.log(error);
        setStatus('rejected');
      });
  }, [movieId]);

  const {
    title,
    genres,
    overview,
    poster_path,
    release_date,
    vote_average,
    vote_count,
  } = filmsDetails;

  const releaseData = release_date && release_date.slice(0, 4);

  const genresList = genres && genres.map(genr => genr.name).join(', ');

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolved') {
    return (
      <>
        <NavLink type="button" className={css.backButton} to={backLinkHref}>
          <span>Go back </span>
        </NavLink>
        <div className={css.movieDetailsWrapper}>
          <img
            className={css.movieDetailsImage}
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : PosterPlug
            }
            alt={title}
          />
          <div className={css.movieDetailsContainer}>
            <h1 className={css.movieDetailsTitle}>
              {`${title} (${releaseData})`}
            </h1>
            <div className={css.voteContainer}>
              <p className={css.voteText}>Vote average: {vote_average ?? 0}</p>
              <p className={css.voteText}>Vote count: {vote_count ?? 0}</p>
            </div>
            <h3 className={css.textTitle}>Overview: </h3>
            <p className={css.text}>{overview ?? 'none'}</p>
            <h3 className={css.textTitle}>Genres: </h3>
            <p className={css.text}>{genresList ?? 'none'}</p>
          </div>
        </div>
        <div>
          <div className={css.informationContainer}>
            <h3 className={css.textTitle}>Additional information </h3>
            <ul>
              <NavLink
                to="cast"
                className={css.link}
                state={{ from: backLinkHref }}
              >
                Cast
              </NavLink>
              <NavLink
                to="reviews"
                className={css.link}
                state={{ from: backLinkHref }}
              >
                Reviews
              </NavLink>
            </ul>
          </div>
          <Outlet />
        </div>
      </>
    );
  }
};

export default MovieDetails;