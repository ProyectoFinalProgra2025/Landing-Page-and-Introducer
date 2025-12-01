import React from 'react';
import { Clock, UserCheck, Play, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { getTaskColor, getTaskLabel } from '../../utils/taskUtils';

/**
 * TaskStatusBadge Component - Badge de estado de tarea
 *
 * @param {Object} props
 * @param {number} props.estado - Estado de la tarea (0-4)
 * @param {'default'|'large'|'small'} props.size - Tamaño del badge
 * @param {boolean} props.showIcon - Mostrar ícono
 * @param {string} props.className - Clases adicionales
 */
const TaskStatusBadge = ({
  estado,
  size = 'default',
  showIcon = false,
  className = ''
}) => {
  const sizes = {
    small: 'px-2 py-0.5 text-xs',
    default: 'px-3 py-1 text-xs',
    large: 'px-4 py-2 text-sm'
  };

  const iconSizes = {
    small: 'h-3 w-3',
    default: 'h-4 w-4',
    large: 'h-5 w-5'
  };

  const icons = {
    0: Clock,
    1: UserCheck,
    2: Play,
    3: CheckCircle,
    4: XCircle
  };

  const Icon = icons[estado];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        ${getTaskColor(estado)}
        border-2 border-black
        font-black uppercase tracking-wider
        shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        ${sizes[size]}
        ${className}
      `}
    >
      {showIcon && Icon && <Icon className={iconSizes[size]} />}
      <span>{getTaskLabel(estado)}</span>
    </span>
  );
};

/**
 * TaskStatusIndicator - Indicador simple de color
 */
export const TaskStatusIndicator = ({ estado, size = 'default', className = '' }) => {
  const sizes = {
    small: 'w-2 h-2',
    default: 'w-3 h-3',
    large: 'w-4 h-4'
  };

  return (
    <div
      className={`
        ${sizes[size]} ${getTaskColor(estado)}
        border border-black rounded-full
        ${className}
      `}
      title={getTaskLabel(estado)}
    />
  );
};

/**
 * TaskStatusProgress - Barra de progreso visual
 */
export const TaskStatusProgress = ({ estado, showLabel = true, className = '' }) => {
  const progress = {
    0: 0,   // Pendiente
    1: 33,  // Asignada
    2: 66,  // Aceptada/En Progreso
    3: 100, // Finalizada
    4: 0    // Cancelada
  };

  const colors = {
    0: 'bg-brand-yellow-400',
    1: 'bg-brand-cyan-400',
    2: 'bg-purple-400',
    3: 'bg-green-400',
    4: 'bg-red-400'
  };

  const currentProgress = progress[estado] || 0;

  return (
    <div className={className}>
      <div className="w-full h-4 bg-gray-200 border-2 border-black overflow-hidden">
        <div
          className={`h-full ${colors[estado]} border-r-2 border-black transition-all duration-300`}
          style={{ width: `${currentProgress}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs font-black text-black uppercase">
            {getTaskLabel(estado)}
          </span>
          <span className="text-xs font-bold text-gray-600">
            {currentProgress}%
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * TaskStatusTimeline - Timeline de estados
 */
export const TaskStatusTimeline = ({ currentEstado, className = '' }) => {
  const steps = [
    { estado: 0, label: 'Pendiente', icon: Clock },
    { estado: 1, label: 'Asignada', icon: UserCheck },
    { estado: 2, label: 'En Progreso', icon: Play },
    { estado: 3, label: 'Finalizada', icon: CheckCircle }
  ];

  return (
    <div className={`flex items-center ${className}`}>
      {steps.map((step, index) => {
        const isActive = currentEstado >= step.estado;
        const isCurrent = currentEstado === step.estado;
        const Icon = step.icon;

        return (
          <React.Fragment key={step.estado}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 border-2 border-black flex items-center justify-center
                  ${isActive ? getTaskColor(step.estado) : 'bg-gray-200'}
                  ${isCurrent ? 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : ''}
                  transition-all
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-black' : 'text-gray-400'}`} />
              </div>
              <span
                className={`
                  text-xs font-bold mt-2 text-center
                  ${isActive ? 'text-black' : 'text-gray-500'}
                `}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  flex-1 h-1 mx-2 border-t-2 border-black
                  ${currentEstado > step.estado ? 'border-solid' : 'border-dashed'}
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/**
 * TaskStatusCard - Tarjeta con estado y acciones
 */
export const TaskStatusCard = ({ task, onActionClick, className = '' }) => {
  const getActions = () => {
    switch (task.estado) {
      case 0: // Pendiente
        return [
          { label: 'Asignar', action: 'assign', variant: 'primary' }
        ];
      case 1: // Asignada
        return [
          { label: 'Aceptar', action: 'accept', variant: 'success' },
          { label: 'Rechazar', action: 'reject', variant: 'danger' }
        ];
      case 2: // En Progreso
        return [
          { label: 'Finalizar', action: 'finish', variant: 'success' },
          { label: 'Cancelar', action: 'cancel', variant: 'danger' }
        ];
      case 3: // Finalizada
        return [];
      case 4: // Cancelada
        return [
          { label: 'Reabrir', action: 'reopen', variant: 'primary' }
        ];
      default:
        return [];
    }
  };

  const actions = getActions();

  return (
    <div className={`bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-black text-black uppercase">Estado Actual</h4>
        <TaskStatusBadge estado={task.estado} size="large" showIcon />
      </div>

      <TaskStatusProgress estado={task.estado} showLabel />

      {actions.length > 0 && (
        <div className="flex gap-3 mt-6">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => onActionClick?.(action.action)}
              className={`
                flex-1 px-4 py-3 font-black text-sm uppercase border-2 border-black
                transition-all
                ${action.variant === 'primary' ? 'bg-brand-cyan-400 hover:bg-brand-cyan-500' : ''}
                ${action.variant === 'success' ? 'bg-green-400 hover:bg-green-500' : ''}
                ${action.variant === 'danger' ? 'bg-red-400 hover:bg-red-500' : ''}
                hover:-translate-y-0.5 hover:-translate-x-0.5
                hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
              `}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * TaskStatusHistory - Historial de cambios de estado
 */
export const TaskStatusHistory = ({ history = [], className = '' }) => {
  if (!history || history.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-sm font-bold text-gray-500">Sin historial de cambios</p>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {history.map((entry, index) => (
        <div
          key={index}
          className="flex items-start gap-3 p-4 border-2 border-black bg-white"
        >
          <TaskStatusIndicator estado={entry.estadoNuevo} size="default" />
          <div className="flex-1">
            <p className="text-sm font-black text-black">
              {getTaskLabel(entry.estadoAnterior)} → {getTaskLabel(entry.estadoNuevo)}
            </p>
            <p className="text-xs font-bold text-gray-600 mt-1">
              {entry.usuario} • {new Date(entry.fecha).toLocaleDateString()}
            </p>
            {entry.comentario && (
              <p className="text-xs text-gray-700 mt-2 italic">
                "{entry.comentario}"
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskStatusBadge;
