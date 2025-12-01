import api from './api';

/**
 * Servicio completo para gestión de tareas
 * Extiende y mejora el servicio existente en api.js
 */
export const tasksService = {
  /**
   * Obtener todas las tareas con filtros opcionales
   */
  getAll: async (params = {}) => {
    const { estado, prioridad, departamento, asignadoA, creadoPor, busqueda } = params;
    const queryParams = {};

    if (estado !== undefined && estado !== null) queryParams.estado = estado;
    if (prioridad !== undefined && prioridad !== null) queryParams.prioridad = prioridad;
    if (departamento !== undefined && departamento !== null) queryParams.departamento = departamento;
    if (asignadoA) queryParams.asignadoA = asignadoA;
    if (creadoPor) queryParams.creadoPor = creadoPor;
    if (busqueda) queryParams.busqueda = busqueda;

    const response = await api.get('/Tareas', { params: queryParams });
    return response.data.data || response.data;
  },

  /**
   * Obtener mis tareas asignadas
   */
  getMyTasks: async (params = {}) => {
    const response = await api.get('/Tareas/mis', { params });
    return response.data.data || response.data;
  },

  /**
   * Obtener una tarea por ID
   */
  getById: async (id) => {
    const response = await api.get(`/Tareas/${id}`);
    return response.data.data || response.data;
  },

  /**
   * Crear una nueva tarea
   */
  create: async (taskData) => {
    const response = await api.post('/Tareas', taskData);
    return response.data.data || response.data;
  },

  /**
   * Actualizar una tarea existente
   */
  update: async (id, taskData) => {
    const response = await api.put(`/Tareas/${id}`, taskData);
    return response.data.data || response.data;
  },

  /**
   * Eliminar una tarea
   */
  delete: async (id) => {
    const response = await api.delete(`/Tareas/${id}`);
    return response.data.data || response.data;
  },

  /**
   * Asignar tarea manualmente a un usuario
   */
  assignManual: async (id, usuarioId) => {
    const response = await api.put(`/Tareas/${id}/asignar-manual`, { usuarioId });
    return response.data.data || response.data;
  },

  /**
   * Asignar tarea automáticamente
   */
  assignAutomatic: async (id, forzarReasignacion = false) => {
    const response = await api.put(`/Tareas/${id}/asignar-automatico`, { forzarReasignacion });
    return response.data.data || response.data;
  },

  /**
   * Aceptar una tarea asignada
   */
  accept: async (id) => {
    const response = await api.put(`/Tareas/${id}/aceptar`);
    return response.data.data || response.data;
  },

  /**
   * Finalizar una tarea
   */
  finish: async (id, evidencia = {}) => {
    const response = await api.put(`/Tareas/${id}/finalizar`, evidencia);
    return response.data.data || response.data;
  },

  /**
   * Cancelar una tarea
   */
  cancel: async (id, motivo) => {
    const response = await api.put(`/Tareas/${id}/cancelar`, JSON.stringify(motivo), {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data.data || response.data;
  },

  /**
   * Delegar una tarea a otro usuario
   */
  delegate: async (id, data) => {
    const response = await api.put(`/Tareas/${id}/delegar`, data);
    return response.data.data || response.data;
  },

  /**
   * Aceptar una delegación
   */
  acceptDelegation: async (id, data) => {
    const response = await api.put(`/Tareas/${id}/aceptar-delegacion`, data);
    return response.data.data || response.data;
  },

  /**
   * Rechazar una delegación
   */
  rejectDelegation: async (id, data) => {
    const response = await api.put(`/Tareas/${id}/rechazar-delegacion`, data);
    return response.data.data || response.data;
  },

  /**
   * Obtener evidencias de una tarea
   */
  getEvidences: async (id) => {
    try {
      const response = await api.get(`/Tareas/${id}/evidencias`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching evidences:', error);
      return [];
    }
  },

  /**
   * Subir evidencia para una tarea
   */
  uploadEvidence: async (id, formData) => {
    const response = await api.post(`/Tareas/${id}/evidencias`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.data || response.data;
  },

  /**
   * Eliminar evidencia
   */
  deleteEvidence: async (tareaId, evidenciaId) => {
    const response = await api.delete(`/Tareas/${tareaId}/evidencias/${evidenciaId}`);
    return response.data.data || response.data;
  },

  /**
   * Obtener historial de cambios de una tarea
   */
  getHistory: async (id) => {
    try {
      const response = await api.get(`/Tareas/${id}/historial`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching history:', error);
      return [];
    }
  },

  /**
   * Obtener comentarios de una tarea
   */
  getComments: async (id) => {
    try {
      const response = await api.get(`/Tareas/${id}/comentarios`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  },

  /**
   * Agregar comentario a una tarea
   */
  addComment: async (id, comentario) => {
    const response = await api.post(`/Tareas/${id}/comentarios`, { comentario });
    return response.data.data || response.data;
  },

  /**
   * Obtener estadísticas de tareas
   */
  getStatistics: async (params = {}) => {
    try {
      const response = await api.get('/Tareas/estadisticas', { params });
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      return null;
    }
  },

  /**
   * Exportar tareas a CSV/Excel
   */
  export: async (format = 'csv', filters = {}) => {
    try {
      const response = await api.get('/Tareas/exportar', {
        params: { ...filters, formato: format },
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting tasks:', error);
      throw error;
    }
  },

  /**
   * Clonar una tarea
   */
  clone: async (id) => {
    const response = await api.post(`/Tareas/${id}/clonar`);
    return response.data.data || response.data;
  },

  /**
   * Marcar tarea como prioritaria
   */
  setPriority: async (id, prioridad) => {
    const response = await api.put(`/Tareas/${id}/prioridad`, { prioridad });
    return response.data.data || response.data;
  },

  /**
   * Establecer fecha de vencimiento
   */
  setDueDate: async (id, dueDate) => {
    const response = await api.put(`/Tareas/${id}/fecha-vencimiento`, { dueDate });
    return response.data.data || response.data;
  }
};

export default tasksService;
