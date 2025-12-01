import React from 'react';
import { CheckCircle, Circle, Clock, Play, XCircle } from 'lucide-react';
import { getTaskColor, getTaskLabel } from '../../utils/taskUtils';

/**
 * TaskProgressIndicator Component - Indicador de progreso de tarea
 *
 * @param {Object} props
 * @param {number} props.currentStep - Estado actual de la tarea (0-4)
 * @param {'horizontal'|'vertical'|'circular'|'minimal'} props.variant - Variante de visualización
 * @param {boolean} props.showLabels - Mostrar etiquetas de pasos
 * @param {boolean} props.showIcons - Mostrar íconos
 * @param {string} props.className - Clases adicionales
 */
const TaskProgressIndicator = ({
  currentStep,
  variant = 'horizontal',
  showLabels = true,
  showIcons = true,
  className = ''
}) => {
  const steps = [
    { id: 0, label: 'Pendiente', shortLabel: 'Pend.', icon: Clock },
    { id: 1, label: 'Asignada', shortLabel: 'Asig.', icon: Circle },
    { id: 2, label: 'En Progreso', shortLabel: 'Prog.', icon: Play },
    { id: 3, label: 'Finalizada', shortLabel: 'Final.', icon: CheckCircle }
  ];

  // Variant: Horizontal
  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center ${className}`}>
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isActive = currentStep >= step.id;
          const Icon = step.icon;

          return (
            <React.Fragment key={step.id}>
              {/* Step */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 border-2 border-black flex items-center justify-center
                    transition-all duration-300
                    ${isActive ? getTaskColor(step.id) : 'bg-gray-200'}
                    ${isCurrent ? 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] scale-110' : ''}
                  `}
                >
                  {showIcons && Icon && (
                    <Icon className={`h-5 w-5 ${isActive ? 'text-black' : 'text-gray-400'}`} />
                  )}
                  {!showIcons && (
                    <span className={`text-sm font-black ${isActive ? 'text-black' : 'text-gray-400'}`}>
                      {step.id + 1}
                    </span>
                  )}
                </div>
                {showLabels && (
                  <span
                    className={`
                      text-xs font-bold mt-2 text-center whitespace-nowrap
                      ${isActive ? 'text-black' : 'text-gray-500'}
                    `}
                  >
                    {step.shortLabel}
                  </span>
                )}
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    flex-1 h-1 mx-2 border-t-2 transition-all duration-300
                    ${currentStep > step.id ? 'border-black border-solid' : 'border-gray-300 border-dashed'}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  // Variant: Vertical
  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col ${className}`}>
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isActive = currentStep >= step.id;
          const Icon = step.icon;

          return (
            <React.Fragment key={step.id}>
              {/* Step */}
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-10 h-10 border-2 border-black flex items-center justify-center flex-shrink-0
                    transition-all duration-300
                    ${isActive ? getTaskColor(step.id) : 'bg-gray-200'}
                    ${isCurrent ? 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : ''}
                  `}
                >
                  {showIcons && Icon && (
                    <Icon className={`h-5 w-5 ${isActive ? 'text-black' : 'text-gray-400'}`} />
                  )}
                  {!showIcons && (
                    <span className={`text-sm font-black ${isActive ? 'text-black' : 'text-gray-400'}`}>
                      {step.id + 1}
                    </span>
                  )}
                </div>
                {showLabels && (
                  <span
                    className={`
                      text-sm font-bold
                      ${isActive ? 'text-black' : 'text-gray-500'}
                    `}
                  >
                    {step.label}
                  </span>
                )}
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    w-1 h-8 ml-5 border-l-2 transition-all duration-300
                    ${currentStep > step.id ? 'border-black border-solid' : 'border-gray-300 border-dashed'}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  // Variant: Circular
  if (variant === 'circular') {
    const progress = currentStep === 4 ? 0 : ((currentStep + 1) / steps.length) * 100;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div className="relative w-32 h-32">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            {/* Progress Circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="text-black transition-all duration-500"
            />
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-black">
              {Math.round(progress)}%
            </span>
            {showLabels && (
              <span className="text-xs font-bold text-gray-600 mt-1">
                Progreso
              </span>
            )}
          </div>
        </div>

        {showLabels && (
          <div className="mt-4 text-center">
            <span
              className={`
                inline-block px-3 py-1 text-xs font-black uppercase border-2 border-black
                ${getTaskColor(currentStep)}
              `}
            >
              {getTaskLabel(currentStep)}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Variant: Minimal (just progress bar)
  if (variant === 'minimal') {
    const progress = currentStep === 4 ? 0 : ((currentStep + 1) / steps.length) * 100;

    return (
      <div className={className}>
        <div className="w-full h-2 bg-gray-200 border-2 border-black overflow-hidden">
          <div
            className={`h-full ${getTaskColor(currentStep)} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
        {showLabels && (
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-black text-black uppercase">
              {getTaskLabel(currentStep)}
            </span>
            <span className="text-xs font-bold text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
        )}
      </div>
    );
  }

  return null;
};

/**
 * TaskStepIndicator - Indicador compacto de paso actual
 */
export const TaskStepIndicator = ({ currentStep, totalSteps = 4, size = 'default', className = '' }) => {
  const sizes = {
    small: 'gap-1',
    default: 'gap-2',
    large: 'gap-3'
  };

  const dotSizes = {
    small: 'w-2 h-2',
    default: 'w-3 h-3',
    large: 'w-4 h-4'
  };

  return (
    <div className={`flex items-center ${sizes[size]} ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`
            ${dotSizes[size]} border border-black rounded-full transition-all
            ${index === currentStep ? getTaskColor(currentStep) : 'bg-gray-200'}
            ${index === currentStep ? 'scale-125' : ''}
          `}
        />
      ))}
    </div>
  );
};

/**
 * TaskProgressBar - Barra de progreso con múltiples segmentos
 */
export const TaskProgressBar = ({ currentStep, showPercentage = true, className = '' }) => {
  const segments = [
    { id: 0, label: 'Pendiente', width: 25 },
    { id: 1, label: 'Asignada', width: 25 },
    { id: 2, label: 'En Progreso', width: 25 },
    { id: 3, label: 'Finalizada', width: 25 }
  ];

  const progress = currentStep === 4 ? 0 : ((currentStep + 1) / segments.length) * 100;

  return (
    <div className={className}>
      <div className="w-full h-6 bg-gray-200 border-2 border-black overflow-hidden flex">
        {segments.map((segment) => {
          const isActive = currentStep >= segment.id;
          const isCurrent = currentStep === segment.id;

          return (
            <div
              key={segment.id}
              className={`
                flex items-center justify-center border-r-2 border-black last:border-r-0
                transition-all duration-300
                ${isActive ? getTaskColor(segment.id) : 'bg-gray-200'}
                ${isCurrent ? 'animate-pulse' : ''}
              `}
              style={{ width: `${segment.width}%` }}
            >
              <span
                className={`
                  text-xs font-black uppercase
                  ${isActive ? 'text-black' : 'text-gray-400'}
                `}
              >
                {segment.id + 1}
              </span>
            </div>
          );
        })}
      </div>
      {showPercentage && (
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs font-bold text-gray-600">
            Paso {currentStep + 1} de {segments.length}
          </span>
          <span className="text-xs font-black text-black">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * TaskProgressCard - Tarjeta con progreso detallado
 */
export const TaskProgressCard = ({ task, className = '' }) => {
  const getCompletionRate = () => {
    const totalSteps = 4;
    const currentProgress = task.estado === 4 ? 0 : task.estado + 1;
    return Math.round((currentProgress / totalSteps) * 100);
  };

  const getTimeInfo = () => {
    if (!task.createdAt) return null;

    const created = new Date(task.createdAt);
    const now = new Date();
    const diffDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));

    return {
      days: diffDays,
      text: diffDays === 0 ? 'Hoy' : diffDays === 1 ? 'Ayer' : `Hace ${diffDays} días`
    };
  };

  const timeInfo = getTimeInfo();
  const completionRate = getCompletionRate();

  return (
    <div className={`bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-black text-black uppercase">Progreso de Tarea</h4>
        <span className="text-2xl font-black text-black">{completionRate}%</span>
      </div>

      <TaskProgressIndicator
        currentStep={task.estado}
        variant="horizontal"
        showLabels
        showIcons
        className="mb-6"
      />

      <div className="space-y-3 pt-4 border-t-2 border-black">
        <div className="flex justify-between text-sm">
          <span className="font-bold text-gray-600">Estado actual:</span>
          <span className="font-black text-black uppercase">{getTaskLabel(task.estado)}</span>
        </div>
        {timeInfo && (
          <div className="flex justify-between text-sm">
            <span className="font-bold text-gray-600">Tiempo transcurrido:</span>
            <span className="font-black text-black">{timeInfo.text}</span>
          </div>
        )}
        {task.asignadoANombre && (
          <div className="flex justify-between text-sm">
            <span className="font-bold text-gray-600">Asignado a:</span>
            <span className="font-black text-black">{task.asignadoANombre}</span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * CompactProgressIndicator - Indicador compacto para listas
 */
export const CompactProgressIndicator = ({ currentStep, showLabel = false, className = '' }) => {
  const progress = currentStep === 4 ? 0 : ((currentStep + 1) / 4) * 100;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-24 h-2 bg-gray-200 border border-black overflow-hidden">
        <div
          className={`h-full ${getTaskColor(currentStep)} transition-all duration-300`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-bold text-gray-600 whitespace-nowrap">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
};

/**
 * AnimatedProgressIndicator - Indicador con animación
 */
export const AnimatedProgressIndicator = ({ currentStep, className = '' }) => {
  const [animated, setAnimated] = React.useState(false);

  React.useEffect(() => {
    setAnimated(true);
  }, []);

  const steps = [
    { id: 0, label: 'Pendiente', icon: Clock },
    { id: 1, label: 'Asignada', icon: Circle },
    { id: 2, label: 'En Progreso', icon: Play },
    { id: 3, label: 'Finalizada', icon: CheckCircle }
  ];

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {steps.map((step) => {
        const isActive = currentStep >= step.id;
        const isCurrent = currentStep === step.id;
        const Icon = step.icon;

        return (
          <div
            key={step.id}
            className={`
              flex flex-col items-center transition-all duration-500
              ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: `${step.id * 100}ms` }}
          >
            <div
              className={`
                w-12 h-12 border-2 border-black flex items-center justify-center
                transition-all duration-300
                ${isActive ? getTaskColor(step.id) : 'bg-gray-200'}
                ${isCurrent ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] scale-110 -rotate-6' : ''}
                ${isActive && !isCurrent ? 'scale-95' : ''}
              `}
            >
              <Icon className={`h-6 w-6 ${isActive ? 'text-black' : 'text-gray-400'}`} />
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
        );
      })}
    </div>
  );
};

export default TaskProgressIndicator;
