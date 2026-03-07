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

  const videos = details?.videos?.results || [];
  
  // Debug (Check What API Returns)
  console.log("Movie Videos from API:", videos);

  // Correct Trailer Selection Logic
  const mainTrailer =
    videos.find(v => v.site === "YouTube" && v.type === "Trailer") ||
    videos.find(v => v.site === "YouTube" && v.type === "Teaser") ||
    videos.find(v => v.site === "YouTube");

  // Get ALL YouTube videos to show in a row
  const allTrailers = videos.filter(vid => vid.site === 'YouTube');

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
          <div className="flex flex-col w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            
            {/* Hero Section */}
            <div className="relative w-full flex-shrink-0 aspect-video md:max-h-[60vh] bg-black rounded-t-xl overflow-hidden">
              {mainTrailer ? (
                <iframe
                  className="w-full h-full pointer-events-auto rounded-t-xl object-cover"
                  src={`https://www.youtube-nocookie.com/embed/${mainTrailer.key}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div 
                  className="w-full h-full bg-[#111] flex flex-col justify-center items-center rounded-t-xl"
                  style={{ 
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path || details.poster_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                  {!(details?.backdrop_path || details?.poster_path) ? (
                    <span className="text-gray-500 font-bold tracking-widest uppercase relative z-10">No Trailer Available</span>
                  ) : (
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <span className="text-gray-300 font-bold tracking-widest uppercase">No Official Trailer Found</span>
                      <a 
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(details.title + ' ' + (details.release_date?.substring(0,4) || '') + ' official trailer')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#E50914] hover:bg-[#b80710] text-white px-5 py-2 rounded-full font-bold transition-transform hover:scale-105 shadow-xl flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        Search Trailer on YouTube
                      </a>
                    </div>
                  )}
                </div>
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
            <div className="px-6 md:px-10 pb-6 pt-5 relative z-20 flex-grow flex flex-col">
              
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
              <p className="text-[#e5e5e5] text-sm md:text-base leading-snug md:leading-relaxed mb-6 drop-shadow font-normal whitespace-pre-wrap">
                {details.overview || "No overview available."}
              </p>

              {/* All Trailers Section */}
              {allTrailers.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-white font-bold text-lg mb-3">Clips & Trailers</h3>
                  <div className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {allTrailers.map(vid => (
                      <div key={vid.id} className="min-w-[260px] md:min-w-[320px] aspect-video flex-shrink-0 relative rounded-xl overflow-hidden shadow-lg bg-[#222]">
                        <iframe
                          className="w-full h-full absolute inset-0 pointer-events-auto"
                          src={`https://www.youtube-nocookie.com/embed/${vid.key}?controls=1&modestbranding=1&rel=0`}
                          title={vid.name}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
