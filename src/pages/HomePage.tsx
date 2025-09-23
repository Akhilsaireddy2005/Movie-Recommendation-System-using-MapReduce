import React, { useState } from 'react';
import { Search, TrendingUp, Star } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { mockMovies } from '../data/mockData';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSearch: (query: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
    onNavigate('search');
  };

  const trendingMovies = mockMovies.slice(0, 6);
  const topRecommended = mockMovies.slice(6, 12);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-800 dark:via-purple-800 dark:to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Movie Recommendation System
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover your next favorite movie with personalized recommendations
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar onSearch={handleSearch} placeholder="Search for movies by title or genre..." />
            </div>
          </div>
        </div>
      </div>

      {/* Trending Movies Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center mb-8">
          <TrendingUp className="h-6 w-6 text-orange-500 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trending Movies</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      {/* Top Recommendations Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Star className="h-6 w-6 text-yellow-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Top Recommendations</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {topRecommended.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to discover amazing movies?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Browse our complete collection and get personalized recommendations
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => onNavigate('movies')}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Browse Movies
          </button>
          <button
            onClick={() => onNavigate('recommendations')}
            className="px-8 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Get Recommendations
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;