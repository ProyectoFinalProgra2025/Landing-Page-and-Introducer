import React, { useState } from 'react';
import { X, SlidersHorizontal, Search } from 'lucide-react';
import { Select } from '../common/Input';
import Button from '../common/Button';
import {
  TASK_STATES_LABELS,
  PRIORITIES_LABELS,
  DEPARTMENTS_LABELS
} from '../../utils/constants';

/**
 * TaskFilters Component - Sistema de filtros para tareas
 *
 * @param {Object} props
 * @param {Object} props.filters - Filtros actuales { estado, prioridad, departamento, searchQuery }
 * @param {Function} props.onFilterChange - Callback cuando cambian los filtros
 * @param {Function} props.onClearFilters - Callback para limpiar filtros
 * @param {boolean} props.showSearch - Mostrar campo de búsqueda
 * @param {boolean} props.compact - Modo compacto
 * @param {string} props.className - Clases adicionales
 */
const TaskFilters = ({
  filters = {},
  onFilterChange,
  onClearFilters,
  showSearch = true,
  compact = false,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(!compact);

  const hasActiveFilters =
    filters.estado !== undefined ||
    filters.prioridad !== undefined ||
    filters.departamento !== undefined ||
    (filters.searchQuery && filters.searchQuery.trim() !== '');

  const handleFilterChange = (key, value) => {
    onFilterChange?.({
      ...filters,
      [key]: value === '' ? undefined : value
    });
  };

  const handleClearAll = () => {
    onClearFilters?.();
  };

  // Compact mode - Solo botón y chips
  if (compact && !isExpanded) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <button
          onClick={() => setIsExpanded(true)}
          className={`
            flex items-center gap-2 px-4 py-2 border-2 border-black font-bold
            ${hasActiveFilters ? 'bg-brand-cyan-400' : 'bg-white'}
            hover:bg-brand-cyan-300 transition-colors
          `}
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filtros</span>
          {hasActiveFilters && (
            <span className="bg-black text-white px-2 py-0.5 text-xs font-black rounded-full">
              {Object.values(filters).filter(v => v !== undefined && v !== '').length}
            </span>
          )}
        </button>

        {/* Active Filters Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            {filters.estado !== undefined && (
              <FilterChip
                label={`Estado: ${TASK_STATES_LABELS[filters.estado]}`}
                onRemove={() => handleFilterChange('estado', undefined)}
              />
            )}
            {filters.prioridad !== undefined && (
              <FilterChip
                label={`Prioridad: ${PRIORITIES_LABELS[filters.prioridad]}`}
                onRemove={() => handleFilterChange('prioridad', undefined)}
              />
            )}
            {filters.departamento !== undefined && (
              <FilterChip
                label={`Depto: ${DEPARTMENTS_LABELS[filters.departamento]}`}
                onRemove={() => handleFilterChange('departamento', undefined)}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  // Full mode
  return (
    <div className={`bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="h-6 w-6 text-black" />
          <h3 className="text-xl font-black text-black uppercase tracking-tight">
            Filtros
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="danger"
              size="sm"
              onClick={handleClearAll}
            >
              Limpiar Todo
            </Button>
          )}
          {compact && (
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 border-2 border-black hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      {showSearch && (
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" />
            <input
              type="text"
              value={filters.searchQuery || ''}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              placeholder="Buscar por título, descripción..."
              className="w-full pl-11 pr-4 py-3 border-2 border-black font-bold bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan-400"
            />
          </div>
        </div>
      )}

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Estado */}
        <Select
          label="Estado"
          value={filters.estado ?? ''}
          onChange={(e) => handleFilterChange('estado', e.target.value === '' ? undefined : parseInt(e.target.value))}
          options={[
            { value: '', label: 'Todos los estados' },
            ...Object.entries(TASK_STATES_LABELS).map(([key, label]) => ({
              value: key,
              label
            }))
          ]}
        />

        {/* Prioridad */}
        <Select
          label="Prioridad"
          value={filters.prioridad ?? ''}
          onChange={(e) => handleFilterChange('prioridad', e.target.value === '' ? undefined : parseInt(e.target.value))}
          options={[
            { value: '', label: 'Todas las prioridades' },
            ...Object.entries(PRIORITIES_LABELS).map(([key, label]) => ({
              value: key,
              label
            }))
          ]}
        />

        {/* Departamento */}
        <Select
          label="Departamento"
          value={filters.departamento ?? ''}
          onChange={(e) => handleFilterChange('departamento', e.target.value === '' ? undefined : parseInt(e.target.value))}
          options={[
            { value: '', label: 'Todos los departamentos' },
            ...Object.entries(DEPARTMENTS_LABELS).map(([key, label]) => ({
              value: key,
              label
            }))
          ]}
        />
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="pt-6 border-t-2 border-black">
          <p className="text-sm font-bold text-gray-600 mb-3">Filtros activos:</p>
          <div className="flex flex-wrap gap-2">
            {filters.estado !== undefined && (
              <FilterChip
                label={`Estado: ${TASK_STATES_LABELS[filters.estado]}`}
                onRemove={() => handleFilterChange('estado', undefined)}
                color="bg-brand-cyan-300"
              />
            )}
            {filters.prioridad !== undefined && (
              <FilterChip
                label={`Prioridad: ${PRIORITIES_LABELS[filters.prioridad]}`}
                onRemove={() => handleFilterChange('prioridad', undefined)}
                color="bg-brand-yellow-300"
              />
            )}
            {filters.departamento !== undefined && (
              <FilterChip
                label={`Departamento: ${DEPARTMENTS_LABELS[filters.departamento]}`}
                onRemove={() => handleFilterChange('departamento', undefined)}
                color="bg-purple-300"
              />
            )}
            {filters.searchQuery && filters.searchQuery.trim() !== '' && (
              <FilterChip
                label={`Búsqueda: "${filters.searchQuery}"`}
                onRemove={() => handleFilterChange('searchQuery', '')}
                color="bg-gray-300"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * FilterChip - Chip de filtro activo
 */
const FilterChip = ({ label, onRemove, color = 'bg-brand-cyan-300' }) => {
  return (
    <div
      className={`
        inline-flex items-center gap-2 px-3 py-1.5
        ${color} border-2 border-black
        text-sm font-bold text-black
        shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
      `}
    >
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
};

/**
 * Quick Filters - Filtros rápidos predefinidos
 */
export const QuickFilters = ({ onFilterSelect, className = '' }) => {
  const quickFilters = [
    { label: 'Mis Tareas', filters: { asignadoA: 'me' } },
    { label: 'Urgentes', filters: { prioridad: 3 } },
    { label: 'Vencidas', filters: { vencidas: true } },
    { label: 'Sin Asignar', filters: { estado: 0 } },
    { label: 'En Progreso', filters: { estado: 2 } },
    { label: 'Completadas', filters: { estado: 3 } }
  ];

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {quickFilters.map((filter, index) => (
        <button
          key={index}
          onClick={() => onFilterSelect(filter.filters)}
          className="px-4 py-2 bg-white border-2 border-black font-bold text-sm hover:bg-brand-cyan-400 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

/**
 * Filter Modal - Filtros en modal para móvil
 */
export const FilterModal = ({ isOpen, onClose, filters, onFilterChange, onClearFilters }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="flex min-h-full items-end justify-center sm:items-center">
        <div className="w-full max-w-lg bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-slide-up">
          <div className="flex items-center justify-between p-6 border-b-4 border-black">
            <h2 className="text-2xl font-black text-black uppercase">Filtros</h2>
            <button onClick={onClose} className="p-2 border-2 border-black hover:bg-gray-100">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-6">
            <TaskFilters
              filters={filters}
              onFilterChange={onFilterChange}
              onClearFilters={onClearFilters}
              showSearch={true}
              compact={false}
            />
          </div>
          <div className="p-6 border-t-4 border-black">
            <Button variant="primary" onClick={onClose} fullWidth>
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
