
import React from 'react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md h-full">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">{title}</h3>
      <div className="h-72 w-full">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
