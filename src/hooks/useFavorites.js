import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const item = window.localStorage.getItem('cine-favorites');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.warn('Error reading localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('cine-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.warn('Error setting localStorage', error);
    }
  }, [favorites]);

  const toggleFavorite = (movie) => {
    setFavorites(prev => {
      const isFav = prev.find(m => m.id === movie.id);
      if (isFav) {
        return prev.filter(m => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const isFavorite = (movieId) => {
    return favorites.some(m => m.id === movieId);
  };

  return { favorites, toggleFavorite, isFavorite };
};
