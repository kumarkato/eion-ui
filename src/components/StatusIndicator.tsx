import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { ApiStatus } from '../types';

interface StatusIndicatorProps {
  status: ApiStatus;
  isRunning: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, isRunning }) => {
  if (status.status === 'idle' && !isRunning) {
    return null;
  }
  
  const getStatusDetails = () => {
    switch (status.status) {
      case 'loading':
        return {
          icon: <Clock size={20} className="text-blue-500" />,
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-100'
        };
      case 'success':
        return {
          icon: <CheckCircle size={20} className="text-green-500" />,
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          borderColor: 'border-green-100'
        };
      case 'error':
        return {
          icon: <AlertCircle size={20} className="text-red-500" />,
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          borderColor: 'border-red-100'
        };
      default:
        return {
          icon: null,
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-100'
        };
    }
  };
  
  const { icon, bgColor, textColor, borderColor } = getStatusDetails();
  
  // Show running indicator if the process is running and not in a loading state
  const showRunningIndicator = isRunning && status.status !== 'loading';
  
  return (
    <div className="mb-6">
      {/* API Call Status */}
      {status.status !== 'idle' && status.message && (
        <div className={`p-4 rounded-lg border ${bgColor} ${borderColor} mb-4 flex items-start animate-fadeIn`}>
          <div className="mr-3 mt-0.5">
            {icon}
          </div>
          <div className={`${textColor} font-medium`}>
            {status.message}
          </div>
        </div>
      )}
      
      {/* Running Status Indicator */}
      {showRunningIndicator && (
        <div className="flex items-center mt-2">
          <div className="h-3 w-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-sm font-medium text-green-700">Process is currently running</span>
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;