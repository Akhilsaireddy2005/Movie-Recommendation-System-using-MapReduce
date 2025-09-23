import React, { useState } from 'react';
import { User, Star, Edit3, Trash2, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockMovies } from '../data/mockData';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState('ratings');

  if (!isLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Please log in to view your profile
        </h2>
        <button
          onClick={() => onNavigate('login')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Log In
        </button>
      </div>
    );
  }

  // Mock user ratings and recommendations
  const userRatings = mockMovies.slice(0, 8).map(movie => ({
    ...movie,
    userRating: Math.floor(Math.random() * 5) + 1,
    ratedAt: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()
  }));

  const userRecommendations = mockMovies.slice(8, 16);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white p-8 mb-8">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <User className="h-12 w-12" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
            <p className="text-blue-100 mb-2">{user?.email}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span>{userRatings.length} movies rated</span>
              <span>•</span>
              <span>Member since Jan 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
        <button
          onClick={() => setActiveTab('ratings')}
          className={`px-6 py-3 font-medium ${
            activeTab === 'ratings'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          My Ratings
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-6 py-3 font-medium ${
            activeTab === 'recommendations'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Past Recommendations
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'ratings' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Movie Ratings
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {userRatings.length} movies rated
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userRatings.map((movie) => (
              <div key={movie.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex space-x-4">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-16 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {movie.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {movie.genre} • {movie.year}
                    </p>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Your rating:</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < movie.userRating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Rated on {movie.ratedAt}
                    </p>
                    
                    <div className="flex space-x-2">
                      <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200">
                        <Edit3 className="h-3 w-3" />
                        <span>Edit</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-200">
                        <Trash2 className="h-3 w-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Past Recommendations
            </h2>
            <button
              onClick={() => onNavigate('recommendations')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              Get New Recommendations
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userRecommendations.map((movie) => (
              <div key={movie.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {movie.genre} • {movie.year}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {movie.rating.toFixed(1)}
                      </span>
                    </div>
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors duration-200">
                      <Eye className="h-3 w-3" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;