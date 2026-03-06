import React from 'react';
import { Link } from 'react-router-dom';
import { FaVideo, FaSearch, FaHeart } from 'react-icons/fa';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10 p-4 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 select-none hover:scale-105 transition-transform">
          <FaVideo className="text-red-600" />
          MOVIE-CINE
        </Link>

        {/* Search Bar */}
        <div className="relative w-full md:w-1/2 max-w-lg">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input 
            type="text"
            className="block w-full text-white bg-gray-900 border border-gray-700/50 rounded-full py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all shadow-inner"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Favorites Link */}
        <Link 
          to="/favorites" 
          className="flex items-center gap-2 text-white/80 hover:text-red-400 transition-colors font-semibold group bg-white/5 py-2 px-4 rounded-full border border-white/5 hover:border-red-500/30 hover:bg-red-500/10"
        >
          <FaHeart className="text-gray-400 group-hover:text-red-500 transition-colors" />
          My Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
