
import React from 'react';

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ current, total }) => {
  const progressPercentage = total > 0 ? (current / total) * 100 : 0;
  
  return (
    <div className="flex items-center gap-3 w-full">
        <div className="w-full bg-gray-700 rounded-full h-2">
            <div
                className="bg-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
       <div className="text-xs text-gray-400 font-semibold whitespace-nowrap">
          {current} / {total}
       </div>
    </div>
  );
};

export default ProgressIndicator;