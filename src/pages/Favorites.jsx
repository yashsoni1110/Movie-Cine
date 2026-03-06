import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { FaHeart, FaFilm } from 'react-icons/fa';

const Favorites = ({ favoritesHook }) => {
  const { favorites, isFavorite, toggleFavorite } = favoritesHook;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex items-center gap-3 mb-10 border-b border-gray-800 pb-4">
        <FaHeart className="text-red-500 text-3xl" />
        <h1 className="text-4xl font-black text-white tracking-wide">My Favorites</h1>
        <span className="ml-auto bg-red-600/20 text-red-400 py-1 px-3 rounded-full text-sm font-bold border border-red-500/30">
          {favorites.length} Saved
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-900/50 rounded-2xl border border-gray-800/50 backdrop-blur-sm">
          <FaFilm className="text-gray-700 text-6xl mb-4" />
          <h2 className="text-2xl font-bold text-gray-300 mb-2">Your favorites list is empty</h2>
          <p className="text-gray-500 mb-6 text-center max-w-md">
            Start adding movies to your favorites list by clicking the heart icon on any movie card.
          </p>
          <Link 
            to="/" 
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-red-500/25"
          >
            Discover Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <div key={movie.id} className="animate-fade-in-up">
              <MovieCard 
                movie={movie} 
                isFavorite={isFavorite(movie.id)}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
