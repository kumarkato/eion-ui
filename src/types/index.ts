export interface ApiStatus {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export interface ApiRequest {
  id: string;
  timestamp: number;
  action: 'start' | 'stop';
  status: 'pending' | 'completed' | 'failed';
}