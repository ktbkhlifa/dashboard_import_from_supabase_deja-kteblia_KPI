import React from 'react';
import { AnnualMetrics } from '../types';

const WaterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V5m0 14v-3m-7.071-7.071l2.121 2.121m10-2.121l-2.121 2.121M4 12H1m22 0h-3m-7.071 7.071l2.121-2.121m-10-2.121l-2.121-2.121" />
    </svg>
);

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);


const AnnualMetricsCard: React.FC<{ metrics: AnnualMetrics | null }> = ({ metrics }) => {
  if (!metrics) return null;

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md h-full">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Annual Performance</h3>
      <div className="space-y-5">
        <div className="flex items-center">
            <div className="bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 p-3 rounded-full mr-4"><WaterIcon /></div>
            <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Annual Water Savings</p>
                <p className="font-bold text-xl text-slate-700 dark:text-slate-200">{metrics.annualWaterSavingsPercentage}%</p>
            </div>
        </div>
        <div className="flex items-center">
            <div className="bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 p-3 rounded-full mr-4"><SunIcon /></div>
            <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">DLI under Panels</p>
                <p className="font-bold text-xl text-slate-700 dark:text-slate-200">{metrics.avgDliUnderPanels} <span className="text-sm font-normal">mol/m²/day</span></p>
            </div>
        </div>
        <div className="flex items-center">
            <div className="bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 p-3 rounded-full mr-4"><SunIcon /></div>
            <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">DLI in Open Field</p>
                <p className="font-bold text-xl text-slate-700 dark:text-slate-200">{metrics.avgDliInOpenField} <span className="text-sm font-normal">mol/m²/day</span></p>
            </div>
        </div>
      </div>
    </div>
  );
};
export default AnnualMetricsCard;
