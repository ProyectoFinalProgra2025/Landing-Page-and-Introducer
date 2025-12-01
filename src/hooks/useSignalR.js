import { useEffect, useState, useCallback } from 'react';
import { signalRService } from '../services/signalrService';

/**
 * Hook para gestionar la conexión SignalR y suscribirse a eventos
 *
 * @returns {Object} - Estado de conexión y funciones de suscripción
 */
export const useSignalR = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState('Disconnected');

  useEffect(() => {
    // Conectar al montar
    signalRService.connect().then(() => {
      setIsConnected(signalRService.isConnected);
      setConnectionState(signalRService.getConnectionState());
    });

    // Polling para actualizar estado de conexión
    const interval = setInterval(() => {
      const connected = signalRService.isConnected;
      const state = signalRService.getConnectionState();

      if (connected !== isConnected) {
        setIsConnected(connected);
      }

      if (state !== connectionState) {
        setConnectionState(state);
      }
    }, 1000);

    // Cleanup: desconectar al desmontar
    return () => {
      clearInterval(interval);
      // No desconectamos aquí para mantener la conexión activa en toda la app
      // signalRService.disconnect();
    };
  }, []);

  /**
   * Suscribirse a un evento de SignalR
   *
   * @param {string} event - Nombre del evento
   * @param {function} callback - Función callback a ejecutar cuando el evento se dispare
   * @returns {function} - Función de cleanup para cancelar suscripción
   */
  const subscribe = useCallback((event, callback) => {
    signalRService.on(event, callback);

    // Retornar función de cleanup
    return () => {
      signalRService.off(event, callback);
    };
  }, []);

  /**
   * Invocar un método en el servidor
   */
  const invoke = useCallback(async (methodName, ...args) => {
    if (!isConnected) {
      throw new Error('SignalR is not connected');
    }
    return await signalRService.invoke(methodName, ...args);
  }, [isConnected]);

  /**
   * Enviar un mensaje al servidor
   */
  const send = useCallback(async (methodName, ...args) => {
    if (!isConnected) {
      throw new Error('SignalR is not connected');
    }
    await signalRService.send(methodName, ...args);
  }, [isConnected]);

  /**
   * Reconectar manualmente
   */
  const reconnect = useCallback(async () => {
    await signalRService.disconnect();
    await signalRService.connect();
  }, []);

  return {
    isConnected,
    connectionState,
    subscribe,
    invoke,
    send,
    reconnect
  };
};

/**
 * Hook especializado para eventos de tareas
 *
 * @param {function} onTaskCreated - Callback cuando se crea una tarea
 * @param {function} onTaskUpdated - Callback cuando se actualiza una tarea
 * @param {function} onTaskDeleted - Callback cuando se elimina una tarea
 */
export const useTaskEvents = ({ onTaskCreated, onTaskUpdated, onTaskDeleted, onTaskAssigned, onTaskAccepted, onTaskFinished, onTaskCancelled } = {}) => {
  const { subscribe, isConnected } = useSignalR();

  useEffect(() => {
    const unsubscribers = [];

    if (onTaskCreated) {
      const unsub = subscribe('taskCreated', onTaskCreated);
      unsubscribers.push(unsub);
    }

    if (onTaskUpdated) {
      const unsub = subscribe('taskUpdated', onTaskUpdated);
      unsubscribers.push(unsub);
    }

    if (onTaskDeleted) {
      const unsub = subscribe('taskDeleted', onTaskDeleted);
      unsubscribers.push(unsub);
    }

    if (onTaskAssigned) {
      const unsub = subscribe('taskAssigned', onTaskAssigned);
      unsubscribers.push(unsub);
    }

    if (onTaskAccepted) {
      const unsub = subscribe('taskAccepted', onTaskAccepted);
      unsubscribers.push(unsub);
    }

    if (onTaskFinished) {
      const unsub = subscribe('taskFinished', onTaskFinished);
      unsubscribers.push(unsub);
    }

    if (onTaskCancelled) {
      const unsub = subscribe('taskCancelled', onTaskCancelled);
      unsubscribers.push(unsub);
    }

    // Cleanup
    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, [subscribe, onTaskCreated, onTaskUpdated, onTaskDeleted, onTaskAssigned, onTaskAccepted, onTaskFinished, onTaskCancelled]);

  return { isConnected };
};

/**
 * Hook especializado para eventos de estadísticas
 */
export const useStatsEvents = (onStatsUpdated) => {
  const { subscribe, isConnected } = useSignalR();

  useEffect(() => {
    if (!onStatsUpdated) return;

    const unsubscribe = subscribe('statsUpdated', onStatsUpdated);

    return unsubscribe;
  }, [subscribe, onStatsUpdated]);

  return { isConnected };
};

export default useSignalR;
