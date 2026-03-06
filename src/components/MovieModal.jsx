import React, { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../services/api';
import { FaChevronRight } from 'react-icons/fa';

const MovieModal = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    
    const getDetails = async () => {
      try {
        const data = await fetchMovieDetails(movie.id);
        setDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getDetails();

    return () => {
      document.body.style.overflow = 'auto'; // restore scroll
    };
  }, [movie.id]);

  // Find a YouTube trailer if available. If no explicit "Trailer", fallback to other valid types like Teasers.
  const trailer = details?.videos?.results?.find(
    (vid) => vid.site === 'YouTube' && (vid.type === 'Trailer' || vid.type === 'Teaser' || vid.type === 'Clip' || vid.type === 'Featurette')
  ) || details?.videos?.results?.find((vid) => vid.site === 'YouTube'); // Absolute fallback to any YT video if all else fails

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#141414] rounded-xl overflow-hidden shadow-2xl z-10 animate-fade-in-up flex flex-col">

        {loading ? (
          <div className="p-20 flex justify-center items-center h-96">
            <div className="w-8 h-8 rounded-full bg-[#E50914] animate-bounce"></div>
          </div>
        ) : error ? (
          <div className="p-20 text-center text-red-500 h-96 flex justify-center items-center">
            <p className="text-xl font-bold">Failed to load details: {error}</p>
          </div>
        ) : (
          <div className="flex flex-col">
            
            {/* Hero Section */}
            <div className="relative w-full aspect-video max-h-[45vh] md:max-h-[55vh] bg-black rounded-t-xl overflow-hidden">
              {trailer ? (
                <iframe
                  className="w-full h-full pointer-events-auto rounded-t-xl"
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path || details.poster_path})` 
                  }}
                ></div>
              )}
              {/* Dark Gradient Overlay to fade smoothly into the background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent pointer-events-none"></div>
              
              {/* Title overlay at the bottom of the video */}
              <div className="absolute bottom-4 md:bottom-6 left-0 w-full px-6 md:px-10 pointer-events-none">
                <h2 
                  className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl uppercase tracking-tighter" 
                  style={{ textShadow: "0px 2px 10px rgba(0,0,0,0.9)" }}
                >
                  {details.title}
                </h2>
              </div>
            </div>

            {/* Content Details */}
            <div className="px-6 md:px-10 pb-6 pt-0 relative z-20 flex-grow flex flex-col">
              
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-200 font-medium mb-3 md:mb-4">
                <span className="bg-[#404040] px-2 py-1 md:px-3 md:py-1 rounded text-white font-bold opacity-90">
                  {details.release_date?.substring(0, 4) || 'N/A'}
                </span>
                <span className="bg-[#404040] px-2 py-1 md:px-3 md:py-1 rounded text-white font-bold opacity-90">
                  {details.adult ? 'A 18+' : 'U/A 16+'}
                </span>
                <span className="bg-[#404040] px-2 py-1 md:px-3 md:py-1 rounded text-white font-bold opacity-90">
                  Show
                </span>
                {details.genres?.slice(0, 2).map(g => (
                  <span key={g.id} className="bg-[#404040] px-2 py-1 md:px-3 md:py-1 rounded text-white font-bold opacity-90">
                    {g.name}
                  </span>
                ))}
              </div>

              {/* Description Text */}
              <p className="text-[#e5e5e5] text-sm md:text-base leading-snug md:leading-relaxed mb-4 md:mb-6 max-h-[12vh] md:max-h-[15vh] overflow-hidden text-ellipsis drop-shadow font-normal" style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical'
              }}>
                {details.overview || "No overview available."}
              </p>

              {/* Get Started Button */}
              <button className="flex items-center justify-center gap-2 bg-[#E50914] hover:bg-[#b80710] text-white px-6 md:px-8 py-2 md:py-3 rounded text-base md:text-lg font-bold transition-colors w-max shadow-lg mt-auto">
                Get Started
                <FaChevronRight className="w-4 h-4 md:w-5 md:h-5 mt-0.5" />
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
