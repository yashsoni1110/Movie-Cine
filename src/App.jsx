import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { useDebounce } from './hooks/useDebounce';
import { useFavorites } from './hooks/useFavorites';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const favoritesHook = useFavorites();

  return (
    <Router>
      <div className="min-h-screen bg-[#0f1014] text-gray-100 font-sans selection:bg-red-500/30">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="max-w-[1920px] mx-auto">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  debouncedSearch={debouncedSearch} 
                  favoritesHook={favoritesHook} 
                />
              } 
            />
            <Route 
              path="/favorites" 
              element={<Favorites favoritesHook={favoritesHook} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
