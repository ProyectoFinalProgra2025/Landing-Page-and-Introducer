import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Modal Component - Neobrutalism Design
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Estado del modal (abierto/cerrado)
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {string} props.title - Título del modal
 * @param {React.ReactNode} props.children - Contenido del modal
 * @param {'sm'|'md'|'lg'|'xl'|'full'} props.size - Tamaño del modal
 * @param {boolean} props.showCloseButton - Mostrar botón de cerrar
 * @param {boolean} props.closeOnOverlay - Cerrar al hacer click en el overlay
 * @param {string} props.className - Clases adicionales para el contenido
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlay = true,
  className = ''
}) => {
  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in"
        onClick={handleOverlayClick}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`
            ${sizes[size]} w-full bg-white border-4 border-black
            shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            relative animate-fade-in
            ${className}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b-4 border-black bg-white">
            <h2 className="text-2xl font-black text-black uppercase tracking-tight">
              {title}
            </h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 border-2 border-black transition-colors active:translate-x-1 active:translate-y-1"
                aria-label="Cerrar modal"
              >
                <X className="h-6 w-6 text-black" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Modal Footer Component - Para botones de acción
 */
export const ModalFooter = ({ children, className = '' }) => {
  return (
    <div className={`flex gap-4 pt-6 border-t-4 border-black ${className}`}>
      {children}
    </div>
  );
};

/**
 * Modal Section Component - Para organizar contenido
 */
export const ModalSection = ({ title, children, className = '' }) => {
  return (
    <div className={`mb-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-black text-black uppercase mb-4 tracking-tight">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default Modal;
