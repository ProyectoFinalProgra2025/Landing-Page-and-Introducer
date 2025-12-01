import React from 'react';

/**
 * Button Component - Neobrutalism Design
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {Function} props.onClick - Función al hacer click
 * @param {'primary'|'secondary'|'danger'|'outline'|'success'} props.variant - Variante de estilo
 * @param {'sm'|'md'|'lg'} props.size - Tamaño del botón
 * @param {React.Component} props.icon - Ícono de Lucide React
 * @param {boolean} props.disabled - Estado deshabilitado
 * @param {'button'|'submit'|'reset'} props.type - Tipo de botón
 * @param {string} props.className - Clases adicionales
 * @param {boolean} props.fullWidth - Ancho completo
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  type = 'button',
  className = '',
  fullWidth = false
}) => {
  const baseStyles = 'font-black uppercase tracking-wider border-2 border-black transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap';

  const variants = {
    primary: 'bg-brand-cyan-400 text-black hover:bg-brand-cyan-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
    secondary: 'bg-brand-yellow-400 text-black hover:bg-brand-yellow-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
    danger: 'bg-red-400 text-black hover:bg-red-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
    success: 'bg-green-400 text-black hover:bg-green-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
    outline: 'bg-white text-black hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
    dark: 'bg-black text-white hover:bg-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
  };

  const sizes = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed shadow-none'
    : 'cursor-pointer active:translate-x-1 active:translate-y-1 active:shadow-none';

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabledStyles}
        ${widthStyle}
        ${className}
      `.trim()}
    >
      {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
      {children}
    </button>
  );
};

export default Button;
