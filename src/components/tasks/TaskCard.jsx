import React from 'react';
import { Calendar, User, ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { getTaskColor, getTaskLabel, getPriorityColor, getPriorityLabel } from '../../utils/taskUtils';
import { formatDate, getDueDateStatus } from '../../utils/dateUtils';

/**
 * TaskCard Component - Tarjeta de tarea Neobrutalism
 *
 * @param {Object} props
 * @param {Object} props.task - Objeto de tarea
 * @param {Function} props.onClick - Función al hacer click
 * @param {boolean} props.showAssignee - Mostrar usuario asignado
 * @param {boolean} props.showPriority - Mostrar prioridad
 * @param {boolean} props.showDueDate - Mostrar fecha de vencimiento
 * @param {boolean} props.showCreator - Mostrar creador
 * @param {string} props.className - Clases adicionales
 */
const TaskCard = ({
  task,
  onClick,
  showAssignee = true,
  showPriority = false,
  showDueDate = true,
  showCreator = false,
  className = ''
}) => {
  const dueDateStatus = task.dueDate ? getDueDateStatus(task.dueDate) : null;

  return (
    <div
      onClick={() => onClick?.(task)}
      className={`
        bg-white border-4 border-black p-6 cursor-pointer
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:-translate-y-1 hover:-translate-x-1
        hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
        transition-all duration-200
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 pr-4">
          <h3 className="text-xl font-black text-black mb-2 line-clamp-2 leading-tight">
            {task.titulo}
          </h3>
          <p className="text-sm font-bold text-gray-600 line-clamp-2">
            {task.descripcion}
          </p>
        </div>

        {/* Estado Badge */}
        <span
          className={`
            ${getTaskColor(task.estado)} px-3 py-1 text-xs font-black
            border-2 border-black uppercase whitespace-nowrap flex-shrink-0
            shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
          `}
        >
          {getTaskLabel(task.estado)}
        </span>
      </div>

      {/* Priority Badge (si se muestra) */}
      {showPriority && task.prioridad !== undefined && (
        <div className="mb-4">
          <span
            className={`
              ${getPriorityColor(task.prioridad)} px-2 py-1 text-xs font-black
              border border-black uppercase inline-block
            `}
          >
            {getPriorityLabel(task.prioridad)}
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t-2 border-black">
        <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-gray-600">
          {/* Asignado a */}
          {showAssignee && task.asignadoANombre && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 flex-shrink-0" />
              <span className="truncate max-w-[150px]">{task.asignadoANombre}</span>
            </div>
          )}

          {/* Creado por */}
          {showCreator && task.createdByUsuarioNombre && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 flex-shrink-0" />
              <span className="text-xs truncate max-w-[150px]">
                Por: {task.createdByUsuarioNombre}
              </span>
            </div>
          )}

          {/* Fecha de vencimiento */}
          {showDueDate && task.dueDate && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span className={dueDateStatus?.urgent ? dueDateStatus.color : ''}>
                {formatDate(task.dueDate)}
              </span>
              {dueDateStatus?.urgent && (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
            </div>
          )}
        </div>

        <ArrowRight className="h-5 w-5 text-black flex-shrink-0" />
      </div>
    </div>
  );
};

/**
 * Compact TaskCard - Versión compacta
 */
export const CompactTaskCard = ({ task, onClick, className = '' }) => {
  return (
    <div
      onClick={() => onClick?.(task)}
      className={`
        bg-white border-2 border-black p-4 cursor-pointer
        shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        hover:-translate-y-0.5 hover:-translate-x-0.5
        hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
        transition-all duration-200
        ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 pr-3">
          <h4 className="text-sm font-black text-black line-clamp-1">
            {task.titulo}
          </h4>
          {task.asignadoANombre && (
            <p className="text-xs font-bold text-gray-600 mt-1">
              {task.asignadoANombre}
            </p>
          )}
        </div>
        <span
          className={`
            ${getTaskColor(task.estado)} px-2 py-1 text-xs font-black
            border border-black uppercase whitespace-nowrap
          `}
        >
          {getTaskLabel(task.estado).substring(0, 3)}
        </span>
      </div>
    </div>
  );
};

/**
 * Task Grid Item - Para vista de grilla
 */
export const TaskGridItem = ({ task, onClick, className = '' }) => {
  const dueDateStatus = task.dueDate ? getDueDateStatus(task.dueDate) : null;

  return (
    <div
      onClick={() => onClick?.(task)}
      className={`
        bg-white border-4 border-black p-5 cursor-pointer
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:-translate-y-1 hover:-translate-x-1
        hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
        transition-all duration-200 h-full flex flex-col
        ${className}
      `}
    >
      {/* Estado Badge - Top Right */}
      <div className="flex justify-end mb-3">
        <span
          className={`
            ${getTaskColor(task.estado)} px-2 py-1 text-xs font-black
            border-2 border-black uppercase
          `}
        >
          {getTaskLabel(task.estado)}
        </span>
      </div>

      {/* Título y descripción */}
      <h3 className="text-lg font-black text-black mb-2 line-clamp-2">
        {task.titulo}
      </h3>
      <p className="text-sm font-bold text-gray-600 line-clamp-3 mb-4 flex-1">
        {task.descripcion}
      </p>

      {/* Footer Info */}
      <div className="space-y-2 pt-3 border-t-2 border-black">
        {task.asignadoANombre && (
          <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
            <User className="h-3 w-3" />
            <span className="truncate">{task.asignadoANombre}</span>
          </div>
        )}
        {task.dueDate && (
          <div className="flex items-center gap-2 text-xs font-bold">
            <Clock className="h-3 w-3" />
            <span className={dueDateStatus?.urgent ? dueDateStatus.color : 'text-gray-600'}>
              {dueDateStatus?.text || formatDate(task.dueDate)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Task List Item - Para vista de lista simple
 */
export const TaskListItem = ({ task, onClick, showCheckbox = false, checked = false, onCheckChange, className = '' }) => {
  return (
    <div
      className={`
        flex items-center gap-4 p-4 border-2 border-black
        bg-white hover:bg-gray-50 transition-colors
        ${className}
      `}
    >
      {showCheckbox && (
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckChange?.(task, e.target.checked)}
          className="w-5 h-5 border-2 border-black"
          onClick={(e) => e.stopPropagation()}
        />
      )}

      <div className="flex-1 cursor-pointer" onClick={() => onClick?.(task)}>
        <div className="flex items-center gap-3">
          <span
            className={`
              ${getTaskColor(task.estado)} w-3 h-3 border border-black flex-shrink-0
            `}
          />
          <span className="font-black text-black">{task.titulo}</span>
          {task.asignadoANombre && (
            <span className="text-sm font-bold text-gray-600">
              • {task.asignadoANombre}
            </span>
          )}
        </div>
      </div>

      <ArrowRight className="h-5 w-5 text-black flex-shrink-0" />
    </div>
  );
};

export default TaskCard;
