import React from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useSignalR } from '../../hooks/useSignalR';

/**
 * RealtimeIndicator Component - Indicador de conexión en tiempo real
 *
 * @param {Object} props
 * @param {'inline'|'badge'|'full'} props.variant - Variante de visualización
 * @param {boolean} props.showReconnect - Mostrar botón de reconexión
 * @param {string} props.className - Clases adicionales
 */
const RealtimeIndicator = ({
  variant = 'badge',
  showReconnect = true,
  className = ''
}) => {
  const { isConnected, connectionState, reconnect } = useSignalR();

  // Variant: Inline (solo ícono)
  if (variant === 'inline') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {isConnected ? (
          <Wifi className="h-4 w-4 text-green-600 animate-pulse" />
        ) : (
          <WifiOff className="h-4 w-4 text-red-600" />
        )}
      </div>
    );
  }

  // Variant: Badge (compacto con texto)
  if (variant === 'badge') {
    return (
      <div
        className={`
          inline-flex items-center gap-2 px-3 py-1 border-2 border-black text-xs font-black uppercase
          ${isConnected ? 'bg-green-300 text-black' : 'bg-red-300 text-black'}
          ${className}
        `}
      >
        {isConnected ? (
          <>
            <Wifi className="h-3 w-3" />
            <span>En Vivo</span>
          </>
        ) : (
          <>
            <WifiOff className="h-3 w-3" />
            <span>Desconectado</span>
          </>
        )}
      </div>
    );
  }

  // Variant: Full (completo con reconexión)
  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-2 border-2 border-black
        ${isConnected ? 'bg-green-100' : 'bg-red-100'}
        ${className}
      `}
    >
      <div className="flex items-center gap-2">
        {isConnected ? (
          <>
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <Wifi className="h-5 w-5 text-green-700" />
          </>
        ) : (
          <>
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <WifiOff className="h-5 w-5 text-red-700" />
          </>
        )}
        <div className="flex flex-col">
          <span className="text-xs font-black uppercase tracking-wider">
            {isConnected ? 'Conectado' : 'Desconectado'}
          </span>
          <span className="text-xs font-bold text-gray-600">
            Estado: {connectionState}
          </span>
        </div>
      </div>

      {showReconnect && !isConnected && (
        <button
          onClick={reconnect}
          className="ml-auto px-3 py-1 bg-black text-white border-2 border-black text-xs font-black uppercase hover:bg-gray-800 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

/**
 * Connection Status Banner - Banner de estado de conexión
 */
export const ConnectionStatusBanner = () => {
  const { isConnected, reconnect } = useSignalR();
  const [dismissed, setDismissed] = React.useState(false);

  // Solo mostrar cuando está desconectado y no fue dismissed
  if (isConnected || dismissed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 border-b-4 border-black p-4 animate-slide-down">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <WifiOff className="h-6 w-6 text-white" />
          <div>
            <p className="text-white font-black text-sm uppercase">
              Sin conexión en tiempo real
            </p>
            <p className="text-white text-xs font-bold opacity-90">
              Los cambios no se actualizarán automáticamente
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={reconnect}
            className="px-4 py-2 bg-white text-black border-2 border-black font-black text-xs uppercase hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reconectar
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="px-4 py-2 bg-black text-white border-2 border-black font-black text-xs uppercase hover:bg-gray-800 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Realtime Activity Indicator - Punto pulsante para actividad
 */
export const RealtimeActivityIndicator = ({ isActive = false, size = 'md' }) => {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className={`relative ${sizes[size]}`}>
      <div
        className={`
          absolute inset-0 rounded-full
          ${isActive ? 'bg-green-500 animate-ping' : 'bg-gray-400'}
        `}
      />
      <div
        className={`
          relative rounded-full h-full w-full border border-black
          ${isActive ? 'bg-green-500' : 'bg-gray-400'}
        `}
      />
    </div>
  );
};

/**
 * Connection Stats - Estadísticas de conexión
 */
export const ConnectionStats = () => {
  const { isConnected, connectionState } = useSignalR();
  const [uptime, setUptime] = React.useState(0);

  React.useEffect(() => {
    let interval;
    if (isConnected) {
      interval = setInterval(() => {
        setUptime(prev => prev + 1);
      }, 1000);
    } else {
      setUptime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected]);

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  return (
    <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      <h4 className="text-sm font-black uppercase mb-3 text-black">
        Estado de Conexión
      </h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="font-bold text-gray-600">Estado:</span>
          <span className={`font-black uppercase ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
            {connectionState}
          </span>
        </div>
        {isConnected && (
          <div className="flex justify-between">
            <span className="font-bold text-gray-600">Tiempo activo:</span>
            <span className="font-black text-black">
              {formatUptime(uptime)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealtimeIndicator;
