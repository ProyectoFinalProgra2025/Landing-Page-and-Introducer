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
      Pending: { color: 'bg-brand-yellow-400', icon: Clock, text: 'Pendiente' },
      Approved: { color: 'bg-green-400', icon: CheckCircle, text: 'Aprobada' },
      Rejected: { color: 'bg-red-400', icon: XCircle, text: 'Rechazada' },
    };

    const estadoInfo = estados[estado] || { color: 'bg-gray-400', icon: AlertCircle, text: estado };
    const Icon = estadoInfo.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 border-2 border-black text-xs font-black uppercase tracking-wider ${estadoInfo.color} text-black`}>
        <Icon className="h-4 w-4" />
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
      <div className="bg-white border-4 border-black shadow-brutal p-6">
        <h1 className="text-4xl font-black text-black">Gestión de Empresas</h1>
        <div className="w-32 h-1 bg-brand-cyan-500 mt-2"></div>
        <p className="mt-3 text-base font-bold text-gray-700 uppercase tracking-wider">
          Administra las solicitudes y empresas registradas
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white border-4 border-black shadow-brutal p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Búsqueda */}
          <div>
            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
              Buscar
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-black font-semibold focus:ring-0 focus:border-brand-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Filtro por estado */}
          <div>
            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
              Filtrar por Estado
            </label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
              <select
                value={selectedEstado}
                onChange={(e) => setSelectedEstado(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-black font-semibold focus:ring-0 focus:border-brand-cyan-500 focus:outline-none appearance-none"
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
        <div className="bg-red-100 border-4 border-black shadow-brutal px-6 py-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-red-500 border-2 border-black flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-black">{error}</span>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="bg-white border-4 border-black shadow-brutal p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-black border-t-brand-cyan-500"></div>
          <p className="mt-6 text-xl font-black text-black uppercase tracking-wider">Cargando empresas...</p>
        </div>
      ) : (
        <>
          {/* Lista de empresas */}
          <div className="bg-white border-4 border-black shadow-brutal overflow-hidden">
            {filteredEmpresas.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 border-4 border-black mx-auto flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-black" />
                </div>
                <p className="mt-6 text-xl font-black text-black uppercase">No se encontraron empresas</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y-4 divide-black">
                  <thead className="bg-brand-cyan-500">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-black text-black uppercase tracking-wider border-r-2 border-black">
                        Empresa
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-black uppercase tracking-wider border-r-2 border-black">
                        Fecha Registro
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-black uppercase tracking-wider border-r-2 border-black">
                        Estado
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-black uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y-2 divide-gray-300">
                    {filteredEmpresas.map((empresa) => (
                      <tr key={empresa.id} className="hover:bg-brand-cyan-50 transition-colors">
                        <td className="px-6 py-4 border-r-2 border-gray-300">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12 bg-brand-cyan-500 border-2 border-black flex items-center justify-center">
                              <Building2 className="h-6 w-6 text-black" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-bold text-black">{empresa.nombre}</div>
                              <div className="text-xs font-semibold text-gray-600">ID: {empresa.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-r-2 border-gray-300">
                          <div className="text-sm font-bold text-black">
                            {new Date(empresa.createdAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="text-xs font-semibold text-gray-600">
                            {new Date(empresa.createdAt).toLocaleTimeString('es-ES', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-r-2 border-gray-300">
                          {getEstadoBadge(empresa.estado)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            {empresa.estado === 'Pending' && (
                              <>
                                <button
                                  onClick={() => handleAprobar(empresa.id)}
                                  className="inline-flex items-center px-3 py-2 border-2 border-black text-xs font-bold bg-green-400 text-black hover:bg-green-500 transition-colors"
                                  title="Aprobar"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Aprobar
                                </button>
                                <button
                                  onClick={() => handleRechazar(empresa.id)}
                                  className="inline-flex items-center px-3 py-2 border-2 border-black text-xs font-bold bg-red-400 text-black hover:bg-red-500 transition-colors"
                                  title="Rechazar"
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Rechazar
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleVerEstadisticas(empresa.id)}
                              className="p-2 bg-brand-cyan-500 border-2 border-black hover:bg-brand-cyan-600 transition-colors"
                              title="Ver estadísticas"
                            >
                              <BarChart3 className="h-5 w-5 text-black" />
                            </button>
                            <button
                              onClick={() => handleEliminar(empresa.id)}
                              className="p-2 bg-red-400 border-2 border-black hover:bg-red-500 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="h-5 w-5 text-black" />
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black shadow-brutal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-black text-black uppercase">Estadísticas de la Empresa</h2>
                  <div className="w-24 h-1 bg-brand-cyan-500 mt-2"></div>
                </div>
                <button
                  onClick={() => setShowStatsModal(false)}
                  className="p-2 bg-red-400 border-2 border-black hover:bg-red-500 transition-colors"
                >
                  <XCircle className="h-6 w-6 text-black" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(estadisticas).map(([key, value]) => (
                  <div key={key} className="bg-brand-cyan-100 border-2 border-black p-4">
                    <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-3xl font-black text-black mt-2">
                      {typeof value === 'object' ? JSON.stringify(value) : value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowStatsModal(false)}
                  className="px-6 py-3 bg-black text-white font-bold border-2 border-black shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
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
