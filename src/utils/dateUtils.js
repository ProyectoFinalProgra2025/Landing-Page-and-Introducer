import { format, formatDistance, formatRelative, differenceInDays, isAfter, isBefore, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formatea una fecha en formato corto dd/MM/yyyy
 */
export const formatDate = (date) => {
  if (!date) return '';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'dd/MM/yyyy', { locale: es });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Formatea una fecha con hora dd/MM/yyyy HH:mm
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'dd/MM/yyyy HH:mm', { locale: es });
  } catch (error) {
    console.error('Error formatting datetime:', error);
    return '';
  }
};

/**
 * Formatea una fecha de forma relativa (hace 2 horas, hace 3 días, etc.)
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return formatDistance(parsedDate, new Date(), {
      addSuffix: true,
      locale: es
    });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return '';
  }
};

/**
 * Formatea una fecha de forma relativa (ayer, hoy, mañana, etc.)
 */
export const formatRelativeDate = (date) => {
  if (!date) return '';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return formatRelative(parsedDate, new Date(), { locale: es });
  } catch (error) {
    console.error('Error formatting relative date:', error);
    return '';
  }
};

/**
 * Verifica si una fecha está vencida
 */
export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  try {
    const parsedDate = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
    return isBefore(parsedDate, new Date());
  } catch (error) {
    console.error('Error checking overdue:', error);
    return false;
  }
};

/**
 * Obtiene los días hasta el vencimiento (negativo si ya venció)
 */
export const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return null;
  try {
    const parsedDate = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
    return differenceInDays(parsedDate, new Date());
  } catch (error) {
    console.error('Error calculating days until due:', error);
    return null;
  }
};

/**
 * Verifica si una fecha está próxima a vencer (3 días o menos)
 */
export const isDueSoon = (dueDate, daysThreshold = 3) => {
  const days = getDaysUntilDue(dueDate);
  if (days === null) return false;
  return days >= 0 && days <= daysThreshold;
};

/**
 * Obtiene un mensaje descriptivo del estado de vencimiento
 */
export const getDueDateStatus = (dueDate) => {
  if (!dueDate) return { text: 'Sin fecha límite', color: 'text-gray-600', urgent: false };

  const days = getDaysUntilDue(dueDate);

  if (days === null) {
    return { text: 'Sin fecha límite', color: 'text-gray-600', urgent: false };
  }

  if (days < 0) {
    return {
      text: `Vencida hace ${Math.abs(days)} día${Math.abs(days) === 1 ? '' : 's'}`,
      color: 'text-red-600',
      urgent: true
    };
  }

  if (days === 0) {
    return { text: 'Vence hoy', color: 'text-red-600', urgent: true };
  }

  if (days === 1) {
    return { text: 'Vence mañana', color: 'text-orange-600', urgent: true };
  }

  if (days <= 3) {
    return { text: `Vence en ${days} días`, color: 'text-orange-600', urgent: true };
  }

  if (days <= 7) {
    return { text: `Vence en ${days} días`, color: 'text-yellow-600', urgent: false };
  }

  return { text: `Vence en ${days} días`, color: 'text-gray-600', urgent: false };
};

/**
 * Formatea una fecha para input type="date" (YYYY-MM-DD)
 */
export const formatForDateInput = (date) => {
  if (!date) return '';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'yyyy-MM-dd');
  } catch (error) {
    console.error('Error formatting for date input:', error);
    return '';
  }
};

/**
 * Formatea una fecha para input type="datetime-local" (YYYY-MM-DDTHH:mm)
 */
export const formatForDateTimeInput = (date) => {
  if (!date) return '';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, "yyyy-MM-dd'T'HH:mm");
  } catch (error) {
    console.error('Error formatting for datetime input:', error);
    return '';
  }
};

/**
 * Verifica si dos fechas son del mismo día
 */
export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  try {
    const parsed1 = typeof date1 === 'string' ? parseISO(date1) : date1;
    const parsed2 = typeof date2 === 'string' ? parseISO(date2) : date2;
    return format(parsed1, 'yyyy-MM-dd') === format(parsed2, 'yyyy-MM-dd');
  } catch (error) {
    console.error('Error comparing dates:', error);
    return false;
  }
};

/**
 * Obtiene el inicio del día
 */
export const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Obtiene el fin del día
 */
export const endOfDay = (date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

/**
 * Formatea una fecha larga (ejemplo: 15 de enero de 2024)
 */
export const formatDateLong = (date) => {
  if (!date) return '';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, "d 'de' MMMM 'de' yyyy", { locale: es });
  } catch (error) {
    console.error('Error formatting long date:', error);
    return '';
  }
};

// Alias para compatibilidad
export const formatDateForInput = formatForDateInput;
