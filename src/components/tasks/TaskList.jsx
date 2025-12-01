import React, { useState } from 'react';
import TaskCard, { CompactTaskCard, TaskGridItem, TaskListItem } from './TaskCard';
import EmptyState from '../common/EmptyState';
import Spinner, { ListSkeleton } from '../common/Spinner';
import { FileText, LayoutGrid, List as ListIcon } from 'lucide-react';
import { filterTasksBySearch, sortByPriority, sortByDueDate, sortByCreatedAt } from '../../utils/taskUtils';

/**
 * TaskList Component - Lista de tareas con múltiples vistas
 *
 * @param {Object} props
 * @param {Array} props.tasks - Array de tareas
 * @param {Function} props.onTaskClick - Callback al hacer click en una tarea
 * @param {boolean} props.loading - Estado de carga
 * @param {string} props.emptyMessage - Mensaje cuando no hay tareas
 * @param {'grid'|'list'|'compact'|'simple'} props.viewMode - Modo de visualización
 * @param {boolean} props.showViewToggle - Mostrar toggle de vista
 * @param {boolean} props.enableSearch - Habilitar búsqueda local
 * @param {boolean} props.enableSort - Habilitar ordenamiento
 * @param {string} props.className - Clases adicionales
 */
const TaskList = ({
  tasks = [],
  onTaskClick,
  loading = false,
  emptyMessage = 'No hay tareas disponibles',
  viewMode: initialViewMode = 'list',
  showViewToggle = false,
  enableSearch = false,
  enableSort = false,
  className = ''
}) => {
  const [viewMode, setViewMode] = useState(initialViewMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created'); // 'created', 'priority', 'dueDate'

  // Loading state
  if (loading) {
    return (
      <div className={className}>
        <ListSkeleton items={3} />
      </div>
    );
  }

  // Filtrar y ordenar tareas
  let filteredTasks = tasks;

  if (enableSearch && searchQuery) {
    filteredTasks = filterTasksBySearch(filteredTasks, searchQuery);
  }

  if (enableSort) {
    switch (sortBy) {
      case 'priority':
        filteredTasks = sortByPriority(filteredTasks);
        break;
      case 'dueDate':
        filteredTasks = sortByDueDate(filteredTasks);
        break;
      case 'created':
      default:
        filteredTasks = sortByCreatedAt(filteredTasks);
        break;
    }
  }

  // Empty state
  if (!filteredTasks || filteredTasks.length === 0) {
    return (
      <div className={className}>
        <EmptyState
          icon={FileText}
          title="No hay tareas"
          description={emptyMessage}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Controls */}
      {(showViewToggle || enableSearch || enableSort) && (
        <div className="mb-6 space-y-4">
          {/* Search */}
          {enableSearch && (
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar tareas..."
                className="w-full px-4 py-3 border-2 border-black font-bold bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan-400"
              />
            </div>
          )}

          {/* View Toggle & Sort */}
          <div className="flex items-center justify-between">
            {showViewToggle && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`
                    p-2 border-2 border-black transition-all
                    ${viewMode === 'grid' ? 'bg-brand-cyan-400' : 'bg-white hover:bg-gray-100'}
                  `}
                >
                  <LayoutGrid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`
                    p-2 border-2 border-black transition-all
                    ${viewMode === 'list' ? 'bg-brand-cyan-400' : 'bg-white hover:bg-gray-100'}
                  `}
                >
                  <ListIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('compact')}
                  className={`
                    p-2 border-2 border-black transition-all
                    ${viewMode === 'compact' ? 'bg-brand-cyan-400' : 'bg-white hover:bg-gray-100'}
                  `}
                >
                  <ListIcon className="h-4 w-4" />
                </button>
              </div>
            )}

            {enableSort && (
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-black font-bold bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan-400"
              >
                <option value="created">Más recientes</option>
                <option value="priority">Por prioridad</option>
                <option value="dueDate">Por vencimiento</option>
              </select>
            )}
          </div>
        </div>
      )}

      {/* Task List - Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskGridItem
              key={task.id}
              task={task}
              onClick={onTaskClick}
            />
          ))}
        </div>
      )}

      {/* Task List - List View */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={onTaskClick}
              showAssignee
              showDueDate
              showPriority
            />
          ))}
        </div>
      )}

      {/* Task List - Compact View */}
      {viewMode === 'compact' && (
        <div className="grid grid-cols-1 gap-3">
          {filteredTasks.map((task) => (
            <CompactTaskCard
              key={task.id}
              task={task}
              onClick={onTaskClick}
            />
          ))}
        </div>
      )}

      {/* Task List - Simple View */}
      {viewMode === 'simple' && (
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              onClick={onTaskClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Grouped TaskList - Lista agrupada por estado
 */
export const GroupedTaskList = ({
  tasks = [],
  onTaskClick,
  loading = false,
  className = ''
}) => {
  const groupedTasks = {
    pendientes: tasks.filter(t => t.estado === 0),
    asignadas: tasks.filter(t => t.estado === 1),
    enProgreso: tasks.filter(t => t.estado === 2),
    finalizadas: tasks.filter(t => t.estado === 3),
    canceladas: tasks.filter(t => t.estado === 4)
  };

  if (loading) {
    return <Spinner text="Cargando tareas..." />;
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Pendientes */}
      {groupedTasks.pendientes.length > 0 && (
        <div>
          <h3 className="text-xl font-black text-black uppercase mb-4 flex items-center gap-2">
            <span className="w-4 h-4 bg-brand-yellow-400 border-2 border-black"></span>
            Pendientes ({groupedTasks.pendientes.length})
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {groupedTasks.pendientes.map(task => (
              <CompactTaskCard key={task.id} task={task} onClick={onTaskClick} />
            ))}
          </div>
        </div>
      )}

      {/* En Progreso */}
      {(groupedTasks.asignadas.length > 0 || groupedTasks.enProgreso.length > 0) && (
        <div>
          <h3 className="text-xl font-black text-black uppercase mb-4 flex items-center gap-2">
            <span className="w-4 h-4 bg-brand-cyan-400 border-2 border-black"></span>
            En Progreso ({groupedTasks.asignadas.length + groupedTasks.enProgreso.length})
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {[...groupedTasks.asignadas, ...groupedTasks.enProgreso].map(task => (
              <CompactTaskCard key={task.id} task={task} onClick={onTaskClick} />
            ))}
          </div>
        </div>
      )}

      {/* Finalizadas */}
      {groupedTasks.finalizadas.length > 0 && (
        <div>
          <h3 className="text-xl font-black text-black uppercase mb-4 flex items-center gap-2">
            <span className="w-4 h-4 bg-green-400 border-2 border-black"></span>
            Finalizadas ({groupedTasks.finalizadas.length})
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {groupedTasks.finalizadas.map(task => (
              <CompactTaskCard key={task.id} task={task} onClick={onTaskClick} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Kanban TaskList - Vista kanban
 */
export const KanbanTaskList = ({
  tasks = [],
  onTaskClick,
  loading = false,
  className = ''
}) => {
  const columns = [
    { id: 0, title: 'Pendiente', color: 'bg-brand-yellow-400' },
    { id: 1, title: 'Asignada', color: 'bg-brand-cyan-400' },
    { id: 2, title: 'En Progreso', color: 'bg-purple-400' },
    { id: 3, title: 'Finalizada', color: 'bg-green-400' }
  ];

  if (loading) {
    return <Spinner text="Cargando tareas..." />;
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {columns.map(column => {
        const columnTasks = tasks.filter(t => t.estado === column.id);

        return (
          <div key={column.id} className="flex flex-col">
            {/* Column Header */}
            <div className={`${column.color} border-4 border-black p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
              <h3 className="text-lg font-black text-black uppercase">
                {column.title}
              </h3>
              <p className="text-sm font-bold text-black opacity-75">
                {columnTasks.length} tarea{columnTasks.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Column Tasks */}
            <div className="space-y-3 flex-1">
              {columnTasks.length === 0 ? (
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 p-8 text-center">
                  <p className="text-sm font-bold text-gray-500">Sin tareas</p>
                </div>
              ) : (
                columnTasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => onTaskClick?.(task)}
                    className="bg-white border-2 border-black p-4 cursor-pointer hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                  >
                    <h4 className="text-sm font-black text-black line-clamp-2 mb-2">
                      {task.titulo}
                    </h4>
                    {task.asignadoANombre && (
                      <p className="text-xs font-bold text-gray-600">
                        {task.asignadoANombre}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
