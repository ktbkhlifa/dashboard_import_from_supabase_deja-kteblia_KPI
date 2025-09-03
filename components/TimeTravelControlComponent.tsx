import React from 'react';
import { RefreshCw } from 'lucide-react';

interface TimeTravelControlProps {
  currentTimestamp: Date;
  onDateChange: (date: Date) => void;
  onHourChange: (hour: number) => void;
  onGoToLive: () => void;
}

const TimeTravelControl: React.FC<TimeTravelControlProps> = ({
  currentTimestamp,
  onDateChange,
  onHourChange,
  onGoToLive,
}) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    // N'ajustiw l'timezone bach tarikh maytbdlch
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + timezoneOffset);
    onDateChange(adjustedDate);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onHourChange(parseInt(e.target.value, 10));
  };

  const dateValue = currentTimestamp.toISOString().split('T')[0];
  const hourValue = currentTimestamp.getHours();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex-grow w-full md:w-auto">
        <label htmlFor="date-picker" className="block text-sm font-medium text-gray-700 mb-1">
          Select Date
        </label>
        <input
          type="date"
          id="date-picker"
          value={dateValue}
          min="2022-01-01"
          max="2022-12-31"
          onChange={handleDateChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex-grow w-full md:w-2/3">
        <label htmlFor="hour-slider" className="block text-sm font-medium text-gray-700 mb-1">
          Hour of the Day: {String(hourValue).padStart(2, '0')}:00
        </label>
        <input
          type="range"
          id="hour-slider"
          min="0"
          max="23"
          step="1"
          value={hourValue}
          onChange={handleHourChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <button
        onClick={onGoToLive}
        className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors w-full md:w-auto mt-4 md:mt-0"
      >
        <RefreshCw size={18} />
        <span>Go to Live</span>
      </button>
    </div>
  );
};

export default TimeTravelControl;
