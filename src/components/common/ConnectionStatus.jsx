import { useState, useEffect } from 'react';
import { isNetworkError } from '../../utils/devUtils';

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check connection periodically
    const checkConnection = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5080/api'}/health`, {
          method: 'GET',
          timeout: 5000
        });
        
        if (response.ok) {
          if (!isOnline) {
            setIsOnline(true);
            setShowBanner(false);
          }
        } else {
          throw new Error('Server not available');
        }
      } catch (error) {
        if (isNetworkError(error) && isOnline) {
          setIsOnline(false);
          setShowBanner(true);
        }
      }
    };

    // Check immediately
    checkConnection();

    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, [isOnline]);

  if (!showBanner) {
    return null;
  }

  return (
    <div className="bg-yellow-500 text-white px-4 py-2 text-center text-sm">
      <div className="flex items-center justify-center space-x-2">
        <span className="animate-pulse">⚠️</span>
        <span>
          Sin conexión al servidor. Algunas funciones pueden no estar disponibles.
        </span>
        <button
          onClick={() => setShowBanner(false)}
          className="ml-4 text-yellow-200 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ConnectionStatus;