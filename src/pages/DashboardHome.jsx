import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { empresasService } from '../services/api';
import { Building2, Clock, CheckCircle, XCircle, Users, BarChart3, ArrowRight } from 'lucide-react';

const DashboardHome = () => {
  const { user } = useAuth();
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEstadisticas = async () => {
      if (user?.rol === 'AdminEmpresa' && user?.empresaId) {
        try {
          const data = await empresasService.getEstadisticas(user.empresaId);
          setEstadisticas(data);
        } catch (err) {
          console.error('Error al cargar estadísticas:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadEstadisticas();
  }, [user]);

  // Vista para AdminGeneral
  if (user?.rol === 'AdminGeneral') {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Bienvenido, {user?.nombreCompleto}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Panel de Super Administrador - TaskControl
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Building2 className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-900">Gestión de Empresas</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>Desde el menú lateral puedes acceder a la gestión de empresas donde podrás:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Aprobar o rechazar solicitudes de registro</li>
                  <li>Ver estadísticas detalladas de cada empresa</li>
                  <li>Eliminar empresas cuando sea necesario</li>
                </ul>
              </div>
              <div className="mt-4">
                <Link
                  to="/dashboard/companies"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Ir a Gestión de Empresas
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista para AdminEmpresa
  if (user?.rol === 'AdminEmpresa') {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Bienvenido, {user?.nombreCompleto}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Panel de Administración - {estadisticas?.nombreEmpresa || 'Tu Empresa'}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : estadisticas ? (
          <>
            {/* Estadísticas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Empleados</p>
                    <p className="text-3xl font-semibold text-gray-900 mt-2">
                      {estadisticas.totalTrabajadores}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Empleados Activos</p>
                    <p className="text-3xl font-semibold text-gray-900 mt-2">
                      {estadisticas.trabajadoresActivos}
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tareas</p>
                    <p className="text-3xl font-semibold text-gray-900 mt-2">
                      {estadisticas.totalTareas}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Estado de Tareas */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Estado de Tareas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-yellow-50">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-gray-900">{estadisticas.tareasPendientes}</p>
                  <p className="text-xs text-gray-600">Pendientes</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-blue-50">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-gray-900">{estadisticas.tareasAsignadas}</p>
                  <p className="text-xs text-gray-600">Asignadas</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-green-50">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-gray-900">{estadisticas.tareasFinalizadas}</p>
                  <p className="text-xs text-gray-600">Finalizadas</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-red-50">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-gray-900">{estadisticas.tareasCanceladas}</p>
                  <p className="text-xs text-gray-600">Canceladas</p>
                </div>
              </div>
            </div>

            {/* Accesos Rápidos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/dashboard/employees"
                className="block bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <Users className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">Empleados</h3>
                <p className="mt-1 text-sm text-gray-600">Gestiona tu equipo de trabajo</p>
              </Link>

              <Link
                to="/dashboard/statistics"
                className="block bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <BarChart3 className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">Estadísticas</h3>
                <p className="mt-1 text-sm text-gray-600">Métricas y análisis detallados</p>
              </Link>

              <Link
                to="/dashboard/my-company"
                className="block bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <Building2 className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">Mi Empresa</h3>
                <p className="mt-1 text-sm text-gray-600">Información y configuración</p>
              </Link>
            </div>
          </>
        ) : null}
      </div>
    );
  }

  return null;
};

export default DashboardHome;
