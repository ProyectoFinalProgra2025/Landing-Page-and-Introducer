import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * StatCard Component - Tarjeta de estadística Neobrutalism
 *
 * @param {Object} props
 * @param {string} props.title - Título de la estadística
 * @param {string|number} props.value - Valor de la estadística
 * @param {React.Component} props.icon - Ícono de Lucide React
 * @param {string} props.colorClass - Clase de color de fondo (ej: 'bg-brand-cyan-400')
 * @param {Function} props.onClick - Función al hacer click (opcional)
 * @param {Object} props.trend - Objeto con información de tendencia { value: number, isPositive: boolean }
 * @param {string} props.subtitle - Subtítulo opcional
 * @param {boolean} props.isLoading - Estado de carga
 * @param {string} props.className - Clases adicionales
 */
const StatCard = ({
  title,
  value,
  icon: Icon,
  colorClass = 'bg-brand-cyan-400',
  onClick,
  trend,
  subtitle,
  isLoading = false,
  className = ''
}) => {
  const Component = onClick ? 'button' : 'div';

  const baseClasses = `
    ${colorClass} border-4 border-black p-6
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
    transition-all duration-200
    ${onClick ? 'cursor-pointer hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : ''}
    ${className}
  `;

  if (isLoading) {
    return (
      <div className={baseClasses}>
        <div className="animate-pulse">
          <div className="h-4 bg-black bg-opacity-20 rounded w-1/2 mb-4"></div>
          <div className="h-12 bg-black bg-opacity-20 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <Component
      onClick={onClick}
      className={baseClasses}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-black text-black uppercase tracking-wider opacity-75 mb-2">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-5xl font-black text-black leading-none">
              {value}
            </p>
            {trend && (
              <div className={`flex items-center gap-1 text-sm font-bold ${trend.isPositive ? 'text-green-700' : 'text-red-700'}`}>
                {trend.isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-sm font-bold text-black opacity-60 mt-2">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
            <Icon className="h-8 w-8 text-black" />
          </div>
        )}
      </div>
    </Component>
  );
};

/**
 * Mini StatCard - Versión compacta
 */
export const MiniStatCard = ({
  title,
  value,
  icon: Icon,
  colorClass = 'bg-white',
  onClick,
  className = ''
}) => {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`
        ${colorClass} border-2 border-black p-4
        shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        transition-all duration-200
        ${onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' : ''}
        ${className}
      `}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 bg-black bg-opacity-10 border border-black flex items-center justify-center flex-shrink-0">
            <Icon className="h-5 w-5 text-black" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-black opacity-75 uppercase truncate">
            {title}
          </p>
          <p className="text-2xl font-black text-black leading-tight">
            {value}
          </p>
        </div>
      </div>
    </Component>
  );
};

/**
 * Stat Grid - Grid de estadísticas
 */
export const StatGrid = ({ children, columns = 3, className = '' }) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Stat Section - Sección con título y grid de stats
 */
export const StatSection = ({ title, children, icon: Icon, action, className = '' }) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-10 h-10 bg-brand-cyan-400 border-2 border-black flex items-center justify-center">
              <Icon className="h-5 w-5 text-black" />
            </div>
          )}
          <h2 className="text-2xl font-black text-black uppercase tracking-tight">
            {title}
          </h2>
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
};

export default StatCard;
