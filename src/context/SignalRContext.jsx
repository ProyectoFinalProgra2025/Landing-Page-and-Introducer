import React, { createContext, useEffect, useState } from 'react';
import { signalRService } from '../services/signalrService';

export const SignalRContext = createContext(null);

export const SignalRProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState('Disconnected');

  useEffect(() => {
    let unsubscribeConnected, unsubscribeDisconnected, unsubscribeReconnecting;

    // Connect to SignalR on mount
    const initializeConnection = async () => {
      try {
        // Subscribe to connection state changes first
        unsubscribeConnected = signalRService.on('Connected', () => {
          setIsConnected(true);
          setConnectionState('Connected');
        });

        unsubscribeDisconnected = signalRService.on('Disconnected', () => {
          setIsConnected(false);
          setConnectionState('Disconnected');
        });

        unsubscribeReconnecting = signalRService.on('Reconnecting', () => {
          setIsConnected(false);
          setConnectionState('Reconnecting');
        });

        // Then connect
        await signalRService.connect();
      } catch (error) {
        console.error('Error connecting to SignalR:', error);
      }
    };

    initializeConnection();

    // Cleanup on unmount
    return () => {
      if (typeof unsubscribeConnected === 'function') {
        unsubscribeConnected();
      }
      if (typeof unsubscribeDisconnected === 'function') {
        unsubscribeDisconnected();
      }
      if (typeof unsubscribeReconnecting === 'function') {
        unsubscribeReconnecting();
      }
      signalRService.disconnect();
    };
  }, []);

  const value = {
    isConnected,
    connectionState,
    signalRService
  };

  return (
    <SignalRContext.Provider value={value}>
      {children}
    </SignalRContext.Provider>
  );
};
