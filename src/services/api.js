import axios from 'axios';

// URL base del backend - configurable via environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5080/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación y refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no hemos intentado refrescar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/Auth/refresh`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data.data;

          // Guardar los nuevos tokens
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          // Actualizar el header de autorización y reintentar la petición
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Si falla el refresh, limpiar tokens y redirigir al login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ============= AUTH ENDPOINTS =============

export const authService = {
  // Login
  login: async (email, password) => {
    const response = await api.post('/Auth/login', { email, password });
    return response.data;
  },

  // Registro de Admin General
  registerAdminGeneral: async (data) => {
    const response = await api.post('/Auth/register-admingeneral', data);
    return response.data;
  },

  // Registro de Admin Empresa (Prueba Gratis)
  registerAdminEmpresa: async (data) => {
    const response = await api.post('/Auth/register-adminempresa', data);
    return response.data;
  },

  // Refresh Token
  refreshToken: async (refreshToken) => {
    const response = await api.post('/Auth/refresh', { refreshToken });
    return response.data;
  },

  // Logout
  logout: async (refreshToken) => {
    const response = await api.post('/Auth/logout', { refreshToken });
    return response.data;
  },
};

// ============= EMPRESAS ENDPOINTS =============

export const empresasService = {
  // Obtener todas las empresas (con filtro opcional de estado)
  getEmpresas: async (estado = null) => {
    const params = estado ? { estado } : {};
    const response = await api.get('/Empresas', { params });
    return response.data.data;
  },

  // Aprobar empresa
  aprobarEmpresa: async (id) => {
    const response = await api.put(`/Empresas/${id}/aprobar`);
    return response.data.data;
  },

  // Rechazar empresa
  rechazarEmpresa: async (id) => {
    const response = await api.put(`/Empresas/${id}/rechazar`);
    return response.data.data;
  },

  // Obtener estadísticas de empresa
  getEstadisticas: async (id) => {
    const response = await api.get(`/Empresas/${id}/estadisticas`);
    return response.data.data;
  },

  // Eliminar empresa
  eliminarEmpresa: async (id) => {
    const response = await api.delete(`/Empresas/${id}`);
    return response.data.data;
  },
};

// ============= USUARIOS ENDPOINTS =============

export const usuariosService = {
  // Obtener información del usuario actual
  getMe: async () => {
    const response = await api.get('/Usuarios/me');
    return response.data.data;
  },

  // Obtener todos los usuarios
  getUsuarios: async () => {
    const response = await api.get('/Usuarios');
    return response.data.data;
  },

  // Obtener usuario por ID
  getUsuario: async (id) => {
    const response = await api.get(`/Usuarios/${id}`);
    return response.data.data;
  },

  // Crear usuario
  createUsuario: async (data) => {
    const response = await api.post('/Usuarios', data);
    return response.data.data;
  },

  // Actualizar usuario
  updateUsuario: async (id, data) => {
    const response = await api.put(`/Usuarios/${id}`, data);
    return response.data.data;
  },

  // Eliminar usuario
  deleteUsuario: async (id) => {
    const response = await api.delete(`/Usuarios/${id}`);
    return response.data.data;
  },

  // Actualizar capacidades de un usuario
  updateCapacidadesUsuario: async (id, capacidades) => {
    const response = await api.put(`/Usuarios/${id}/capacidades`, { capacidades });
    return response.data.data;
  },
};

// ============= ENDPOINTS ADICIONALES PARA EMPRESAS =============

export const empresasExtendedService = {
  // Obtener IDs de trabajadores de una empresa
  getTrabajadoresIds: async (empresaId) => {
    const response = await api.get(`/Empresas/${empresaId}/trabajadores-ids`);
    return response.data.data;
  },
};

// ============= TAREAS ENDPOINTS =============

export const tareasService = {
  // Crear tarea
  create: async (data) => {
    const response = await api.post('/Tareas', data);
    return response.data;
  },

  // Listar tareas (con filtros)
  getAll: async (filters = {}) => {
    const response = await api.get('/Tareas', { params: filters });
    return response.data.data;
  },

  // Obtener tarea por ID
  getById: async (id) => {
    const response = await api.get(`/Tareas/${id}`);
    return response.data.data;
  },

  // Asignar manual
  asignarManual: async (id, usuarioId) => {
    const response = await api.put(`/Tareas/${id}/asignar-manual`, { usuarioId });
    return response.data;
  },

  // Asignar automático
  asignarAutomatico: async (id, forzarReasignacion = false) => {
    const response = await api.put(`/Tareas/${id}/asignar-automatico`, { forzarReasignacion });
    return response.data;
  },

  // Aceptar tarea
  aceptar: async (id) => {
    const response = await api.put(`/Tareas/${id}/aceptar`);
    return response.data;
  },

  // Mis tareas
  getMis: async (filters = {}) => {
    const response = await api.get('/Tareas/mis', { params: filters });
    return response.data.data;
  },

  // Finalizar tarea
  finalizar: async (id, data) => {
    const response = await api.put(`/Tareas/${id}/finalizar`, data);
    return response.data;
  },

  // Cancelar tarea
  cancelar: async (id, motivo) => {
    const response = await api.put(`/Tareas/${id}/cancelar`, JSON.stringify(motivo), {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  },

  // Delegar tarea
  delegar: async (id, data) => {
    const response = await api.put(`/Tareas/${id}/delegar`, data);
    return response.data;
  },

  // Aceptar delegación
  aceptarDelegacion: async (id, data) => {
    const response = await api.put(`/Tareas/${id}/aceptar-delegacion`, data);
    return response.data;
  },

  // Rechazar delegación
  rechazarDelegacion: async (id, data) => {
    const response = await api.put(`/Tareas/${id}/rechazar-delegacion`, data);
    return response.data;
  },
};

export default api;
