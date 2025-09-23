import React, { useState } from 'react';
import { Star, Filter, RefreshCw } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { mockMovies, genres } from '../data/mockData';

const RecommendationsPage: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const getRecommendations = () => {
    if (selectedGenre === 'all') {
      return mockMovies.slice(0, 8);
    }
    return mockMovies
      .filter(movie => movie.genre.toLowerCase() === selectedGenre)
      .slice(0, 8);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const recommendations = getRecommendations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center mb-4">
          <Star className="h-8 w-8 text-yellow-500 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Personalized Recommendations
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Based on your viewing history and preferences, here are movies we think you'll love
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre.toLowerCase()}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Refreshing...' : 'Refresh Recommendations'}</span>
        </button>
      </div>

      {/* Recommendation Algorithm Info */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          How we recommend movies:
        </h2>
        <ul className="text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Analysis of your previous ratings and preferences</li>
          <li>• Similar user behavior patterns</li>
          <li>• Genre preferences and trending content</li>
          <li>• Advanced machine learning algorithms</li>
        </ul>
      </div>

      {/* Recommendations Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="w-full h-64 bg-gray-300 dark:bg-gray-700"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {recommendations.map((movie, index) => (
              <div key={movie.id} className="relative">
                <div className="absolute -top-2 -left-2 bg-yellow-500 text-white text-sm font-bold px-2 py-1 rounded-full z-10">
                  #{index + 1}
                </div>
                <MovieCard movie={movie} showRatingButton />
              </div>
            ))}
          </div>

          {/* Why These Recommendations */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Why these recommendations?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Based on your ratings:</h4>
                <p>You've shown a preference for action and sci-fi movies with high ratings.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Similar users also liked:</h4>
                <p>Users with similar taste patterns have highly rated these selections.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendationsPage;