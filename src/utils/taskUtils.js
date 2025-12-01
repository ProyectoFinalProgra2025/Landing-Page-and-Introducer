import { TASK_STATES_COLORS, TASK_STATES_LABELS, PRIORITIES_COLORS, PRIORITIES_LABELS, DEPARTMENTS_LABELS, DEPARTMENTS_COLORS } from './constants';

/**
 * Obtiene el color de una tarea según su estado
 */
export const getTaskColor = (estado) => {
  return TASK_STATES_COLORS[estado] || 'bg-gray-400';
};

/**
 * Obtiene la etiqueta de una tarea según su estado
 */
export const getTaskLabel = (estado) => {
  return TASK_STATES_LABELS[estado] || 'Desconocido';
};

/**
 * Obtiene el color de prioridad
 */
export const getPriorityColor = (prioridad) => {
  return PRIORITIES_COLORS[prioridad] || 'bg-gray-400';
};

/**
 * Obtiene la etiqueta de prioridad
 */
export const getPriorityLabel = (prioridad) => {
  return PRIORITIES_LABELS[prioridad] || 'Desconocida';
};

/**
 * Obtiene el color del departamento
 */
export const getDepartmentColor = (departamento) => {
  return DEPARTMENTS_COLORS[departamento] || 'bg-gray-400';
};

/**
 * Obtiene la etiqueta del departamento
 */
export const getDepartmentLabel = (departamento) => {
  return DEPARTMENTS_LABELS[departamento] || 'Sin departamento';
};

/**
 * Calcula el progreso de una tarea (0-100)
 */
export const getTaskProgress = (estado) => {
  const progress = {
    0: 0,   // Pendiente
    1: 33,  // Asignada
    2: 66,  // Aceptada
    3: 100, // Finalizada
    4: 0    // Cancelada
  };
  return progress[estado] || 0;
};

/**
 * Verifica si una tarea puede ser aceptada por el usuario
 */
export const canAcceptTask = (task, userId) => {
  if (!task || !userId) return false;
  return task.estado === 1 && task.asignadoAUsuarioId === userId;
};

/**
 * Verifica si una tarea puede ser finalizada por el usuario
 */
export const canFinishTask = (task, userId) => {
  if (!task || !userId) return false;
  return task.estado === 2 && task.asignadoAUsuarioId === userId;
};

/**
 * Verifica si una tarea puede ser delegada por el usuario
 */
export const canDelegateTask = (task, userId) => {
  if (!task || !userId) return false;
  return (task.estado === 1 || task.estado === 2) &&
         (task.asignadoAUsuarioId === userId || task.createdByUsuarioId === userId);
};

/**
 * Verifica si una tarea puede ser cancelada
 */
export const canCancelTask = (task, userId) => {
  if (!task || !userId) return false;
  return (task.estado === 0 || task.estado === 1 || task.estado === 2) &&
         task.createdByUsuarioId === userId;
};

/**
 * Verifica si una tarea puede ser editada
 */
export const canEditTask = (task, userId, userRole) => {
  if (!task || !userId) return false;

  // AdminGeneral y AdminEmpresa pueden editar todas
  if (userRole === 'AdminGeneral' || userRole === 'AdminEmpresa') return true;

  // El creador puede editar si está pendiente o asignada
  if (task.createdByUsuarioId === userId && (task.estado === 0 || task.estado === 1)) {
    return true;
  }

  return false;
};

/**
 * Verifica si una tarea puede ser eliminada
 */
export const canDeleteTask = (task, userId, userRole) => {
  if (!task || !userId) return false;

  // AdminGeneral y AdminEmpresa pueden eliminar
  if (userRole === 'AdminGeneral' || userRole === 'AdminEmpresa') return true;

  // El creador puede eliminar si está pendiente
  if (task.createdByUsuarioId === userId && task.estado === 0) {
    return true;
  }

  return false;
};

/**
 * Agrupa tareas por estado
 */
