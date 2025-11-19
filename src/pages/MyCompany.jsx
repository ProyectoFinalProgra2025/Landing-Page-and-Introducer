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
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-black border-t-brand-cyan-500"></div>
          <p className="mt-4 text-xl font-black text-black uppercase tracking-wider">Cargando información...</p>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-4 border-black shadow-brutal p-6">
        <h1 className="text-4xl font-black text-black">Mi Empresa</h1>
        <div className="w-32 h-1 bg-brand-cyan-500 mt-2"></div>
        <p className="mt-3 text-base font-bold text-gray-700 uppercase tracking-wider">
          Información y configuración de tu empresa
        </p>
      </div>

      {/* Información de la Empresa */}
      <div className="bg-white border-4 border-black shadow-brutal overflow-hidden">
        <div className="px-6 py-5 bg-brand-cyan-500 border-b-4 border-black">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white border-2 border-black p-3">
              <Building2 className="h-10 w-10 text-black" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-black text-black">
                {estadisticas?.nombreEmpresa}
              </h2>
              <div className="mt-1 flex items-center">
                <CheckCircle className="h-5 w-5 text-black mr-2" />
                <span className="text-sm font-bold text-black uppercase tracking-wider">Empresa Aprobada</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="p-4 bg-brand-cyan-100 border-2 border-black">
              <dt className="text-sm font-bold text-black flex items-center uppercase tracking-wider">
                <Mail className="h-5 w-5 mr-2" />
                Email del Administrador
              </dt>
              <dd className="mt-2 text-base font-semibold text-gray-800">{user?.email}</dd>
            </div>

            <div className="p-4 bg-brand-yellow-100 border-2 border-black">
              <dt className="text-sm font-bold text-black flex items-center uppercase tracking-wider">
                <Phone className="h-5 w-5 mr-2" />
                Teléfono
              </dt>
              <dd className="mt-2 text-base font-semibold text-gray-800">{user?.telefono || 'No especificado'}</dd>
            </div>

            <div className="p-4 bg-green-100 border-2 border-black">
              <dt className="text-sm font-bold text-black flex items-center uppercase tracking-wider">
                <MapPin className="h-5 w-5 mr-2" />
                Dirección
              </dt>
              <dd className="mt-2 text-base font-semibold text-gray-800">No especificada</dd>
            </div>

            <div className="p-4 bg-purple-100 border-2 border-black">
              <dt className="text-sm font-bold text-black flex items-center uppercase tracking-wider">
                <Calendar className="h-5 w-5 mr-2" />
                ID de Empresa
              </dt>
              <dd className="mt-2 text-base font-semibold text-gray-800">#{user?.empresaId}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Resumen Rápido */}
      {estadisticas && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-4 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">Total Empleados</p>
                <p className="text-5xl font-black text-black mt-2">
                  {estadisticas.totalTrabajadores}
                </p>
              </div>
              <div className="bg-brand-cyan-500 p-4 border-2 border-black">
                <Users className="h-8 w-8 text-black" />
              </div>
            </div>
          </div>

          <div className="bg-white border-4 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">Empleados Activos</p>
                <p className="text-5xl font-black text-black mt-2">
                  {estadisticas.trabajadoresActivos}
                </p>
              </div>
              <div className="bg-brand-yellow-400 p-4 border-2 border-black">
                <CheckCircle className="h-8 w-8 text-black" />
              </div>
            </div>
          </div>

          <div className="bg-white border-4 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">Total Tareas</p>
                <p className="text-5xl font-black text-black mt-2">
                  {estadisticas.totalTareas}
                </p>
              </div>
              <div className="bg-black p-4 border-2 border-black">
                <BarChart3 className="h-8 w-8 text-brand-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Información Adicional */}
      <div className="bg-brand-cyan-100 border-4 border-black shadow-brutal p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-brand-cyan-500 border-2 border-black flex items-center justify-center">
              <Building2 className="h-8 w-8 text-black" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-black text-black uppercase">Bienvenido a TaskControl</h3>
            <div className="w-24 h-1 bg-black my-2"></div>
            <div className="mt-3 text-base font-semibold text-gray-800">
              <p>
                Tu empresa ha sido aprobada y tienes acceso completo al sistema. Desde aquí puedes:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
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
