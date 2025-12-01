import { useState, useEffect, useCallback } from 'react';
import { tasksService } from '../services/tasksService';
import { useTaskEvents } from './useSignalR';

/**
 * Hook principal para gestión de tareas
 *
 * @param {Object} filters - Filtros iniciales para las tareas
 * @param {boolean} autoLoad - Cargar automáticamente al montar
 * @returns {Object} - Estado y funciones para gestionar tareas
 */
export const useTasks = (filters = {}, autoLoad = true) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshCounter, setRefreshCounter] = useState(0);

  /**
   * Cargar tareas desde el servidor
   */
  const loadTasks = useCallback(async (customFilters = null) => {
    setLoading(true);
    setError(null);

    try {
      const filtersToUse = customFilters || filters;
      const data = await tasksService.getAll(filtersToUse);
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError(err.response?.data?.message || err.message || 'Error al cargar tareas');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  /**
   * Refrescar tareas
   */
  const refresh = useCallback(() => {
    setRefreshCounter(prev => prev + 1);
  }, []);

  /**
   * Crear tarea
   */
  const createTask = useCallback(async (taskData) => {
    try {
      const newTask = await tasksService.create(taskData);
      refresh();
      return { success: true, data: newTask };
    } catch (err) {
      console.error('Error creating task:', err);
      return {
        success: false,
        error: err.response?.data?.message || err.message || 'Error al crear tarea'
      };
    }
  }, [refresh]);

  /**
   * Actualizar tarea
   */
  const updateTask = useCallback(async (id, taskData) => {
    try {
      const updatedTask = await tasksService.update(id, taskData);
      refresh();
      return { success: true, data: updatedTask };
    } catch (err) {
      console.error('Error updating task:', err);
      return {
        success: false,
        error: err.response?.data?.message || err.message || 'Error al actualizar tarea'
      };
    }
  }, [refresh]);

  /**
   * Eliminar tarea
   */
  const deleteTask = useCallback(async (id) => {
    try {
      await tasksService.delete(id);
      refresh();
      return { success: true };
    } catch (err) {
      console.error('Error deleting task:', err);
      return {
        success: false,
        error: err.response?.data?.message || err.message || 'Error al eliminar tarea'
      };
    }
  }, [refresh]);

  /**
   * Aceptar tarea
   */
  const acceptTask = useCallback(async (id) => {
    try {
      await tasksService.accept(id);
      refresh();
      return { success: true };
    } catch (err) {
      console.error('Error accepting task:', err);
      return {
        success: false,
        error: err.response?.data?.message || err.message || 'Error al aceptar tarea'
      };
    }
  }, [refresh]);

  /**
   * Finalizar tarea
   */
  const finishTask = useCallback(async (id, evidencia = {}) => {
    try {
      await tasksService.finish(id, evidencia);
      refresh();
      return { success: true };
    } catch (err) {
      console.error('Error finishing task:', err);
      return {
        success: false,
        error: err.response?.data?.message || err.message || 'Error al finalizar tarea'
      };
    }
  }, [refresh]);

  /**
   * Cancelar tarea
   */
  const cancelTask = useCallback(async (id, motivo) => {
    try {
      await tasksService.cancel(id, motivo);
      refresh();
      return { success: true };
    } catch (err) {
      console.error('Error canceling task:', err);
      return {
        success: false,
        error: err.response?.data?.message || err.message || 'Error al cancelar tarea'
      };
    }
  }, [refresh]);

  /**
   * Asignar tarea manualmente
   */
  const assignTask = useCallback(async (id, usuarioId) => {
    try {
      await tasksService.assignManual(id, usuarioId);
      refresh();
      return { success: true };
    } catch (err) {
      console.error('Error assigning task:', err);
      return {
        success: false,
        error: err.response?.data?.message || err.message || 'Error al asignar tarea'
      };
    }
  }, [refresh]);

  // Suscribirse a eventos de SignalR
  useTaskEvents({
    onTaskCreated: () => {
      console.log('Task created event received');
      refresh();
    },
    onTaskUpdated: () => {
      console.log('Task updated event received');
      refresh();
    },
    onTaskDeleted: () => {
      console.log('Task deleted event received');
      refresh();
    },
    onTaskAssigned: () => {
      console.log('Task assigned event received');
      refresh();
    },
    onTaskAccepted: () => {
      console.log('Task accepted event received');
      refresh();
    },
    onTaskFinished: () => {
      console.log('Task finished event received');
      refresh();
    },
    onTaskCancelled: () => {
      console.log('Task cancelled event received');
      refresh();
    }
  });

  // Cargar tareas cuando cambian los filtros o el refreshCounter
  useEffect(() => {
    if (autoLoad) {
      loadTasks();
    }
  }, [loadTasks, refreshCounter, autoLoad]);

  return {
    tasks,
    loading,
    error,
    refresh,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    acceptTask,
    finishTask,
    cancelTask,
    assignTask
  };
};

/**
 * Hook para obtener una tarea específica por ID
 */
export const useTask = (taskId) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTask = useCallback(async () => {
    if (!taskId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await tasksService.getById(taskId);
      setTask(data);
    } catch (err) {
      console.error('Error loading task:', err);
      setError(err.response?.data?.message || err.message || 'Error al cargar tarea');
      setTask(null);
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  // Suscribirse a eventos para esta tarea específica
  useTaskEvents({
    onTaskUpdated: (data) => {
      if (data?.tareaId === taskId || data?.id === taskId) {
        loadTask();
      }
    },
    onTaskDeleted: (data) => {
      if (data?.tareaId === taskId || data?.id === taskId) {
        setTask(null);
      }
    }
  });

  return {
    task,
    loading,
    error,
    refresh: loadTask
  };
};

/**
 * Hook para obtener mis tareas
 */
export const useMyTasks = (filters = {}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMyTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await tasksService.getMyTasks(filters);
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error loading my tasks:', err);
      setError(err.response?.data?.message || err.message || 'Error al cargar mis tareas');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadMyTasks();
  }, [loadMyTasks]);

  // Suscribirse a eventos
  useTaskEvents({
    onTaskCreated: loadMyTasks,
    onTaskUpdated: loadMyTasks,
    onTaskDeleted: loadMyTasks,
    onTaskAssigned: loadMyTasks,
    onTaskAccepted: loadMyTasks,
    onTaskFinished: loadMyTasks,
    onTaskCancelled: loadMyTasks
  });

  return {
    tasks,
    loading,
    error,
    refresh: loadMyTasks
  };
};

/**
 * Hook para estadísticas de tareas
 */
export const useTaskStatistics = (params = {}) => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await tasksService.getStatistics(params);
      setStatistics(data);
    } catch (err) {
      console.error('Error loading statistics:', err);
      setError(err.response?.data?.message || err.message || 'Error al cargar estadísticas');
      setStatistics(null);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  // Refrescar cuando cambian las tareas
  useTaskEvents({
    onTaskCreated: loadStatistics,
    onTaskUpdated: loadStatistics,
    onTaskDeleted: loadStatistics,
    onTaskFinished: loadStatistics,
    onTaskCancelled: loadStatistics
  });

  return {
    statistics,
    loading,
    error,
    refresh: loadStatistics
  };
};

export default useTasks;
