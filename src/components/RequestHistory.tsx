import React from 'react';
import { ApiRequest } from '../types';
import { Clock, Check, X } from 'lucide-react';

interface RequestHistoryProps {
  history: ApiRequest[];
}

const RequestHistory: React.FC<RequestHistoryProps> = ({ history }) => {
  if (!history.length) {
    return null;
  }
  
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="text-blue-500" />;
      case 'completed':
        return <Check size={16} className="text-green-500" />;
      case 'failed':
        return <X size={16} className="text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Request History</h3>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
          {history.map((request, index) => (
            <li key={`${request.id}-${request.timestamp}`} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="mr-3">
                    {getStatusIcon(request.status)}
                  </span>
                  <div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-800 mr-2">
                        {request.action === 'start' ? 'Started' : 'Stopped'}
                      </span>
                      <span className="text-xs font-mono text-gray-500">
                        {request.id}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatTime(request.timestamp)}
                    </span>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  request.status === 'completed' 
                    ? 'bg-green-100 text-green-700' 
                    : request.status === 'pending' 
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-red-100 text-red-700'
                }`}>
                  {request.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RequestHistory;