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
  // We make a single request to fetch the movie details and credits
  const detailsRes = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`);
  
  if (!detailsRes.ok) {
    if (detailsRes.status === 401) {
      throw new Error("Invalid API key! Please add a valid TMDB API key to your .env file.");
    }
    throw new Error('Failed to fetch movie details');
  }
  
  const details = await detailsRes.json();
  
  // We fetch videos in parallel using two strategies: 
  // 1. Strict en-US (Most reliable and well-populated TMDB database)
  // 2. Multi-language (To catch dubs, foreign films, and assorted regional trailers)
  try {
    const [usVideosRes, mVideosRes] = await Promise.all([
      fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`),
      fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&include_video_language=en,hi,ko,ja,zh,es,fr,de,it,pt,ru,null`)
    ]);

    const usData = usVideosRes.ok ? await usVideosRes.json() : { results: [] };
    const mData = mVideosRes.ok ? await mVideosRes.json() : { results: [] };

    // Merge them and remote duplicates based on the YouTube video key
    const allUniqueVideos = [...usData.results, ...mData.results].filter((v, i, a) => a.findIndex(t => (t.key === v.key)) === i);
    
    // Attach videos back to the details object exactly as the component expects it
    details.videos = { results: allUniqueVideos || [] };
  } catch (err) {
    console.warn("Could not fetch some videos, falling back to empty:", err);
    details.videos = { results: [] };
  }

  // Ensure videos are always structured right even on success
  if (!details.videos || !details.videos.results) {
     details.videos = { results: [] };
  }

  return details;
};
