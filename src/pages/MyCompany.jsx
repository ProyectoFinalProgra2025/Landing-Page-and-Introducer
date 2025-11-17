import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { empresasService } from '../services/api';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  Users,
  BarChart3,
  AlertCircle
} from 'lucide-react';

const MyCompany = () => {
  const { user } = useAuth();
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await empresasService.getEstadisticas(user.empresaId);
        setEstadisticas(data);
      } catch (err) {
        setError('Error al cargar la información de la empresa');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.empresaId) {
      loadData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando información...</p>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Mi Empresa</h1>
        <p className="mt-1 text-sm text-gray-600">Información y configuración de tu empresa</p>
      </div>

      {/* Información de la Empresa */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {estadisticas?.nombreEmpresa}
              </h2>
              <div className="mt-1 flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">Empresa Aprobada</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Email del Administrador
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Teléfono
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{user?.telefono || 'No especificado'}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Dirección
              </dt>
              <dd className="mt-1 text-sm text-gray-900">No especificada</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                ID de Empresa
              </dt>
              <dd className="mt-1 text-sm text-gray-900">#{user?.empresaId}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Resumen Rápido */}
      {estadisticas && (
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
      )}

      {/* Información Adicional */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Building2 className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-900">Bienvenido a TaskControl</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Tu empresa ha sido aprobada y tienes acceso completo al sistema. Desde aquí puedes:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Gestionar tus empleados</li>
                <li>Ver estadísticas detalladas</li>
                <li>Administrar tareas y asignaciones</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCompany;
