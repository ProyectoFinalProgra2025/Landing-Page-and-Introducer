// Development utilities for handling API connection issues

export const isDevelopment = import.meta.env.MODE === 'development';

export const isNetworkError = (error) => {
  return (
    error?.code === 'ERR_NETWORK' ||
    error?.code === 'ERR_CONNECTION_REFUSED' ||
    error?.message?.includes('Network Error') ||
    error?.message?.includes('Connection refused')
  );
};

export const handleNetworkError = (error, context = '') => {
  if (isNetworkError(error)) {
    console.warn(`⚠️ ${context}: No se puede conectar al servidor backend.`);
    
    if (isDevelopment) {
      console.info(`
🔧 Para desarrollo:
1. Asegúrate de que el servidor backend esté ejecutándose
2. Verifica que el servidor esté en: ${import.meta.env.VITE_API_URL || 'http://localhost:5080/api'}
3. Si el servidor está en otro puerto, actualiza el archivo .env

La aplicación funcionará con datos locales mientras el servidor esté desconectado.
      `);
    }
  } else {
    console.error(`${context}:`, error);
  }
};

export const showConnectionStatus = () => {
  if (isDevelopment) {
    const checkConnection = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL || 'http://localhost:5080/api');
        console.log('✅ Conexión con el servidor backend: OK');
      } catch (error) {
        console.log('❌ Conexión con el servidor backend: FAIL');
        console.log('💡 Ejecuta tu servidor backend para funcionalidad completa');
      }
    };
    
    // Check connection after a short delay
    setTimeout(checkConnection, 1000);
  }
};