export const groupTasksByState = (tasks) => {
  return tasks.reduce((acc, task) => {
    const estado = task.estado;
    if (!acc[estado]) acc[estado] = [];
    acc[estado].push(task);
    return acc;
  }, {});
};

/**
 * Agrupa tareas por departamento
 */
export const groupTasksByDepartment = (tasks) => {
  return tasks.reduce((acc, task) => {
    const dept = task.departamento ?? 'sin_departamento';
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(task);
    return acc;
  }, {});
};

/**
 * Agrupa tareas por prioridad
 */
export const groupTasksByPriority = (tasks) => {
  return tasks.reduce((acc, task) => {
    const priority = task.prioridad;
    if (!acc[priority]) acc[priority] = [];
    acc[priority].push(task);
    return acc;
  }, {});
};

/**
 * Ordena tareas por prioridad (alta primero)
 */
export const sortByPriority = (tasks) => {
  return [...tasks].sort((a, b) => b.prioridad - a.prioridad);
};

/**
 * Ordena tareas por fecha de vencimiento (próximas primero)
 */
export const sortByDueDate = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });
};

/**
 * Ordena tareas por fecha de creación (recientes primero)
 */
export const sortByCreatedAt = (tasks) => {
  return [...tasks].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

/**
 * Filtra tareas por búsqueda (título, descripción, asignado)
 */
export const filterTasksBySearch = (tasks, searchQuery) => {
  if (!searchQuery || searchQuery.trim() === '') return tasks;

  const query = searchQuery.toLowerCase().trim();

  return tasks.filter(task => {
    return (
      task.titulo.toLowerCase().includes(query) ||
      task.descripcion.toLowerCase().includes(query) ||
      task.asignadoANombre?.toLowerCase().includes(query) ||
      task.createdByUsuarioNombre?.toLowerCase().includes(query) ||
      task.id.toLowerCase().includes(query)
    );
  });
};

/**
 * Obtiene estadísticas de las tareas
 */
export const getTaskStatistics = (tasks) => {
  const stats = {
    total: tasks.length,
    pendientes: 0,
    asignadas: 0,
    aceptadas: 0,
    finalizadas: 0,
    canceladas: 0,
    porDepartamento: {},
    porPrioridad: {
      0: 0, // Baja
      1: 0, // Media
      2: 0, // Alta
      3: 0  // Urgente
    }
  };

  tasks.forEach(task => {
    // Por estado
    switch (task.estado) {
      case 0: stats.pendientes++; break;
      case 1: stats.asignadas++; break;
      case 2: stats.aceptadas++; break;
      case 3: stats.finalizadas++; break;
      case 4: stats.canceladas++; break;
    }

    // Por prioridad
    if (task.prioridad !== undefined) {
      stats.porPrioridad[task.prioridad]++;
    }

    // Por departamento
    const dept = task.departamento ?? 'sin_departamento';
    if (!stats.porDepartamento[dept]) {
      stats.porDepartamento[dept] = 0;
    }
    stats.porDepartamento[dept]++;
  });

  stats.enProgreso = stats.asignadas + stats.aceptadas;
  stats.completionRate = stats.total > 0
    ? ((stats.finalizadas / stats.total) * 100).toFixed(1)
    : 0;

  return stats;
};

/**
 * Valida si una tarea tiene todos los campos requeridos
 */
export const validateTask = (task) => {
  const errors = {};

  if (!task.titulo || task.titulo.trim() === '') {
    errors.titulo = 'El título es requerido';
  }

  if (!task.descripcion || task.descripcion.trim() === '') {
    errors.descripcion = 'La descripción es requerida';
  }

  if (task.prioridad === undefined || task.prioridad === null) {
    errors.prioridad = 'La prioridad es requerida';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Obtiene el ícono apropiado para el estado de la tarea
 */
export const getTaskIcon = (estado) => {
  const icons = {
    0: 'Clock',        // Pendiente
    1: 'UserCheck',    // Asignada
    2: 'Play',         // Aceptada
    3: 'CheckCircle',  // Finalizada
    4: 'XCircle'       // Cancelada
  };
  return icons[estado] || 'Circle';
};
