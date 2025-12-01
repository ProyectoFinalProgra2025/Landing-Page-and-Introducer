import React from 'react';

/**
 * EmptyState Component - Neobrutalism Design
 * Para mostrar estados vacíos de forma visual y amigable
 *
 * @param {Object} props
 * @param {React.Component} props.icon - Ícono de Lucide React
 * @param {string} props.title - Título del estado vacío
 * @param {string} props.description - Descripción del estado vacío
 * @param {React.ReactNode} props.action - Botón o acción (opcional)
 * @param {'sm'|'md'|'lg'} props.size - Tamaño del componente
 * @param {string} props.className - Clases adicionales
 */
const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  size = 'md',
  className = ''
}) => {
  const sizes = {
    sm: {
      container: 'py-8 px-4',
      icon: 'w-16 h-16',
      iconSize: 'h-8 w-8',
      title: 'text-lg',
      description: 'text-sm'
    },
    md: {
      container: 'py-16 px-4',
      icon: 'w-24 h-24',
      iconSize: 'h-12 w-12',
      title: 'text-2xl',
      description: 'text-base'
    },
    lg: {
      container: 'py-24 px-6',
      icon: 'w-32 h-32',
      iconSize: 'h-16 w-16',
      title: 'text-3xl',
      description: 'text-lg'
    }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex flex-col items-center justify-center ${currentSize.container} ${className}`}>
      {/* Icon Container */}
      {Icon && (
        <div className={`
          ${currentSize.icon}
          bg-gray-100 border-4 border-black
          flex items-center justify-center
          mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        `}>
          <Icon className={`${currentSize.iconSize} text-gray-400`} />
        </div>
      )}

      {/* Title */}
      <h3 className={`
        ${currentSize.title}
        font-black text-black uppercase mb-2
        tracking-tight text-center
      `}>
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className={`
          ${currentSize.description}
          font-bold text-gray-600 text-center mb-6
          max-w-md
        `}>
          {description}
        </p>
      )}

      {/* Action Button */}
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
};

/**
 * EmptyState preconfigurados para casos comunes
 */
export const NoTasksEmptyState = ({ onCreateTask }) => (
  <EmptyState
    icon={require('lucide-react').FileText}
    title="No hay tareas"
    description="No se encontraron tareas con los filtros seleccionados. Crea una nueva tarea para comenzar."
    action={onCreateTask}
  />
);

export const NoDataEmptyState = ({ title = 'Sin datos', description = 'No hay información disponible para mostrar.' }) => (
  <EmptyState
    icon={require('lucide-react').Database}
    title={title}
    description={description}
  />
);

export const NoResultsEmptyState = ({ searchQuery, onClearFilters }) => (
  <EmptyState
    icon={require('lucide-react').Search}
    title="No se encontraron resultados"
    description={searchQuery ? `No hay coincidencias para "${searchQuery}"` : 'Intenta ajustar los filtros de búsqueda.'}
    action={onClearFilters}
  />
);

export const NoPermissionsEmptyState = () => (
  <EmptyState
    icon={require('lucide-react').Lock}
    title="Sin permisos"
    description="No tienes permiso para ver este contenido. Contacta al administrador si crees que esto es un error."
    size="md"
  />
);

export const ErrorEmptyState = ({ onRetry }) => (
  <EmptyState
    icon={require('lucide-react').AlertCircle}
    title="Error al cargar"
    description="Ocurrió un error al cargar los datos. Por favor, intenta nuevamente."
    action={onRetry}
  />
);

export default EmptyState;
