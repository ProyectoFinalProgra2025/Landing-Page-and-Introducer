import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * QuickActionCard Component - Tarjeta de acción rápida Neobrutalism
 *
 * @param {Object} props
 * @param {string} props.title - Título de la acción
 * @param {string} props.subtitle - Subtítulo/descripción
 * @param {React.Component} props.icon - Ícono de Lucide React
 * @param {Function} props.onClick - Función al hacer click
 * @param {string} props.gradient - Clase de gradiente (ej: 'bg-brand-cyan-300')
 * @param {boolean} props.disabled - Estado deshabilitado
 * @param {string} props.badge - Badge opcional (ej: "Nuevo", "3")
 * @param {string} props.className - Clases adicionales
 */
const QuickActionCard = ({
  title,
  subtitle,
  icon: Icon,
  onClick,
  gradient = 'bg-brand-cyan-300',
  disabled = false,
  badge,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${gradient} border-4 border-black p-6 text-left
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        transition-all duration-200 group relative
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'}
        ${className}
      `}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white border-2 border-black px-2 py-1 text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          {badge}
        </div>
      )}

      {/* Icon */}
      {Icon && (
        <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-6 transition-transform">
          <Icon className="h-6 w-6 text-black" />
        </div>
      )}

      {/* Content */}
      <h3 className="text-xl font-black text-black uppercase mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-sm font-bold text-black opacity-75 mb-4">
        {subtitle}
      </p>

      {/* Arrow indicator */}
      <div className="flex items-center text-black opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-sm font-black uppercase mr-2">Ir</span>
        <ArrowRight className="h-5 w-5" />
      </div>
    </button>
  );
};

/**
 * Compact QuickActionCard - Versión compacta horizontal
 */
export const CompactQuickActionCard = ({
  title,
  icon: Icon,
  onClick,
  colorClass = 'bg-white',
  count,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${colorClass} border-2 border-black p-4
        shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        transition-all duration-200 group
        hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
        ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-10 h-10 bg-black bg-opacity-10 border border-black flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon className="h-5 w-5 text-black" />
            </div>
          )}
          <span className="text-sm font-black text-black uppercase">
            {title}
          </span>
        </div>
        {count !== undefined && (
          <div className="bg-black text-white px-3 py-1 text-xs font-black border border-black">
            {count}
          </div>
        )}
        <ArrowRight className="h-5 w-5 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </button>
  );
};

/**
 * QuickActionsGrid - Grid de acciones rápidas
 */
export const QuickActionsGrid = ({ children, columns = 3, className = '' }) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {children}
    </div>
  );
};

/**
 * QuickActionsSection - Sección de acciones rápidas con título
 */
export const QuickActionsSection = ({ title, children, className = '' }) => {
  return (
    <div className={className}>
      <h2 className="text-2xl font-black text-black uppercase mb-4 tracking-tight">
        {title}
      </h2>
      {children}
    </div>
  );
};

/**
 * Feature Card - Tarjeta de característica con más información
 */
export const FeatureCard = ({
  title,
  description,
  icon: Icon,
  features = [],
  action,
  colorClass = 'bg-white',
  className = ''
}) => {
  return (
    <div
      className={`
        ${colorClass} border-4 border-black p-6
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        {Icon && (
          <div className="w-16 h-16 bg-brand-cyan-400 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
            <Icon className="h-8 w-8 text-black" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-2xl font-black text-black uppercase mb-2 tracking-tight">
            {title}
          </h3>
          <p className="text-sm font-bold text-gray-600">
            {description}
          </p>
        </div>
      </div>

      {/* Features List */}
      {features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm font-bold text-gray-700">
              <span className="w-2 h-2 bg-brand-cyan-400 border border-black mt-1.5 flex-shrink-0"></span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Action */}
      {action && (
        <div className="mt-6 pt-6 border-t-2 border-black">
          {action}
        </div>
      )}
    </div>
  );
};

export default QuickActionCard;
