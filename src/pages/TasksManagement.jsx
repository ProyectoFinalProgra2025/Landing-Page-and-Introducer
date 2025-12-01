import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  PlusCircle,
  LayoutGrid,
  List as ListIcon,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Calendar as CalendarIcon
} from 'lucide-react';

// Components
import Button from '../components/common/Button';
import TaskList, { KanbanTaskList } from '../components/tasks/TaskList';
import TaskFilters, { QuickFilters } from '../components/tasks/TaskFilters';
import CreateTaskModal from '../components/tasks/CreateTaskModal';
import RealtimeIndicator from '../components/dashboard/RealtimeIndicator';
import { Spinner } from '../components/common/Spinner';

// Hooks
import { useTasks } from '../hooks/useTasks';
import { useSignalR } from '../hooks/useSignalR';

/**
 * TasksManagement Page - Página de gestión completa de tareas
 */
const TasksManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isConnected } = useSignalR();

  // View and filter states
  const [viewMode, setViewMode] = useState('list'); // 'list', 'grid', 'kanban'
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Tasks hook with real-time updates
  const {
    tasks,
    loading,
    error,
    refresh,
    createTask,
    deleteTask
  } = useTasks(filters, true);

  // Handlers
  const handleTaskClick = (task) => {
    navigate(`/dashboard/tasks/${task.id}`);
  };

  const handleCreateTask = async (taskData) => {
    await createTask(taskData);
    setIsCreateModalOpen(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleQuickFilter = (quickFilters) => {
    setFilters({ ...filters, ...quickFilters });
  };

  const handleExportCSV = () => {
    // TODO: Implement CSV export
    console.log('Exportar CSV');
  };

  const handleImportCSV = () => {
    // TODO: Implement CSV import
    console.log('Importar CSV');
  };

  // Check permissions
  const canCreateTask = user?.rol === 'AdminEmpresa' || user?.rol === 'ManagerDepartamento';
  const canManageTasks = user?.rol === 'AdminEmpresa' || user?.rol === 'ManagerDepartamento';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-brand-cyan-400 border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <ListIcon className="h-8 w-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight">
                Gestión de Tareas
              </h1>
              <p className="text-sm font-bold text-gray-600 mt-1">
                {tasks?.length || 0} tarea{tasks?.length !== 1 ? 's' : ''} encontrada{tasks?.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RealtimeIndicator variant="badge" />
            {canCreateTask && (
              <Button
                variant="primary"
                icon={PlusCircle}
                onClick={() => setIsCreateModalOpen(true)}
              >
                Nueva Tarea
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <QuickFilters onFilterSelect={handleQuickFilter} />

      {/* Toolbar */}
      <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-600 uppercase mr-2">Vista:</span>
            <button
              onClick={() => setViewMode('list')}
              className={`
                p-2 border-2 border-black transition-all
                ${viewMode === 'list' ? 'bg-brand-cyan-400' : 'bg-white hover:bg-gray-100'}
              `}
              title="Vista Lista"
            >
              <ListIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`
                p-2 border-2 border-black transition-all
                ${viewMode === 'grid' ? 'bg-brand-cyan-400' : 'bg-white hover:bg-gray-100'}
              `}
              title="Vista Grilla"
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`
                p-2 border-2 border-black transition-all
                ${viewMode === 'kanban' ? 'bg-brand-cyan-400' : 'bg-white hover:bg-gray-100'}
              `}
              title="Vista Kanban"
            >
              <CalendarIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              icon={Filter}
              onClick={() => setShowFilters(!showFilters)}
              size="sm"
            >
              {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
            </Button>
            <Button
              variant="outline"
              icon={RefreshCw}
              onClick={refresh}
              size="sm"
              disabled={loading}
            >
              Actualizar
            </Button>
            {canManageTasks && (
              <>
                <Button
                  variant="outline"
                  icon={Download}
                  onClick={handleExportCSV}
                  size="sm"
                >
                  Exportar
                </Button>
                <Button
                  variant="outline"
                  icon={Upload}
                  onClick={handleImportCSV}
                  size="sm"
                >
                  Importar
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <TaskFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          showSearch={true}
          compact={false}
        />
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border-4 border-red-600 p-6">
          <p className="text-lg font-black text-red-900 uppercase">Error al cargar tareas</p>
          <p className="text-sm font-bold text-red-800 mt-2">{error}</p>
          <Button
            variant="danger"
            onClick={refresh}
            className="mt-4"
            size="sm"
          >
            Reintentar
          </Button>
        </div>
      )}

      {/* Tasks Content */}
      {loading && !tasks ? (
        <div className="flex justify-center py-20">
          <Spinner text="Cargando tareas..." />
        </div>
      ) : viewMode === 'kanban' ? (
        <KanbanTaskList
          tasks={tasks}
          onTaskClick={handleTaskClick}
          loading={loading}
        />
      ) : (
        <TaskList
          tasks={tasks}
          onTaskClick={handleTaskClick}
          loading={loading}
          viewMode={viewMode}
          emptyMessage="No se encontraron tareas con los filtros aplicados"
        />
      )}

      {/* Create Task Modal */}
      {canCreateTask && (
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateTask}
          usuarios={[]}
        />
      )}
    </div>
  );
};

export default TasksManagement;
