import React from 'react';

/**
 * Spinner Component - Neobrutalism Design
 * Indicador de carga animado
 *
 * @param {Object} props
 * @param {'sm'|'md'|'lg'|'xl'} props.size - Tamaño del spinner
 * @param {string} props.color - Color del spinner
 * @param {string} props.text - Texto opcional debajo del spinner
 * @param {boolean} props.fullScreen - Mostrar en pantalla completa
 * @param {string} props.className - Clases adicionales
 */
export const Spinner = ({
  size = 'md',
  color = 'black',
  text = '',
  fullScreen = false,
  className = ''
}) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  };

  const spinnerElement = (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div
        className={`
          ${sizes[size]}
          border-4 border-${color} border-t-transparent
          rounded-full animate-spin
        `}
        style={{ borderColor: color === 'black' ? '#000' : undefined }}
      />
      {text && (
        <p className="text-sm font-bold text-gray-600 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
};

/**
 * Skeleton Loader - Para estados de carga de contenido
 */
export const Skeleton = ({ className = '', width = 'w-full', height = 'h-4' }) => {
  return (
    <div
      className={`
        ${width} ${height}
        bg-gray-200 border-2 border-gray-300
        animate-pulse
        ${className}
      `}
    />
  );
};

/**
 * Card Skeleton - Skeleton para tarjetas
 */
export const CardSkeleton = ({ showAvatar = false }) => {
  return (
    <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-start gap-4">
        {showAvatar && (
          <Skeleton width="w-12" height="h-12" className="rounded-full" />
        )}
        <div className="flex-1 space-y-3">
          <Skeleton height="h-6" width="w-3/4" />
          <Skeleton height="h-4" width="w-full" />
          <Skeleton height="h-4" width="w-5/6" />
        </div>
      </div>
    </div>
  );
};

/**
 * List Skeleton - Skeleton para listas
 */
export const ListSkeleton = ({ items = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

/**
 * Loading Overlay - Overlay de carga sobre contenido existente
 */
export const LoadingOverlay = ({ text = 'Cargando...', isLoading = true }) => {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-white bg-opacity-90">
      <Spinner text={text} size="lg" />
    </div>
  );
};

/**
 * Inline Spinner - Spinner pequeño para usar inline
 */
export const InlineSpinner = ({ className = '' }) => {
  return (
    <div className={`inline-block h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin ${className}`} />
  );
};

/**
 * Dots Loader - Loader con puntos animados
 */
export const DotsLoader = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4'
  };

  const dotSize = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${dotSize} bg-black rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
      <div className={`${dotSize} bg-black rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
      <div className={`${dotSize} bg-black rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
    </div>
  );
};

/**
 * Progress Bar - Barra de progreso
 */
export const ProgressBar = ({ progress = 0, showLabel = true, height = 'h-4', className = '' }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={className}>
      <div className={`w-full bg-gray-200 border-2 border-black ${height} overflow-hidden`}>
        <div
          className="h-full bg-brand-cyan-400 border-r-2 border-black transition-all duration-300"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-2 text-sm font-bold text-gray-600 text-center">
          {clampedProgress.toFixed(0)}%
        </p>
      )}
    </div>
  );
};

export default Spinner;
