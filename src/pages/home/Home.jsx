import { useState, useEffect } from 'react';
import { getTrending } from '../../API/getApi';
import FilmGallery from '../../components/filmGallery/FilmGallery';
import css from './Home.module.css';

const Home = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    getTrending().then(responce => {
      const filmsTrending = responce.data;
      
      if (responce.data === 0) {
        return Promise.reject(new Error(`No films trending today`));
      }

      const films = filmsTrending.results.map(result => ({
        id: result.id,
        title: result.original_title,
        poster: result.poster_path,
        voteAverage: result.vote_average,
        voteCount: result.vote_count,
      }));
      
      setFilms(prevState => [...prevState, ...films]);
    });
  }, []);

  return (
    <div>
      <h1 className={css.homeTitle}>Trending today</h1>
      <FilmGallery films={films} />
    </div>
  );
};

export default Home;