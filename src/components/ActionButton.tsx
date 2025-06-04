import React from 'react';
import { Play, Square, Loader } from 'lucide-react';

interface ActionButtonProps {
  action: 'start' | 'stop';
  isLoading: boolean;
  isRunning: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  action,
  isLoading,
  isRunning,
  onClick,
  disabled = false
}) => {
  const isStartButton = action === 'start';
  const isStopButton = action === 'stop';
  
  // Determine if this button should be active based on the running state
  const isActive = (isStartButton && !isRunning) || (isStopButton && isRunning);
  const isDisabled = disabled || !isActive || isLoading;
  
  // Determine styles based on button type and state
  const baseClasses = "relative flex items-center justify-center py-3 px-6 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50";
  
  let buttonClasses = baseClasses;
  
  if (isStartButton) {
    buttonClasses += isDisabled
      ? " bg-gray-200 text-gray-400 cursor-not-allowed"
      : " bg-green-500 hover:bg-green-600 text-white focus:ring-green-400 shadow-sm hover:shadow";
  } else {
    buttonClasses += isDisabled
      ? " bg-gray-200 text-gray-400 cursor-not-allowed"
      : " bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 shadow-sm hover:shadow";
  }
  
  // Determine the icon
  const Icon = isStartButton ? Play : Square;
  
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={buttonClasses}
    >
      {isLoading ? (
        <Loader size={20} className="animate-spin mr-2" />
      ) : (
        <Icon size={20} className="mr-2" />
      )}
      {isStartButton ? "Start" : "Stop"}
      
      {/* Subtle ripple animation on active buttons */}
      {!isDisabled && (
        <span className="absolute inset-0 rounded-lg overflow-hidden">
          <span className="absolute inset-0 rounded-lg opacity-0 hover:opacity-10 bg-white transition-opacity"></span>
        </span>
      )}
    </button>
  );
};

export default ActionButton;