import { useState, useEffect } from 'react';
import { authService, usuariosService } from '../services/api';
import { AuthContext } from '../hooks/useAuth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay sesión activa al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
          
          // Opcional: Validar el token obteniendo info del usuario
          try {
            const userData = await usuariosService.getMe();
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          } catch (error) {
            console.error('Error validando token:', error);
          }
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      // Guardar tokens (extraer de data.tokens)
      localStorage.setItem('accessToken', response.data.tokens.accessToken);
      localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
      
      // El usuario ya viene en la respuesta de login
      const userData = response.data.usuario;
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Error al iniciar sesión',
      };
    }
  };

  const registerAdminGeneral = async (data) => {
    try {
      const response = await authService.registerAdminGeneral(data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error en registro:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Error al registrar',
      };
    }
  };

  const registerAdminEmpresa = async (data) => {
    try {
      const response = await authService.registerAdminEmpresa(data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error en registro de empresa:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Error al registrar empresa',
      };
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Limpiar todo
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    registerAdminGeneral,
    registerAdminEmpresa,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
