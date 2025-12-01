// Task States
export const TASK_STATES = {
  PENDIENTE: 0,
  ASIGNADA: 1,
  ACEPTADA: 2,
  FINALIZADA: 3,
  CANCELADA: 4
};

export const TASK_STATES_LABELS = {
  0: 'Pendiente',
  1: 'Asignada',
  2: 'Aceptada',
  3: 'Finalizada',
  4: 'Cancelada'
};

export const TASK_STATES_COLORS = {
  0: 'bg-brand-yellow-400',
  1: 'bg-brand-cyan-400',
  2: 'bg-purple-400',
  3: 'bg-green-400',
  4: 'bg-red-400'
};

export const TASK_STATES_BORDER_COLORS = {
  0: 'border-brand-yellow-400',
  1: 'border-brand-cyan-400',
  2: 'border-purple-400',
  3: 'border-green-400',
  4: 'border-red-400'
};

// Task Priorities
export const PRIORITIES = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
  URGENT: 3
};

export const PRIORITIES_LABELS = {
  0: 'Baja',
  1: 'Media',
  2: 'Alta',
  3: 'Urgente'
};

export const PRIORITIES_COLORS = {
  0: 'bg-gray-400',
  1: 'bg-brand-cyan-400',
  2: 'bg-brand-yellow-400',
  3: 'bg-red-500'
};

// Departments
export const DEPARTMENTS = {
  VENTAS: 0,
  MARKETING: 1,
  TI: 2,
  RRHH: 3,
  PRODUCCION: 4,
  FINANZAS: 5,
  OPERACIONES: 6,
  LOGISTICA: 7,
  CALIDAD: 8,
  INVESTIGACION: 9
};

export const DEPARTMENTS_LABELS = {
  0: 'Ventas',
  1: 'Marketing',
  2: 'TI',
  3: 'RRHH',
  4: 'Producción',
  5: 'Finanzas',
  6: 'Operaciones',
  7: 'Logística',
  8: 'Calidad',
  9: 'Investigación'
};

export const DEPARTMENTS_COLORS = {
  0: 'bg-brand-cyan-400',
  1: 'bg-purple-400',
  2: 'bg-blue-400',
  3: 'bg-pink-400',
  4: 'bg-orange-400',
  5: 'bg-green-400',
  6: 'bg-brand-yellow-400',
  7: 'bg-indigo-400',
  8: 'bg-teal-400',
  9: 'bg-red-400'
};

// User Roles
export const ROLES = {
  ADMIN_GENERAL: 'AdminGeneral',
  ADMIN_EMPRESA: 'AdminEmpresa',
  MANAGER: 'ManagerDepartamento',
  WORKER: 'Usuario'
};

export const ROLES_LABELS = {
  AdminGeneral: 'Super Admin',
  AdminEmpresa: 'Admin Empresa',
  ManagerDepartamento: 'Manager',
  Usuario: 'Trabajador'
};

export const ROLES_COLORS = {
  AdminGeneral: 'bg-brand-yellow-400',
  AdminEmpresa: 'bg-brand-cyan-400',
  ManagerDepartamento: 'bg-purple-400',
  Usuario: 'bg-gray-300'
};

// API Routes
export const API_ROUTES = {
  TAREAS: '/api/tareas',
  USUARIOS: '/api/usuarios',
  EMPRESAS: '/api/empresas',
  CHAT: '/api/chat',
  FILES: '/api/files',
  AUTH: '/api/auth'
};

// SignalR Hub
export const SIGNALR_HUB = {
  TAREA: '/tareahub',
  CHAT: '/chathub'
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx']
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language'
};

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd/MM/yyyy HH:mm',
  TIME: 'HH:mm',
  MONTH_YEAR: 'MMMM yyyy'
};
