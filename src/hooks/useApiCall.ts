import { useEffect, useRef, useState } from 'react';
import mqtt, { MqttClient } from 'mqtt';
import { ApiStatus, ApiRequest } from '../types';
import { sendApiRequest } from '../services/api';

export const useApiCall = () => {
  const [apiStatus, setApiStatus] = useState<ApiStatus>({ status: 'idle' });
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [history, setHistory] = useState<ApiRequest[]>([]);
  const mqttClientRef = useRef<MqttClient | null>(null);

  // Publish MQTT message safely
  const publishMqttMessage = (message: string) => {
    const client = mqttClientRef.current;
    if (client && client.connected) {
      client.publish('my/test/topic/sample', message);
    } else {
      console.warn('⚠️ MQTT not connected');
    }
  };

  const callApi = async (action: 'start' | 'stop', id: string) => {
    setApiStatus({ status: 'loading', message: `${action === 'start' ? 'Starting' : 'Stopping'} process...` });

    try {
      const request: ApiRequest = {
        id,
        timestamp: Date.now(),
        action,
        status: 'pending',
      };

      setHistory(prev => [request, ...prev]);

      const response = await sendApiRequest(action, id);

      setHistory(prev =>
        prev.map(item =>
          item.id === id && item.timestamp === request.timestamp ? response : item
        )
      );

      setApiStatus({
        status: 'success',
        message: `Process ${action === 'start' ? 'started' : 'stopped'} successfully`,
      });

      setIsRunning(action === 'start');

      publishMqttMessage(
        JSON.stringify({
          id,
          action,
          status: 'completed',
          timestamp: Date.now(),
        })
      );

      return response;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

      setHistory(prev =>
        prev.map(item =>
          item.id === id && item.action === action && item.status === 'pending'
            ? { ...item, status: 'failed' }
            : item
        )
      );

      setApiStatus({ status: 'error', message: errorMessage });

      publishMqttMessage(
        JSON.stringify({
          id,
          action,
          status: 'failed',
          error: errorMessage,
          timestamp: Date.now(),
        })
      );

      return null;
    }
  };

  useEffect(() => {
    const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt');
    mqttClientRef.current = client;

    client.on('connect', () => {
      console.log('✅ Connected to MQTT broker');
      const topic = 'my/test/topic/sample';

      client.subscribe(topic, (err, granted:any) => {
        if (err) {
          console.error(`❌ Subscription error for topic "${topic}":`, err);
        } else {
          console.log(`📡 Subscribed to topic: ${granted[0]?.topic}`);
        }
      });
    });

    client.on('message', (topic, message) => {
      console.log(`📥 Message received on topic "${topic}": ${message.toString()}`);
    });

    client.on('error', (err) => {
      console.error('❌ MQTT Error:', err);
    });

    client.on('close', () => {
      console.warn('🔌 MQTT connection closed');
    });

    return () => {
      client.end(true, () => {
        console.log('👋 MQTT client disconnected');
      });
    };
  }, []);

  return {
    apiStatus,
    isRunning,
    history,
    callApi,
    resetStatus: () => setApiStatus({ status: 'idle' }),
  };
};
