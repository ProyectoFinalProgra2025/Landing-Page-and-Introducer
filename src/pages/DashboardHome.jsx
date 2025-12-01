import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { empresasService } from '../services/api';
import {
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  BarChart3,
  ArrowRight,
  Briefcase,
  Smartphone,
  PlusCircle,
  ListChecks,
  TrendingUp
} from 'lucide-react';

// New components
import StatCard, { MiniStatCard, StatGrid } from '../components/dashboard/StatCard';
import QuickActionCard, { QuickActionsGrid } from '../components/dashboard/QuickActionCard';
import RealtimeIndicator, { ConnectionStatusBanner } from '../components/dashboard/RealtimeIndicator';
import TaskList, { GroupedTaskList } from '../components/tasks/TaskList';
import CreateTaskModal from '../components/tasks/CreateTaskModal';
import { useSignalR } from '../hooks/useSignalR';
import { useTasks, useMyTasks } from '../hooks/useTasks';

const DashboardHome = () => {
  const { user } = useAuth();
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // SignalR connection
  const { isConnected } = useSignalR();

  // Get tasks for ManagerDepartamento
  const {
    tasks: managerTasks,
    loading: tasksLoading,
    createTask,
    refresh: refreshTasks
  } = useTasks({}, user?.rol === 'ManagerDepartamento');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (user?.rol === 'AdminEmpresa' && user?.empresaId) {
          const data = await empresasService.getEstadisticas(user.empresaId);
          setEstadisticas(data);
        }
      } catch (err) {
        console.error('Error al cargar datos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Calculate manager stats from tasks
  const managerStats = managerTasks ? {
    total: managerTasks.length,
    pendientes: managerTasks.filter(t => t.estado === 0).length,
    asignadas: managerTasks.filter(t => t.estado === 1).length,
    enProgreso: managerTasks.filter(t => t.estado === 2).length,
    finalizadas: managerTasks.filter(t => t.estado === 3).length,
    canceladas: managerTasks.filter(t => t.estado === 4).length,
    recentTasks: managerTasks.slice(0, 5)
  } : null;

  const handleCreateTask = async (taskData) => {
    await createTask(taskData);
    setIsCreateModalOpen(false);
  };


  // Vista para AdminGeneral
  if (user?.rol === 'AdminGeneral') {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
          <h1 className="text-5xl font-black text-black tracking-tight">
            Hola, <span className="text-brand-yellow-400 bg-black px-2">{user?.nombreCompleto}</span>
          </h1>
          <p className="mt-4 text-xl font-bold text-gray-700 uppercase tracking-wider">
            Panel de Super Administrador
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-yellow-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col justify-between hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200">
            <div>
              <div className="w-16 h-16 bg-brand-yellow-400 border-2 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Building2 className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-3xl font-black text-black uppercase mb-4">Gestión de Empresas</h3>
              <p className="text-lg font-bold text-gray-800 mb-6">
                Administra el registro, aprobación y monitoreo de todas las empresas en la plataforma.
              </p>
            </div>
            <Link
              to="/dashboard/companies"
              className="inline-flex items-center justify-center px-6 py-4 bg-black text-white font-black text-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0)] hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              Gestionar Empresas
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </div>

          <div className="bg-brand-cyan-100 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col justify-between hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200">
            <div>
              <div className="w-16 h-16 bg-brand-cyan-400 border-2 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <BarChart3 className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-3xl font-black text-black uppercase mb-4">Métricas Globales</h3>
              <p className="text-lg font-bold text-gray-800 mb-6">
                Visualiza el rendimiento general del sistema y la actividad de las empresas.
              </p>
            </div>
            <button
              disabled
              className="inline-flex items-center justify-center px-6 py-4 bg-gray-300 text-gray-600 font-black text-lg border-2 border-black cursor-not-allowed opacity-75"
            >
              Próximamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vista para AdminEmpresa
  if (user?.rol === 'AdminEmpresa') {
    return (
      <>
        <ConnectionStatusBanner />
        <div className="space-y-8 animate-fade-in">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan-200 rounded-full border-4 border-black -mr-10 -mt-10 opacity-50"></div>
            <div className="flex items-start justify-between relative z-10">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-black">
                  Bienvenido, {user?.nombreCompleto}
                </h1>
                <p className="mt-4 text-xl font-bold text-gray-600 uppercase tracking-wider">
                  Panel de Control - <span className="text-black bg-brand-cyan-300 px-2 border-2 border-black transform -rotate-1 inline-block">{estadisticas?.nombreEmpresa || 'Tu Empresa'}</span>
                </p>
              </div>
              <RealtimeIndicator variant="badge" />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black"></div>
            </div>
          ) : estadisticas ? (
            <>
              {/* Estadísticas Rápidas con StatGrid */}
              <StatGrid>
                <StatCard
                  title="Total Empleados"
                  value={estadisticas.totalTrabajadores}
                  icon={Users}
                  colorClass="bg-brand-cyan-400"
                />
                <StatCard
                  title="Empleados Activos"
                  value={estadisticas.trabajadoresActivos}
                  icon={CheckCircle}
                  colorClass="bg-brand-yellow-400"
                />
                <StatCard
                  title="Total Tareas"
                  value={estadisticas.totalTareas}
                  icon={Briefcase}
                  colorClass="bg-purple-400"
                />
              </StatGrid>

            {/* Estado de Tareas */}
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
              <h2 className="text-3xl font-black text-black mb-8 uppercase flex items-center gap-3">
                <BarChart3 className="h-8 w-8" />
                Estado de Tareas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-brand-yellow-100 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto bg-brand-yellow-400 border-2 border-black mb-4">
                    <Clock className="h-8 w-8 text-black" />
                  </div>
                  <p className="text-4xl font-black text-black">{estadisticas.tareasPendientes}</p>
                  <p className="text-sm font-bold text-gray-700 uppercase mt-2">Pendientes</p>
                </div>
                <div className="text-center p-6 bg-brand-cyan-100 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto bg-brand-cyan-400 border-2 border-black mb-4">
                    <BarChart3 className="h-8 w-8 text-black" />
                  </div>
                  <p className="text-4xl font-black text-black">{estadisticas.tareasAsignadas}</p>
                  <p className="text-sm font-bold text-gray-700 uppercase mt-2">En Progreso</p>
                </div>
                <div className="text-center p-6 bg-green-100 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-400 border-2 border-black mb-4">
                    <CheckCircle className="h-8 w-8 text-black" />
                  </div>
                  <p className="text-4xl font-black text-black">{estadisticas.tareasFinalizadas}</p>
                  <p className="text-sm font-bold text-gray-700 uppercase mt-2">Finalizadas</p>
                </div>
                <div className="text-center p-6 bg-red-100 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-400 border-2 border-black mb-4">
                    <XCircle className="h-8 w-8 text-black" />
                  </div>
                  <p className="text-4xl font-black text-black">{estadisticas.tareasCanceladas}</p>
                  <p className="text-sm font-bold text-gray-700 uppercase mt-2">Canceladas</p>
                </div>
              </div>
            </div>

              {/* Accesos Rápidos con QuickActionsGrid */}
              <QuickActionsGrid>
                <QuickActionCard
                  title="Empleados"
                  subtitle="Gestiona tu equipo"
                  icon={Users}
                  gradient="bg-brand-cyan-300"
                  onClick={() => window.location.href = '/dashboard/employees'}
                />
                <QuickActionCard
                  title="Estadísticas"
                  subtitle="Métricas y análisis"
                  icon={BarChart3}
                  gradient="bg-brand-yellow-300"
                  onClick={() => window.location.href = '/dashboard/statistics'}
                />
                <QuickActionCard
                  title="Mi Empresa"
                  subtitle="Configuración"
                  icon={Building2}
                  gradient="bg-gray-300"
                  onClick={() => window.location.href = '/dashboard/my-company'}
                />
              </QuickActionsGrid>
            </>
          ) : null}
        </div>
      </>
    );
  }

  // Vista para ManagerDepartamento
  if (user?.rol === 'ManagerDepartamento') {
    return (
      <>
        <ConnectionStatusBanner />
        <div className="space-y-8 animate-fade-in">
          {/* Header with Real-time Indicator */}
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full border-4 border-black -mr-10 -mt-10 opacity-50"></div>
            <div className="flex items-start justify-between relative z-10">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-black">
                  Hola Manager, {user?.nombreCompleto}
                </h1>
                <p className="mt-4 text-xl font-bold text-gray-600 uppercase tracking-wider">
                  Gestión de Departamento
                </p>
              </div>
              <RealtimeIndicator variant="badge" />
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActionsGrid>
            <QuickActionCard
              title="Nueva Tarea"
              subtitle="Crear y asignar tarea"
              icon={PlusCircle}
              gradient="bg-brand-cyan-300"
              onClick={() => setIsCreateModalOpen(true)}
            />
            <QuickActionCard
              title="Ver Todas"
              subtitle="Gestionar tareas"
              icon={ListChecks}
              gradient="bg-brand-yellow-300"
              onClick={() => window.location.href = '/dashboard/tasks'}
            />
            <QuickActionCard
              title="Reportes"
              subtitle="Estadísticas detalladas"
              icon={TrendingUp}
              gradient="bg-purple-300"
              onClick={() => window.location.href = '/dashboard/statistics'}
            />
          </QuickActionsGrid>

          {/* Statistics */}
          {(tasksLoading || loading) ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black"></div>
            </div>
          ) : managerStats ? (
            <>
              <StatGrid>
                <StatCard
                  title="Total Tareas"
                  value={managerStats.total}
                  icon={Briefcase}
                  colorClass="bg-purple-400"
                />
                <StatCard
                  title="Pendientes"
                  value={managerStats.pendientes}
                  icon={Clock}
                  colorClass="bg-brand-yellow-400"
                />
                <StatCard
                  title="En Progreso"
                  value={managerStats.asignadas + managerStats.enProgreso}
                  icon={BarChart3}
                  colorClass="bg-brand-cyan-400"
                />
                <StatCard
                  title="Finalizadas"
                  value={managerStats.finalizadas}
                  icon={CheckCircle}
                  colorClass="bg-green-400"
                />
              </StatGrid>

              {/* Recent Tasks with New Components */}
              <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-black uppercase flex items-center gap-3">
                    <Clock className="h-8 w-8" />
                    Tareas Recientes
                  </h2>
                  <Link
                    to="/dashboard/tasks"
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white border-2 border-black font-bold text-sm hover:bg-gray-800 transition-colors"
                  >
                    Ver Todas
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <TaskList
                  tasks={managerStats.recentTasks}
                  viewMode="list"
                  onTaskClick={(task) => window.location.href = `/dashboard/tasks/${task.id}`}
                  loading={tasksLoading}
                  emptyMessage="No hay tareas recientes en tu departamento"
                />
              </div>

              {/* Grouped Tasks Overview */}
              <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
                <h2 className="text-2xl font-black text-black uppercase mb-6 flex items-center gap-3">
                  <Briefcase className="h-8 w-8" />
                  Vista General por Estado
                </h2>
                <GroupedTaskList
                  tasks={managerTasks}
                  onTaskClick={(task) => window.location.href = `/dashboard/tasks/${task.id}`}
                  loading={tasksLoading}
                />
              </div>
            </>
          ) : null}
        </div>

        {/* Create Task Modal */}
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateTask}
          usuarios={[]}
        />
      </>
    );
  }

  // Vista Fallback para Usuario (Worker)
  if (user?.rol === 'Usuario') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
          <div className="w-24 h-24 bg-brand-yellow-400 border-4 border-black rounded-full flex items-center justify-center mx-auto mb-6">
            <Smartphone className="h-12 w-12 text-black" />
          </div>
          <h2 className="text-3xl font-black text-black mb-4 uppercase">Solo App Móvil</h2>
          <p className="text-lg font-bold text-gray-700 mb-8">
            Hola {user?.nombreCompleto}, tu cuenta de trabajador está diseñada para ser utilizada exclusivamente en nuestra aplicación móvil.
          </p>

          <div className="space-y-4">
            <div className="p-4 bg-gray-100 border-2 border-black">
              <p className="font-bold text-sm uppercase tracking-wider mb-2">Descarga la App</p>
              <div className="flex gap-2 justify-center">
                <button className="px-4 py-2 bg-black text-white font-bold text-sm border-2 border-black hover:bg-gray-800 transition-colors">
                  App Store
                </button>
                <button className="px-4 py-2 bg-black text-white font-bold text-sm border-2 border-black hover:bg-gray-800 transition-colors">
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DashboardHome;
