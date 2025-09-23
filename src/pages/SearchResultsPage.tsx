import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { mockMovies } from '../data/mockData';

interface SearchResultsPageProps {
  query: string;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ query }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [results, setResults] = useState<typeof mockMovies>([]);
  const moviesPerPage = 12;

  useEffect(() => {
    // Simulate search functionality
    const searchResults = mockMovies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.toLowerCase().includes(query.toLowerCase())
    );
    
    // Sort results
    const sortedResults = [...searchResults].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        default:
          return 0;
      }
    });
    
    setResults(sortedResults);
    setCurrentPage(1);
  }, [query, sortBy]);

  const totalPages = Math.ceil(results.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentResults = results.slice(startIndex, startIndex + moviesPerPage);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-600 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Search className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Search Results
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Found <span className="font-semibold">{results.length}</span> results for "
          <span className="font-semibold text-blue-600 dark:text-blue-400">{query}</span>"
        </p>
      </div>

      {/* Search Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="title">Sort by Title</option>
            <option value="rating">Sort by Rating</option>
            <option value="year">Sort by Year</option>
          </select>
        </div>

        {results.length > 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1}-{Math.min(startIndex + moviesPerPage, results.length)} of {results.length} results
          </div>
        )}
      </div>

      {/* Search Results */}
      {results.length === 0 ? (
        <div className="text-center py-16">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            No results found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't find any movies matching "{query}". Try adjusting your search terms.
          </p>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p>• Check your spelling</p>
            <p>• Try different keywords</p>
            <p>• Use more general terms</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentResults.map((movie) => (
              <div key={movie.id} className="relative">
                <MovieCard movie={movie} showRatingButton />
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {movie.rating.toFixed(1)} ★
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Search Tips */}
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Search Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Movie Titles:</h4>
            <p>Search for complete or partial movie titles like "Dark Knight" or "Avengers"</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Genres:</h4>
            <p>Find movies by genre like "Action", "Comedy", "Drama", or "Sci-Fi"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;