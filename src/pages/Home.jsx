import React, { useRef, useCallback } from 'react';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';

const Home = ({ debouncedSearch, favoritesHook, onMovieClick, setSearchQuery }) => {
  const { movies, loading, error, hasMore, loadMore } = useMovies(debouncedSearch);
  const { isFavorite, toggleFavorite } = favoritesHook;
  const observer = useRef();
  
  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  return (
    <div className="container mx-auto px-4 py-8">
      {!debouncedSearch && (
        <h1 className="text-4xl font-black text-white mb-8 tracking-tight border-l-4 border-red-600 pl-4">
          Popular Movies
        </h1>
      )}
      
      {debouncedSearch && (
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white text-center md:text-left">
            Search Results: <span className="text-red-500">"{debouncedSearch}"</span>
          </h1>
          <button 
            onClick={() => setSearchQuery('')}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white px-5 py-2 rounded-full font-bold transition-all shadow border border-gray-600 hover:border-gray-500"
          >
            ← Back to Popular
          </button>
        </div>
      )}

      {error ? (
        <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-lg text-center max-w-2xl mx-auto backdrop-blur-sm shadow-xl">
          <p className="text-red-400 font-semibold text-lg">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie, index) => {
            const isLastElement = movies.length === index + 1;
            return (
              <div 
                ref={isLastElement ? lastMovieElementRef : null} 
                key={`${movie.id}-${index}`}
                className="animate-fade-in-up"
                style={{ animationDelay: `${(index % 20) * 50}ms` }}
              >
                <MovieCard 
                  movie={movie} 
                  isFavorite={isFavorite(movie.id)}
                  onToggleFavorite={toggleFavorite}
                  onMovieClick={onMovieClick}
                />
              </div>
            );
          })}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-10 gap-2">
          <div className="w-4 h-4 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-4 h-4 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      )}

      {!loading && !hasMore && movies.length > 0 && (
        <div className="text-center py-10 text-gray-500 font-medium tracking-wide">
          You've reached the end of the list.
        </div>
      )}

      {!loading && movies.length === 0 && !error && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl font-light">No movies found. Try another search!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
