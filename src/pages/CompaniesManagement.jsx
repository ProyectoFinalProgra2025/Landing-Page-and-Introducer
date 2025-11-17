import { useEffect, useState } from 'react';
import { empresasService } from '../services/api';
import { 
  Building2, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  BarChart3,
  Clock,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';

const CompaniesManagement = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [estadisticas, setEstadisticas] = useState(null);
  const [showStatsModal, setShowStatsModal] = useState(false);

  const loadEmpresas = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await empresasService.getEmpresas(selectedEstado || null);
      console.log('Empresas cargadas:', data);
      setEmpresas(data);
    } catch (err) {
      setError('Error al cargar las empresas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmpresas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEstado]);

  const handleAprobar = async (id) => {
    if (!confirm('¿Estás seguro de aprobar esta empresa?')) return;
    
    try {
      await empresasService.aprobarEmpresa(id);
      await loadEmpresas();
    } catch (err) {
      alert('Error al aprobar la empresa');
      console.error(err);
    }
  };

  const handleRechazar = async (id) => {
    if (!confirm('¿Estás seguro de rechazar esta empresa?')) return;
    
    try {
      await empresasService.rechazarEmpresa(id);
      await loadEmpresas();
    } catch (err) {
      alert('Error al rechazar la empresa');
      console.error(err);
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta empresa? Esta acción no se puede deshacer.')) return;
    
    try {
      await empresasService.eliminarEmpresa(id);
      await loadEmpresas();
    } catch (err) {
      alert('Error al eliminar la empresa');
      console.error(err);
    }
  };

  const handleVerEstadisticas = async (id) => {
    try {
      const stats = await empresasService.getEstadisticas(id);
      setEstadisticas(stats);
      setShowStatsModal(true);
    } catch (err) {
      alert('Error al cargar las estadísticas');
      console.error(err);
    }
  };

  const getEstadoBadge = (estado) => {
    const estados = {
      Pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'Pendiente' },
      Approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Aprobada' },
      Rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, text: 'Rechazada' },
    };

    const estadoInfo = estados[estado] || { color: 'bg-gray-100 text-gray-800', icon: AlertCircle, text: estado };
    const Icon = estadoInfo.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium ${estadoInfo.color}`}>
        <Icon className="h-3 w-3" />
        {estadoInfo.text}
      </span>
    );
  };

  const filteredEmpresas = empresas.filter(empresa =>
    empresa.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Empresas</h1>
        <p className="mt-2 text-gray-600">Administra las solicitudes y empresas registradas</p>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Búsqueda */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filtro por estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filtrar por Estado
            </label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedEstado}
                onChange={(e) => setSelectedEstado(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Aprobada">Aprobada</option>
                <option value="Rechazada">Rechazada</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando empresas...</p>
        </div>
      ) : (
        <>
          {/* Lista de empresas */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {filteredEmpresas.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-gray-600">No se encontraron empresas</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Empresa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha Registro
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEmpresas.map((empresa) => (
                      <tr key={empresa.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{empresa.nombre}</div>
                              <div className="text-sm text-gray-500">ID: {empresa.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(empresa.createdAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(empresa.createdAt).toLocaleTimeString('es-ES', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getEstadoBadge(empresa.estado)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            {empresa.estado === 'Pending' && (
                              <>
                                <button
                                  onClick={() => handleAprobar(empresa.id)}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                  title="Aprobar"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Aprobar
                                </button>
                                <button
                                  onClick={() => handleRechazar(empresa.id)}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  title="Rechazar"
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Rechazar
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleVerEstadisticas(empresa.id)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Ver estadísticas"
                            >
                              <BarChart3 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleEliminar(empresa.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Eliminar"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Modal de Estadísticas */}
      {showStatsModal && estadisticas && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Estadísticas de la Empresa</h2>
                <button
                  onClick={() => setShowStatsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(estadisticas).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">
                      {typeof value === 'object' ? JSON.stringify(value) : value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowStatsModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesManagement;
