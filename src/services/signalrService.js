import * as signalR from '@microsoft/signalr';

class SignalRService {
  constructor() {
    this.connection = null;
    this.isConnected = false;
    this.listeners = {
      taskCreated: [],
      taskUpdated: [],
      taskDeleted: [],
      taskAssigned: [],
      taskAccepted: [],
      taskFinished: [],
      taskCancelled: [],
      statsUpdated: [],
      chatMessage: [],
      Connected: [],
      Disconnected: [],
      Reconnecting: []
    };
  }

  getToken() {
    // Try different token key names that might be used
    return localStorage.getItem('accessToken') || localStorage.getItem('token') || localStorage.getItem('authToken');
  }

  async connect() {
    if (this.connection && this.isConnected) {
      console.log('SignalR already connected');
      return;
    }

    const token = this.getToken();
    if (!token) {
      console.warn('No token available for SignalR - skipping connection');
      return;
    }

    const apiUrl = import.meta.env.VITE_SIGNALR_URL || 'http://localhost:5080';

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiUrl}/tareahub`, {
        accessTokenFactory: () => token,
        skipNegotiation: false,
        transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.ServerSentEvents | signalR.HttpTransportType.LongPolling
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          if (retryContext.elapsedMilliseconds < 60000) {
            return Math.random() * 10000;
          } else {
            return null;
          }
        }
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Configurar event listeners del hub
    this.connection.on('TareaCreada', (data) => {
      console.log('TareaCreada event:', data);
      this.emit('taskCreated', data);
    });

    this.connection.on('TareaActualizada', (data) => {
      console.log('TareaActualizada event:', data);
      this.emit('taskUpdated', data);
    });

    this.connection.on('TareaBorrada', (data) => {
      console.log('TareaBorrada event:', data);
      this.emit('taskDeleted', data);
    });

    this.connection.on('TareaAsignada', (data) => {
      console.log('TareaAsignada event:', data);
      this.emit('taskAssigned', data);
    });

    this.connection.on('TareaAceptada', (data) => {
      console.log('TareaAceptada event:', data);
      this.emit('taskAccepted', data);
    });

    this.connection.on('TareaFinalizada', (data) => {
      console.log('TareaFinalizada event:', data);
      this.emit('taskFinished', data);
    });

    this.connection.on('TareaCancelada', (data) => {
      console.log('TareaCancelada event:', data);
      this.emit('taskCancelled', data);
    });

    this.connection.on('EstadisticasActualizadas', (data) => {
      console.log('EstadisticasActualizadas event:', data);
      this.emit('statsUpdated', data);
    });

    // Connection lifecycle events
    this.connection.onreconnecting((error) => {
      this.isConnected = false;
      console.log('SignalR reconnecting...', error);
      this.emit('Reconnecting', { error });
    });

    this.connection.onreconnected((connectionId) => {
      this.isConnected = true;
      console.log('SignalR reconnected. Connection ID:', connectionId);
      this.emit('Connected', { connectionId });
    });

    this.connection.onclose((error) => {
      this.isConnected = false;
      console.log('SignalR connection closed', error);
      this.emit('Disconnected', { error });

      // Intentar reconectar después de 5 segundos
      setTimeout(() => {
        if (!this.isConnected) {
          console.log('Attempting to reconnect...');
          this.connect();
        }
      }, 5000);
    });

    // Iniciar conexión
    try {
      await this.connection.start();
      this.isConnected = true;
      console.log('SignalR Connected successfully');
      this.emit('Connected', { connectionId: this.connection.connectionId });
    } catch (err) {
      this.isConnected = false;
      console.error('SignalR Connection failed:', err);
      this.emit('Disconnected', { error: err });

      // Reintentar en 5 segundos
      setTimeout(() => {
        console.log('Retrying connection...');
        this.connect();
      }, 5000);
    }
  }

  async disconnect() {
    if (this.connection) {
      try {
        await this.connection.stop();
        this.connection = null;
        this.isConnected = false;
        console.log('SignalR disconnected');
      } catch (err) {
        console.error('Error disconnecting SignalR:', err);
      }
    }
  }

  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
      // Return unsubscribe function
      return () => this.off(event, callback);
    } else {
      console.warn(`Event ${event} is not supported`);
      return () => {}; // Return empty function for unsupported events
    }
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => {
        try {
          callback(data);
        } catch (err) {
          console.error(`Error in ${event} callback:`, err);
        }
      });
    }
  }

  getConnectionState() {
    if (!this.connection) return 'Disconnected';

    const states = {
      [signalR.HubConnectionState.Disconnected]: 'Disconnected',
      [signalR.HubConnectionState.Connecting]: 'Connecting',
      [signalR.HubConnectionState.Connected]: 'Connected',
      [signalR.HubConnectionState.Disconnecting]: 'Disconnecting',
      [signalR.HubConnectionState.Reconnecting]: 'Reconnecting'
    };

    return states[this.connection.state] || 'Unknown';
  }

  // Método para invocar métodos en el servidor (si el hub los expone)
  async invoke(methodName, ...args) {
    if (!this.connection || !this.isConnected) {
      throw new Error('SignalR is not connected');
    }

    try {
      return await this.connection.invoke(methodName, ...args);
    } catch (err) {
      console.error(`Error invoking ${methodName}:`, err);
      throw err;
    }
  }

  // Método para enviar mensajes al servidor (si el hub los expone)
  async send(methodName, ...args) {
    if (!this.connection || !this.isConnected) {
      throw new Error('SignalR is not connected');
    }

    try {
      await this.connection.send(methodName, ...args);
    } catch (err) {
      console.error(`Error sending ${methodName}:`, err);
      throw err;
    }
  }
}

// Singleton instance
export const signalRService = new SignalRService();

// Export class for testing
export default SignalRService;
