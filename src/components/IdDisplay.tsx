import React from 'react';
import { RefreshCw } from 'lucide-react';

interface IdDisplayProps {
  macAddress: string;
  onRegenerateId: () => void;
}

const IdDisplay: React.FC<IdDisplayProps> = ({ macAddress, onRegenerateId }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h2 className="text-sm text-gray-500 font-medium">MAC ADDRESSS</h2>
          <div className="flex items-center mt-1">
            <span className="text-2xl font-bold text-gray-800 tracking-wide font-mono">{macAddress}</span>
          </div>
        </div>
        {/* <button
          onClick={onRegenerateId}
          className="mt-3 sm:mt-0 flex items-center justify-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md px-3 py-2"
        >
          <RefreshCw size={16} className="mr-2" />
          Generate New ID
        </button> */}
      </div>
    </div>
  );
};

export default IdDisplay;