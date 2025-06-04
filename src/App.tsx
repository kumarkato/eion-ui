import { useState, useEffect } from 'react';
import IdDisplay from './components/IdDisplay';
import ActionButton from './components/ActionButton';
import StatusIndicator from './components/StatusIndicator';
import RequestHistory from './components/RequestHistory';
import { useApiCall } from './hooks/useApiCall';
import { generateMacAddress } from './services/api';

function App() {
  const [processId, setProcessId] = useState<string>(generateMacAddress());
  const { apiStatus, isRunning, history, callApi } = useApiCall();

  const handleStart = async () => {
    if (isRunning) return;
    await callApi('start', processId);
  };

  const handleStop = async () => {
    if (!isRunning) return;
    await callApi('stop', processId);
  };

  const handleRegenerateId = () => {
    if (!isRunning) {
      setProcessId(generateMacAddress());
    }
  };

  useEffect(() => {
    document.title = 'API Control Panel';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-3">
            Control Panel
          </h1>
          {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your API processes with real-time status updates and comprehensive control
          </p> */}
        </header>

        <main className="space-y-8">
          {/* Main Control Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - ID and Status */}
              <div className="space-y-6">
                <IdDisplay macAddress={processId} onRegenerateId={handleRegenerateId} />
                <StatusIndicator status={apiStatus} isRunning={isRunning} />
              </div>

              {/* Right Column without flex */}
              <div className="space-y-4 justify-center">
                <ActionButton
                  action="start"
                  isLoading={apiStatus.status === 'loading' && !isRunning}
                  isRunning={isRunning}
                  onClick={handleStart}
                  disabled={apiStatus.status === 'loading'}
                />
                <ActionButton
                  action="stop"
                  isLoading={apiStatus.status === 'loading' && isRunning}
                  isRunning={isRunning}
                  onClick={handleStop}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Request History</h2>
            <RequestHistory history={history} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;