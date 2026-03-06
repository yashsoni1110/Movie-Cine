import { useState, useEffect, useRef } from 'react';
import { fetchPopularMovies, searchMovies } from '../services/api';

export const useMovies = (searchQuery) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // When searchQuery changes, reset
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [searchQuery]);

  useEffect(() => {
    let isMounted = true;

    const fetchMoviesData = async () => {
      // Don't fetch if no more items or currently loading
      if (!hasMore && page !== 1) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = searchQuery 
          ? await searchMovies(searchQuery, page) 
          : await fetchPopularMovies(page);
        
        if (isMounted) {
          setMovies((prev) => {
            if (page === 1) return data.results; // Ensure we clean start on page 1
            const newMovies = [...prev, ...data.results];
            const uniqueIds = new Set();
            return newMovies.filter(m => {
              if (!uniqueIds.has(m.id)) {
                uniqueIds.add(m.id);
                return true;
              }
              return false;
            });
          });
          setHasMore(data.page < data.total_pages);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMoviesData();

    return () => {
      isMounted = false;
    };
  }, [searchQuery, page]); // Only run on page or searchQuery change

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return { movies, loading, error, hasMore, loadMore };
};
