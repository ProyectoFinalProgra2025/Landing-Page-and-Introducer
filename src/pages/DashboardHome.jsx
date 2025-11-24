import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { empresasService, tareasService } from '../services/api';
import {
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  BarChart3,
  ArrowRight,
  Briefcase,
  AlertCircle,
  Smartphone
} from 'lucide-react';

const DashboardHome = () => {
  const { user } = useAuth();
  const [estadisticas, setEstadisticas] = useState(null);
  const [managerStats, setManagerStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (user?.rol === 'AdminEmpresa' && user?.empresaId) {
          const data = await empresasService.getEstadisticas(user.empresaId);
          setEstadisticas(data);
        } else if (user?.rol === 'ManagerDepartamento') {
          // Fetch tasks for manager to calculate stats
          // We use getAll because the backend filters by the manager's scope (department/assigned)
          const tasks = await tareasService.getAll();

          const stats = {
            total: tasks.length,
            pendientes: tasks.filter(t => t.estado === 0).length, // PENDIENTE
            enProgreso: tasks.filter(t => t.estado === 1).length, // EN_PROGRESO
            finalizadas: tasks.filter(t => t.estado === 2).length, // FINALIZADA
            canceladas: tasks.filter(t => t.estado === 3).length, // CANCELADA
            recentTasks: tasks.slice(0, 5) // Top 5 recent
          };
          setManagerStats(stats);
        }
      } catch (err) {
        console.error('Error al cargar datos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Componente de Tarjeta de Estadística
  const StatCard = ({ title, value, icon: Icon, colorClass, borderClass }) => (
    <div className={`bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-black text-gray-600 uppercase tracking-wider">{title}</p>
          <p className="text-4xl font-black text-black mt-2">{value}</p>
        </div>
        <div className={`${colorClass} p-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
          <Icon className="h-8 w-8 text-black" />
        </div>
      </div>
    </div>
  );

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
      <div className="space-y-8 animate-fade-in">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan-200 rounded-full border-4 border-black -mr-10 -mt-10 opacity-50"></div>
          <h1 className="text-4xl md:text-5xl font-black text-black relative z-10">
            Bienvenido, {user?.nombreCompleto}
          </h1>
          <p className="mt-4 text-xl font-bold text-gray-600 uppercase tracking-wider relative z-10">
            Panel de Control - <span className="text-black bg-brand-cyan-300 px-2 border-2 border-black transform -rotate-1 inline-block">{estadisticas?.nombreEmpresa || 'Tu Empresa'}</span>
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black"></div>
          </div>
        ) : estadisticas ? (
          <>
            {/* Estadísticas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            </div>

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

            {/* Accesos Rápidos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/dashboard/employees"
                className="group block bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 hover:bg-brand-cyan-50 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-brand-cyan-400 border-2 border-black flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <Users className="h-6 w-6 text-black" />
                  </div>
                  <ArrowRight className="h-6 w-6 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-2xl font-black text-black">Empleados</h3>
                <p className="text-sm font-bold text-gray-600 mt-2">Gestiona tu equipo de trabajo</p>
              </Link>

              <Link
                to="/dashboard/statistics"
                className="group block bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 hover:bg-brand-yellow-50 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-brand-yellow-400 border-2 border-black flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <BarChart3 className="h-6 w-6 text-black" />
                  </div>
                  <ArrowRight className="h-6 w-6 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-2xl font-black text-black">Estadísticas</h3>
                <p className="text-sm font-bold text-gray-600 mt-2">Métricas y análisis detallados</p>
              </Link>

              <Link
                to="/dashboard/my-company"
                className="group block bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 hover:bg-gray-50 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <Building2 className="h-6 w-6 text-brand-yellow-400" />
                  </div>
                  <ArrowRight className="h-6 w-6 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-2xl font-black text-black">Mi Empresa</h3>
                <p className="text-sm font-bold text-gray-600 mt-2">Información y configuración</p>
              </Link>
            </div>
          </>
        ) : null}
      </div>
    );
  }

  // Vista para ManagerDepartamento
  if (user?.rol === 'ManagerDepartamento') {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
          <h1 className="text-4xl md:text-5xl font-black text-black">
            Hola Manager, {user?.nombreCompleto}
          </h1>
          <p className="mt-4 text-xl font-bold text-gray-600 uppercase tracking-wider">
            Gestión de Departamento
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black"></div>
          </div>
        ) : managerStats ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                value={managerStats.enProgreso}
                icon={BarChart3}
                colorClass="bg-brand-cyan-400"
              />
              <StatCard
                title="Finalizadas"
                value={managerStats.finalizadas}
                icon={CheckCircle}
                colorClass="bg-green-400"
              />
            </div>

            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
              <h2 className="text-2xl font-black text-black mb-6 uppercase flex items-center gap-3">
                <Clock className="h-8 w-8" />
                Tareas Recientes
              </h2>
              {managerStats.recentTasks.length > 0 ? (
                <div className="space-y-4">
                  {managerStats.recentTasks.map((task) => (
                    <div key={task.id} className="border-2 border-black p-4 hover:bg-gray-50 transition-colors flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-lg">{task.titulo}</h4>
                        <p className="text-sm text-gray-600">{task.descripcion}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-bold border-2 border-black uppercase ${task.estado === 0 ? 'bg-brand-yellow-400' :
                          task.estado === 1 ? 'bg-brand-cyan-400' :
                            task.estado === 2 ? 'bg-green-400' : 'bg-red-400'
                        }`}>
                        {task.estado === 0 ? 'Pendiente' :
                          task.estado === 1 ? 'En Progreso' :
                            task.estado === 2 ? 'Finalizada' : 'Cancelada'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 font-bold italic">No hay tareas recientes.</p>
              )}
            </div>
          </>
        ) : null}
      </div>
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
