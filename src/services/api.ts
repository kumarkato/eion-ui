import { ApiRequest } from '../types';

// Simulated API delay (between 1-3 seconds)
const getRandomDelay = () => Math.floor(Math.random() * 2000) + 1000;


export const generateMacAddress = (): string => {
  const hexDigits = "0123456789ABCDEF";
  let macAddress = "";
  for (let i = 0; i < 6; i++) {
    let pair = "";
    for (let j = 0; j < 2; j++) {
      pair += hexDigits.charAt(Math.floor(Math.random() * 16));
    }
    macAddress += pair;
    if (i !== 5) macAddress += ":";
  }
  return macAddress;
};



export const sendApiRequest = async (action: 'start' | 'stop', id: string): Promise<ApiRequest> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    console.log(`Sending ${action} request for ID: ${id}`);
    
    setTimeout(() => {
      // Simulate occasional API failures (10% chance)
      if (Math.random() < 0.1) {
        reject(new Error(`Failed to ${action} process. Network error.`));
        return;
      }
      
      const response: ApiRequest = {
        id,
        timestamp: Date.now(),
        action,
        status: 'completed'
      };
      
      resolve(response);
    }, getRandomDelay());
  });
};