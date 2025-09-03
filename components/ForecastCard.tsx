
import React from 'react';

interface ForecastCardProps {
  forecast: string;
  recommendation: string;
}

const ForecastIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const RecommendationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);


const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, recommendation }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md col-span-1 lg:col-span-2">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Forecast & Recommendations</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 p-2 rounded-full">
            <ForecastIcon />
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-200">Daily Forecast</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">{forecast}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 p-2 rounded-full">
            <RecommendationIcon />
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-200">Recommendations</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">{recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
