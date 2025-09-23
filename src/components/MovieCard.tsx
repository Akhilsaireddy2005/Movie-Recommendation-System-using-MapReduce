import React, { useState } from 'react';
import { Star, Eye, Heart } from 'lucide-react';
import RatingModal from './RatingModal';

interface Movie {
  id: number;
  title: string;
  poster: string;
  genre: string;
  rating: number;
  year: number;
}

interface MovieCardProps {
  movie: Movie;
  showRatingButton?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, showRatingButton = false }) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-3 transition-opacity duration-300">
              <button className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200">
                <Eye className="h-5 w-5 text-white" />
              </button>
              <button className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200">
                <Heart className="h-5 w-5 text-white" />
              </button>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {movie.genre} • {movie.year}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(movie.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {movie.rating.toFixed(1)}
              </span>
            </div>
            
            {showRatingButton && (
              <button
                onClick={() => setShowRatingModal(true)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Rate
              </button>
            )}
          </div>
        </div>
      </div>

      {showRatingModal && (
        <RatingModal
          movie={movie}
          onClose={() => setShowRatingModal(false)}
        />
      )}
    </>
  );
};

export default MovieCard;