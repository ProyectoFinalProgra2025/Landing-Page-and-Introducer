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
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
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
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      name: 'Trabajadores Activos',
      value: estadisticas.trabajadoresActivos,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
  ];

  const tareasStats = [
    {
      name: 'Total Tareas',
      value: estadisticas.totalTareas,
      icon: BarChart3,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      name: 'Pendientes',
      value: estadisticas.tareasPendientes,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      name: 'Asignadas',
      value: estadisticas.tareasAsignadas,
      icon: PlayCircle,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      name: 'Aceptadas',
      value: estadisticas.tareasAceptadas,
      icon: TrendingUp,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
    },
    {
      name: 'Finalizadas',
      value: estadisticas.tareasFinalizadas,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      name: 'Canceladas',
      value: estadisticas.tareasCanceladas,
      icon: XCircle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Estadísticas</h1>
        <p className="mt-1 text-sm text-gray-600">
          Métricas y análisis de {estadisticas.nombreEmpresa}
        </p>
      </div>

      {/* Estadísticas de Trabajadores */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Equipo de Trabajo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trabajadoresStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-3xl font-semibold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estadísticas de Tareas */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Gestión de Tareas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tareasStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-3xl font-semibold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progreso */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Resumen de Progreso</h2>
        <div className="space-y-4">
          {estadisticas.totalTareas > 0 && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Tareas Completadas</span>
                <span className="font-medium text-gray-900">
                  {Math.round((estadisticas.tareasFinalizadas / estadisticas.totalTareas) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${(estadisticas.tareasFinalizadas / estadisticas.totalTareas) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          )}

          {estadisticas.totalTrabajadores > 0 && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Trabajadores Activos</span>
                <span className="font-medium text-gray-900">
                  {Math.round((estadisticas.trabajadoresActivos / estadisticas.totalTrabajadores) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
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
