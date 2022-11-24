import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
const Header = lazy(() => import('./components/header/Header'));
const Home = lazy(() => import('./pages/home/Home'));
const Movies = lazy(() => import('./pages/movies/Movies'));
const MovieDetails = lazy(() => import('./pages/movieDetails/MovieDetails'));
const Cast = lazy(() => import('./pages/cast/Cast'));
const Reviews = lazy(() => import('./pages/reviews/Reviews'));

const App = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;