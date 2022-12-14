import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchForm from '../../components/searchForm/SearchForm';
import { getSearchMovies } from '../../API/getApi';
import FilmGallery from '../../components/filmGallery/FilmGallery';
import Button from '../../components/button/Button';
import Loader from '../../components/loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Movie = () => {
  const [query, setQuery] = useState('');
  const [filmsQuery, setfilmsQuery] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const value = searchParams.get('query');
  useEffect(() => {
    if (value && page) {
      setStatus('pending');

      getSearchMovies(value, page)
        .then(responce => {
          const filmsData = responce.data;
          if (filmsData.results.length === 0) {
            return Promise.reject(new Error(`No films with name "${query}"`));
          }
          const filmsQuery = filmsData.results.map(result => ({
            id: result.id,
            title: result.original_title,
            poster: result.poster_path,
            voteAverage: result.vote_average,
            voteCount: result.vote_count,
          }));
          setfilmsQuery(prevState => [...prevState, ...filmsQuery]);
          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }
  }, [value, page, query]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setfilmsQuery([]);
    setSearchParams({ query });
  };

  const onNextFetch = () => {
    setPage(prevState => prevState + 1);
  };

  if (status === 'idle') {
    return (
      <>
        <SearchForm onSubmit={handleFormSubmit} />
        <ToastContainer autoClose={3000} />;
      </>
    );
  }

  if (status === 'rejected') {
    return (
      <div>
        <SearchForm onSubmit={handleFormSubmit} />
        {error && <h1>{error.message}</h1>}
      </div>
    );
  }

  if (status === 'pending' || 'resolved') {
    return (
      <>
        <SearchForm onSubmit={handleFormSubmit} />
        {status !== 'resolved' && <Loader />}
        <FilmGallery films={filmsQuery} />
        {status !== 'pending' && <Button onClick={onNextFetch} />}
        <Link to="/movieId"></Link>
      </>
    );
  }
};

export default Movie;
