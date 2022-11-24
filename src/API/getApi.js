import axios from 'axios';

export async function getTrending() {
  const key = '87a0e8a85c96bb9057448a7523c38c39';
  const url = 'https://api.themoviedb.org/3/trending/all/day';
  const filter = `?api_key=${key}`;
  const apiUrl = `${url}${filter}`;
  return await axios.get(apiUrl);
}

export async function getSearchMovies(query, page = 1) {
  const key = '87a0e8a85c96bb9057448a7523c38c39';
  const url = 'https://api.themoviedb.org/3/search/movie';
  const filter = `?api_key=${key}&query=${query}&language=en-US&page=${page}&include_adult=false`;
  const apiUrl = `${url}${filter}`;
  return await axios.get(apiUrl);
}

export async function getMovieDetails(movieId) {
  const key = '87a0e8a85c96bb9057448a7523c38c39';
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;
  const filter = `?api_key=${key}&language=en-US`;
  const apiUrl = `${url}${filter}`;
  return await axios.get(apiUrl);
}

export async function getMovieCredits(movieId) {
  const key = '87a0e8a85c96bb9057448a7523c38c39';
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const filter = `?api_key=${key}&language=en-US`;
  const apiUrl = `${url}${filter}`;
  return await axios.get(apiUrl);
}

export async function getMovieReviews(movieId) {
  const key = '87a0e8a85c96bb9057448a7523c38c39';
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
  const filter = `?api_key=${key}&language=en-US&page=1`;
  const apiUrl = `${url}${filter}`;
  return await axios.get(apiUrl);
}