import React from 'react';

/**
 * Input Component - Neobrutalism Design
 *
 * @param {Object} props
 * @param {string} props.label - Etiqueta del input
 * @param {'text'|'email'|'password'|'number'|'tel'|'url'|'date'|'time'|'datetime-local'} props.type - Tipo de input
 * @param {string} props.value - Valor del input
 * @param {Function} props.onChange - Función onChange
 * @param {string} props.placeholder - Placeholder
 * @param {string} props.error - Mensaje de error
 * @param {boolean} props.required - Campo requerido
 * @param {boolean} props.disabled - Campo deshabilitado
 * @param {React.Component} props.icon - Ícono de Lucide React
 * @param {string} props.name - Nombre del input
 * @param {string} props.id - ID del input
 * @param {string} props.className - Clases adicionales
 * @param {number} props.min - Valor mínimo (para type="number")
 * @param {number} props.max - Valor máximo (para type="number")
 */
export const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  disabled = false,
  icon: Icon,
  name,
  id,
  className = '',
  min,
  max,
  ...rest
}) => {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-black text-black uppercase mb-2 tracking-wide"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon className="h-5 w-5 text-gray-600" />
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          className={`
            w-full px-4 py-3 border-2 border-black font-bold text-black
            placeholder-gray-400 bg-white
            focus:outline-none focus:ring-2 focus:ring-brand-cyan-400 focus:border-brand-cyan-400
            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50
            transition-all
            ${Icon ? 'pl-11' : ''}
            ${error ? 'border-red-500 focus:ring-red-400 focus:border-red-500' : ''}
          `}
          {...rest}
        />
      </div>

      {error && (
        <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 bg-red-600 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * Textarea Component - Neobrutalism Design
 */
export const Textarea = ({
  label,
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  disabled = false,
  rows = 4,
  name,
  id,
  className = '',
  maxLength,
  ...rest
}) => {
  const textareaId = id || name || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const currentLength = value?.length || 0;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-black text-black uppercase mb-2 tracking-wide"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={`
          w-full px-4 py-3 border-2 border-black font-bold text-black
          placeholder-gray-400 bg-white resize-y
          focus:outline-none focus:ring-2 focus:ring-brand-cyan-400 focus:border-brand-cyan-400
          disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50
          transition-all
          ${error ? 'border-red-500 focus:ring-red-400 focus:border-red-500' : ''}
        `}
        {...rest}
      />

      <div className="flex items-center justify-between mt-2">
        {error && (
          <p className="text-sm font-bold text-red-600 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 bg-red-600 rounded-full"></span>
            {error}
          </p>
        )}
        {maxLength && (
          <p className={`text-sm font-bold ml-auto ${currentLength > maxLength * 0.9 ? 'text-red-600' : 'text-gray-600'}`}>
            {currentLength} / {maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Select Component - Neobrutalism Design
 */
export const Select = ({
  label,
  value,
  onChange,
  options = [],
  error = '',
  required = false,
  disabled = false,
  placeholder = 'Seleccionar...',
  name,
  id,
  className = '',
  ...rest
}) => {
  const selectId = id || name || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-black text-black uppercase mb-2 tracking-wide"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          w-full px-4 py-3 border-2 border-black font-bold text-black
          bg-white appearance-none cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-brand-cyan-400 focus:border-brand-cyan-400
          disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50
          transition-all
          ${error ? 'border-red-500 focus:ring-red-400 focus:border-red-500' : ''}
        `}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-2 text-sm font-bold text-red-600 flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 bg-red-600 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * Checkbox Component - Neobrutalism Design
 */
export const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  name,
  id,
  className = ''
}) => {
  const checkboxId = id || name || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <input
        type="checkbox"
        id={checkboxId}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-5 h-5 border-2 border-black cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed accent-brand-cyan-400"
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className="text-sm font-bold text-black cursor-pointer select-none"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Input;
