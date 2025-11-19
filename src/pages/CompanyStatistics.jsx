import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { empresasService } from '../services/api';
import {
  BarChart3,
  Users,
  CheckCircle,
  Clock,
  PlayCircle,
  XCircle,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const CompanyStatistics = () => {
  const { user } = useAuth();
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEstadisticas = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await empresasService.getEstadisticas(user.empresaId);
        setEstadisticas(data);
      } catch (err) {
        setError('Error al cargar las estadísticas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.empresaId) {
      loadEstadisticas();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-black border-t-brand-cyan-500"></div>
          <p className="mt-4 text-xl font-black text-black uppercase tracking-wider">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-4 border-black shadow-brutal p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-500 border-2 border-black flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-white" />
          </div>
          <p className="text-lg font-bold text-black">{error}</p>
        </div>
      </div>
    );
  }

  if (!estadisticas) return null;

  const trabajadoresStats = [
    {
      name: 'Total Trabajadores',
      value: estadisticas.totalTrabajadores,
      icon: Users,
      color: 'brand-cyan-500',
      bgColor: 'brand-cyan-100',
    },
    {
      name: 'Trabajadores Activos',
      value: estadisticas.trabajadoresActivos,
      icon: CheckCircle,
      color: 'brand-yellow-400',
      bgColor: 'brand-yellow-100',
    },
  ];

  const tareasStats = [
    {
      name: 'Total Tareas',
      value: estadisticas.totalTareas,
      icon: BarChart3,
      color: 'black',
      bgColor: 'gray-200',
      iconColor: 'brand-yellow-400',
    },
    {
      name: 'Pendientes',
      value: estadisticas.tareasPendientes,
      icon: Clock,
      color: 'brand-yellow-400',
      bgColor: 'brand-yellow-100',
      iconColor: 'black',
    },
    {
      name: 'Asignadas',
      value: estadisticas.tareasAsignadas,
      icon: PlayCircle,
      color: 'brand-cyan-500',
      bgColor: 'brand-cyan-100',
      iconColor: 'black',
    },
    {
      name: 'Aceptadas',
      value: estadisticas.tareasAceptadas,
      icon: TrendingUp,
      color: 'purple-500',
      bgColor: 'purple-100',
      iconColor: 'black',
    },
    {
      name: 'Finalizadas',
      value: estadisticas.tareasFinalizadas,
      icon: CheckCircle,
      color: 'green-400',
      bgColor: 'green-100',
      iconColor: 'black',
    },
    {
      name: 'Canceladas',
      value: estadisticas.tareasCanceladas,
      icon: XCircle,
      color: 'red-400',
      bgColor: 'red-100',
      iconColor: 'black',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-4 border-black shadow-brutal p-6">
        <h1 className="text-4xl font-black text-black">Estadísticas</h1>
        <div className="w-32 h-1 bg-brand-cyan-500 mt-2"></div>
        <p className="mt-3 text-base font-bold text-gray-700 uppercase tracking-wider">
          Métricas y análisis de {estadisticas.nombreEmpresa}
        </p>
      </div>

      {/* Estadísticas de Trabajadores */}
      <div>
        <h2 className="text-2xl font-black text-black mb-4 uppercase">Equipo de Trabajo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trabajadoresStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white border-4 border-black shadow-brutal p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">{stat.name}</p>
                    <p className="text-5xl font-black text-black mt-2">{stat.value}</p>
                  </div>
                  <div className={`bg-${stat.color} p-4 border-2 border-black`}>
                    <Icon className="h-8 w-8 text-black" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estadísticas de Tareas */}
      <div>
        <h2 className="text-2xl font-black text-black mb-4 uppercase">Gestión de Tareas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tareasStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white border-4 border-black shadow-brutal p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">{stat.name}</p>
                    <p className="text-5xl font-black text-black mt-2">{stat.value}</p>
                  </div>
                  <div className={`bg-${stat.color} p-4 border-2 border-black`}>
                    <Icon className={`h-8 w-8 ${stat.iconColor ? `text-${stat.iconColor}` : 'text-black'}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progreso */}
      <div className="bg-white border-4 border-black shadow-brutal p-6">
        <h2 className="text-2xl font-black text-black mb-6 uppercase">Resumen de Progreso</h2>
        <div className="space-y-6">
          {estadisticas.totalTareas > 0 && (
            <div>
              <div className="flex justify-between mb-3">
                <span className="text-base font-bold text-black uppercase tracking-wider">Tareas Completadas</span>
                <span className="text-2xl font-black text-black">
                  {Math.round((estadisticas.tareasFinalizadas / estadisticas.totalTareas) * 100)}%
                </span>
              </div>
              <div className="w-full h-8 bg-gray-200 border-2 border-black">
                <div
                  className="h-full bg-green-400 border-r-2 border-black transition-all"
                  style={{
                    width: `${(estadisticas.tareasFinalizadas / estadisticas.totalTareas) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          )}

          {estadisticas.totalTrabajadores > 0 && (
            <div>
              <div className="flex justify-between mb-3">
                <span className="text-base font-bold text-black uppercase tracking-wider">Trabajadores Activos</span>
                <span className="text-2xl font-black text-black">
                  {Math.round((estadisticas.trabajadoresActivos / estadisticas.totalTrabajadores) * 100)}%
                </span>
              </div>
              <div className="w-full h-8 bg-gray-200 border-2 border-black">
                <div
                  className="h-full bg-brand-cyan-500 border-r-2 border-black transition-all"
                  style={{
                    width: `${(estadisticas.trabajadoresActivos / estadisticas.totalTrabajadores) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyStatistics;
