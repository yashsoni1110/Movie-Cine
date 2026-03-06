const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'dummy_api_key';

export const fetchPopularMovies = async (page = 1) => {
  // If API key is missing or dummy, we could either return mock data or throw.
  // For demonstration, let's just make the real fetch. User must set VITE_TMDB_API_KEY.
  if (API_KEY === 'dummy_api_key') {
    console.warn("Using dummy API key. Please set VITE_TMDB_API_KEY in your .env file.");
  }

  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
  if (!response.ok) {
    if (response.status === 401) {
       throw new Error("Invalid API key! Please add a valid TMDB API key to your .env file.");
    }
    throw new Error('Failed to fetch popular movies');
  }
  return response.json();
};

export const searchMovies = async (query, page = 1) => {
  if (!query) return { results: [], total_pages: 0 };
  
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`);
  if (!response.ok) {
     if (response.status === 401) {
       throw new Error("Invalid API key! Please add a valid TMDB API key to your .env file.");
    }
    throw new Error('Failed to search movies');
  }
  return response.json();
};

export const fetchMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`);
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid API key! Please add a valid TMDB API key to your .env file.");
    }
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
};
