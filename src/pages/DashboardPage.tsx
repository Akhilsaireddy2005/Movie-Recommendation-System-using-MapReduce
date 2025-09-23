import React from 'react';
import { BarChart3, Users, Film, Star, TrendingUp, Award, Filter } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import ChartPlaceholder from '../components/ChartPlaceholder';

const DashboardPage: React.FC = () => {
  const stats = [
    { title: 'Total Users', value: '1,234', icon: Users, color: 'blue' as const },
    { title: 'Total Movies', value: '5,678', icon: Film, color: 'green' as const },
    { title: 'Total Ratings', value: '12,345', icon: Star, color: 'yellow' as const },
    { title: 'Active Users', value: '456', icon: TrendingUp, color: 'purple' as const },
  ];

  const topMovies = [
    { title: 'The Shawshank Redemption', rating: 4.9, votes: 1234 },
    { title: 'The Godfather', rating: 4.8, votes: 1156 },
    { title: 'The Dark Knight', rating: 4.7, votes: 1089 },
    { title: 'Pulp Fiction', rating: 4.6, votes: 987 },
    { title: 'The Lord of the Rings', rating: 4.5, votes: 876 },
  ];

  const activeUsers = [
    { name: 'Alice Johnson', ratings: 156, lastActive: '2 hours ago' },
    { name: 'Bob Smith', ratings: 134, lastActive: '4 hours ago' },
    { name: 'Carol Wilson', ratings: 128, lastActive: '1 day ago' },
    { name: 'David Brown', ratings: 112, lastActive: '2 days ago' },
    { name: 'Eve Davis', ratings: 98, lastActive: '3 days ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <div className="mr-3 p-2 rounded-xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 ring-1 ring-blue-500/20 dark:from-blue-500/10 dark:to-purple-500/10">
              <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Overview of user activity and movie performance metrics
              </p>
            </div>
          </div>
          {/* Quick Filters (non-functional placeholders) */}
          <div className="inline-flex items-center gap-2">
            <span className="hidden md:inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-700">
              <Filter className="h-3.5 w-3.5 mr-1.5" />
              Filters
            </span>
            <div className="inline-flex rounded-xl ring-1 ring-gray-200 dark:ring-gray-700 p-1 bg-white dark:bg-gray-800">
              <button className="px-3 py-1.5 text-sm rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm">
                7d
              </button>
              <button className="px-3 py-1.5 text-sm rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                30d
              </button>
              <button className="px-3 py-1.5 text-sm rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                90d
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartPlaceholder
          title="User Ratings Over Time"
          description="Monthly rating activity"
          type="line"
        />
        <ChartPlaceholder
          title="Movies by Genre"
          description="Distribution of movie genres"
          type="pie"
        />
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Rated Movies */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
          <div className="flex items-center mb-6">
            <Award className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Top 5 Rated Movies
            </h2>
          </div>
          <div className="space-y-4">
            {topMovies.map((movie, index) => (
              <div key={index} className="group p-4 bg-gray-50 dark:bg-gray-700 rounded-lg ring-1 ring-gray-100 dark:ring-gray-600 hover:bg-white dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-yellow-700 dark:text-yellow-300">
                      {index + 1}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700">{movie.votes} votes</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-200 dark:ring-emerald-800">
                        Popular
                      </span>
                    </div>
                  </div>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200 text-sm font-semibold">
                      <Star className="h-4 w-4 mr-1" />
                      {movie.rating}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    {/* map rating to discrete width classes to avoid inline styles */}
                    <div className={`h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full ${(() => {
                      const pct = Math.round((movie.rating / 5) * 10) * 10;
                      const widths = ['w-[0%]','w-[10%]','w-[20%]','w-[30%]','w-[40%]','w-[50%]','w-[60%]','w-[70%]','w-[80%]','w-[90%]','w-[100%]'];
                      const idx = Math.min(10, Math.max(0, Math.round(pct / 10)));
                      return widths[idx];
                    })()}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Active Users */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
          <div className="flex items-center mb-6">
            <Users className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Most Active Users
            </h2>
          </div>
          <div className="space-y-4">
            {activeUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg ring-1 ring-gray-100 dark:ring-gray-600 hover:bg-white dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </h3>
                    <div className="text-xs text-gray-500 dark:text-gray-300 inline-flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700">Last active: {user.lastActive}</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-200 dark:ring-indigo-800">Top Rater</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {user.ratings}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    ratings
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;