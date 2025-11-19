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
        <div className="bg-white border-4 border-black shadow-brutal p-6">
          <h1 className="text-4xl font-black text-black">
            Bienvenido, {user?.nombreCompleto}
          </h1>
          <div className="w-32 h-1 bg-brand-yellow-400 mt-2"></div>
          <p className="mt-3 text-lg font-bold text-gray-700 uppercase tracking-wider">
            Panel de Super Administrador - TaskControl
          </p>
        </div>

        <div className="bg-brand-yellow-100 border-4 border-black shadow-brutal p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-brand-yellow-400 border-2 border-black flex items-center justify-center">
                <Building2 className="h-8 w-8 text-black" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-black text-black uppercase">Gestión de Empresas</h3>
              <div className="mt-3 text-base font-semibold text-gray-800">
                <p>Desde el menú lateral puedes acceder a la gestión de empresas donde podrás:</p>
                <ul className="list-disc list-inside mt-3 space-y-2">
                  <li>Aprobar o rechazar solicitudes de registro</li>
                  <li>Ver estadísticas detalladas de cada empresa</li>
                  <li>Eliminar empresas cuando sea necesario</li>
                </ul>
              </div>
              <div className="mt-4">
                <Link
                  to="/dashboard/companies"
                  className="inline-flex items-center px-4 py-2 bg-black text-white font-bold border-2 border-black shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  Ir a Gestión de Empresas
                  <ArrowRight className="ml-2 h-5 w-5" />
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
        <div className="bg-white border-4 border-black shadow-brutal p-6">
          <h1 className="text-4xl font-black text-black">
            Bienvenido, {user?.nombreCompleto}
          </h1>
          <div className="w-32 h-1 bg-brand-cyan-500 mt-2"></div>
          <p className="mt-3 text-lg font-bold text-gray-700 uppercase tracking-wider">
            Panel de Administración - {estadisticas?.nombreEmpresa || 'Tu Empresa'}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-brand-cyan-500"></div>
          </div>
        ) : estadisticas ? (
          <>
            {/* Estadísticas Rápidas */}
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

            {/* Estado de Tareas */}
            <div className="bg-white border-4 border-black shadow-brutal p-6">
              <h2 className="text-2xl font-black text-black mb-6 uppercase">Estado de Tareas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-brand-yellow-100 border-2 border-black">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto bg-brand-yellow-400 border-2 border-black">
                    <Clock className="h-8 w-8 text-black" />
                  </div>
                  <p className="mt-3 text-3xl font-black text-black">{estadisticas.tareasPendientes}</p>
                  <p className="text-sm font-bold text-gray-700 uppercase mt-1">Pendientes</p>
                </div>
                <div className="text-center p-4 bg-brand-cyan-100 border-2 border-black">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto bg-brand-cyan-500 border-2 border-black">
                    <BarChart3 className="h-8 w-8 text-black" />
                  </div>
                  <p className="mt-3 text-3xl font-black text-black">{estadisticas.tareasAsignadas}</p>
                  <p className="text-sm font-bold text-gray-700 uppercase mt-1">Asignadas</p>
                </div>
                <div className="text-center p-4 bg-green-100 border-2 border-black">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-400 border-2 border-black">
                    <CheckCircle className="h-8 w-8 text-black" />
                  </div>
                  <p className="mt-3 text-3xl font-black text-black">{estadisticas.tareasFinalizadas}</p>
                  <p className="text-sm font-bold text-gray-700 uppercase mt-1">Finalizadas</p>
                </div>
                <div className="text-center p-4 bg-red-100 border-2 border-black">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-400 border-2 border-black">
                    <XCircle className="h-8 w-8 text-black" />
                  </div>
                  <p className="mt-3 text-3xl font-black text-black">{estadisticas.tareasCanceladas}</p>
                  <p className="text-sm font-bold text-gray-700 uppercase mt-1">Canceladas</p>
                </div>
              </div>
            </div>

            {/* Accesos Rápidos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/dashboard/employees"
                className="group block bg-white border-4 border-black shadow-brutal p-6 hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all"
              >
                <div className="w-12 h-12 bg-brand-cyan-500 border-2 border-black flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-black text-black">Empleados</h3>
                <div className="w-16 h-1 bg-brand-cyan-500 my-2"></div>
                <p className="text-sm font-semibold text-gray-700">Gestiona tu equipo de trabajo</p>
              </Link>

              <Link
                to="/dashboard/statistics"
                className="group block bg-white border-4 border-black shadow-brutal p-6 hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all"
              >
                <div className="w-12 h-12 bg-brand-yellow-400 border-2 border-black flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-black text-black">Estadísticas</h3>
                <div className="w-16 h-1 bg-brand-yellow-400 my-2"></div>
                <p className="text-sm font-semibold text-gray-700">Métricas y análisis detallados</p>
              </Link>

              <Link
                to="/dashboard/my-company"
                className="group block bg-white border-4 border-black shadow-brutal p-6 hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all"
              >
                <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-brand-yellow-400" />
                </div>
                <h3 className="text-xl font-black text-black">Mi Empresa</h3>
                <div className="w-16 h-1 bg-black my-2"></div>
                <p className="text-sm font-semibold text-gray-700">Información y configuración</p>
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
