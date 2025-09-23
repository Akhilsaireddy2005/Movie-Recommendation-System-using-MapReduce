import React from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

interface ChartPlaceholderProps {
  title: string;
  description: string;
  type: 'bar' | 'line' | 'pie';
}

const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({ title, description, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'bar':
        return <BarChart3 className="h-8 w-8 text-gray-400" />;
      case 'line':
        return <TrendingUp className="h-8 w-8 text-gray-400" />;
      case 'pie':
        return <PieChart className="h-8 w-8 text-gray-400" />;
      default:
        return <BarChart3 className="h-8 w-8 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        {description}
      </p>

      <div className="h-64 rounded-xl ring-1 ring-dashed ring-gray-300 dark:ring-gray-600 bg-gray-50 dark:bg-gray-700/50 relative overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            {getIcon()}
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Chart will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPlaceholder;