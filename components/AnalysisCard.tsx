import React from 'react';
import { AnalysisComment } from '../lib/commentGenerator';

interface AnalysisCardProps {
  analyses: AnalysisComment[];
  selectedPlantName: string; // ✅ زدنا prop جديد
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ analyses, selectedPlantName }) => {
    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md h-full">
          {/* ✅ هنا كنستعملو اسم النبتة */}
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">{selectedPlantName} Crop Analysis</h3>
          <div className="space-y-4">
            {analyses.map(item => (
                <div className="flex items-start space-x-3" key={item.title}>
                    <div className="text-amber-500 pt-1 text-lg">💡</div>
                    <div>
                        <h4 className="font-semibold text-slate-700 dark:text-slate-200">{item.title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.text}</p>
                    </div>
                </div>
            ))}
          </div>
        </div>
    );
};

export default AnalysisCard;