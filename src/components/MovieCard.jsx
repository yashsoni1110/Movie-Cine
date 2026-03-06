import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div className="relative group rounded-xl overflow-hidden bg-gray-800 shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl flex flex-col h-full">
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
        
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
          <span className="text-yellow-400 font-bold text-sm">★</span>
          <span className="text-white text-sm font-medium">{movie.vote_average?.toFixed(1) || '0.0'}</span>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={() => onToggleFavorite(movie)}
          className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/80 transition-colors border border-white/10 group/btn z-10"
          aria-label="Toggle Favorite"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 w-5 h-5 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          ) : (
            <FaRegHeart className="text-white w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          )}
        </button>
      </div>

      <div className="p-4 flex-grow flex flex-col justify-end">
        <h3 className="text-lg font-bold text-white line-clamp-1 mb-1" title={movie.title}>
          {movie.title}
        </h3>
        <p className="text-sm text-gray-400">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown Year'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
