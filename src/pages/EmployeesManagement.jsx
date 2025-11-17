import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { usuariosService, empresasExtendedService } from '../services/api';
import { 
  Users, 
  UserPlus, 
  Edit2, 
  Trash2, 
  Search,
  Mail,
  Phone,
  UserCheck,
  UserX,
  AlertCircle,
  X,
  Save,
  Briefcase,
  Star
} from 'lucide-react';

const EmployeesManagement = () => {
  const { user } = useAuth();
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    password: '',
    telefono: '',
    departamento: 0, // 0 = Ninguno
    nivelHabilidad: 1,
  });

  const loadEmpleados = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Obtener IDs de trabajadores de la empresa
      const trabajadoresData = await empresasExtendedService.getTrabajadoresIds(user.empresaId);
      
      // Obtener detalles de cada trabajador
      const empleadosPromises = trabajadoresData.trabajadoresIds.map(id => 
        usuariosService.getUsuario(id)
      );
      
      const empleadosData = await Promise.all(empleadosPromises);
      setEmpleados(empleadosData);
    } catch (err) {
      setError('Error al cargar los empleados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.empresaId) {
      loadEmpleados();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleEdit = (empleado) => {
    setSelectedEmpleado(empleado);
    setFormData({
      nombreCompleto: empleado.nombreCompleto || '',
      telefono: empleado.telefono || '',
      departamento: empleado.departamento || 0,
      nivelHabilidad: empleado.nivelHabilidad || 1,
    });
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este empleado? Esta acción lo desactivará.')) return;
    
    try {
      await usuariosService.deleteUsuario(id);
      await loadEmpleados();
    } catch (err) {
      alert('Error al eliminar el empleado');
      console.error(err);
    }
  };

  const handleCreateClick = () => {
    setFormData({
      nombreCompleto: '',
      email: '',
      password: '',
      telefono: '',
      departamento: 0, // 0 = Ninguno
      nivelHabilidad: 1
    });
    setShowCreateModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'departamento' || name === 'nivelHabilidad' ? parseInt(value) : value
    }));
  };

  const handleSaveCreate = async () => {
    try {
      setSaving(true);
      
      const createData = {
        email: formData.email,
        password: formData.password,
        nombreCompleto: formData.nombreCompleto,
        telefono: formData.telefono || null,
        departamento: formData.departamento > 0 ? formData.departamento : null,
        nivelHabilidad: formData.nivelHabilidad || null
      };

      await usuariosService.createUsuario(createData);
      setShowCreateModal(false);
      await loadEmpleados();
    } catch (err) {
      alert('Error al crear el empleado: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEdit = async () => {
    try {
      setSaving(true);
      
      const updateData = {
        nombreCompleto: formData.nombreCompleto,
        telefono: formData.telefono || null,
        departamento: formData.departamento > 0 ? formData.departamento : null,
        nivelHabilidad: formData.nivelHabilidad || null
      };

      await usuariosService.updateUsuario(selectedEmpleado.id, updateData);
      setShowEditModal(false);
      await loadEmpleados();
    } catch (err) {
      alert('Error al actualizar el empleado: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const filteredEmpleados = empleados.filter(empleado =>
    empleado.nombreCompleto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empleado.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDepartamentoNombre = (dept) => {
    const departamentos = {
      0: 'Ninguno',
      1: 'Finanzas',
      2: 'Mantenimiento',
      3: 'Producción',
      4: 'Marketing',
      5: 'Logística',
      6: 'Recursos Humanos'
    };
    return departamentos[dept] || 'No asignado';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Gestión de Empleados</h1>
          <p className="mt-1 text-sm text-gray-600">Administra los empleados de tu empresa</p>
        </div>
        <button 
          onClick={handleCreateClick}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Agregar Empleado
        </button>
      </div>

      {/* Search */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="bg-white shadow rounded-lg p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando empleados...</p>
        </div>
      ) : (
        <>
          {/* Empleados Grid */}
          {filteredEmpleados.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-12 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No hay empleados</h3>
              <p className="mt-2 text-sm text-gray-500">
                Comienza agregando tu primer empleado
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmpleados.map((empleado) => (
                <div key={empleado.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      {empleado.isActive ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <UserCheck className="h-3 w-3 mr-1" />
                          Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <UserX className="h-3 w-3 mr-1" />
                          Inactivo
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {empleado.nombreCompleto}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-4 w-4 mr-2" />
                        {empleado.email}
                      </div>
                      {empleado.telefono && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="h-4 w-4 mr-2" />
                          {empleado.telefono}
                        </div>
                      )}
                      {empleado.departamento && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Briefcase className="h-4 w-4 mr-2" />
                          {getDepartamentoNombre(empleado.departamento)}
                        </div>
                      )}
                      {empleado.nivelHabilidad && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="h-4 w-4 mr-2 text-yellow-500" />
                          Nivel {empleado.nivelHabilidad}/5
                        </div>
                      )}
                    </div>

                    {/* Capacidades */}
                    {empleado.capacidades && empleado.capacidades.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-700 mb-2">Capacidades:</p>
                        <div className="flex flex-wrap gap-1">
                          {empleado.capacidades.slice(0, 3).map((cap, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                              {cap.nombreCapacidad} - Nivel {cap.nivel}
                            </span>
                          ))}
                          {empleado.capacidades.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                              +{empleado.capacidades.length - 3} más
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Acciones */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(empleado)}
                        className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(empleado.id)}
                        className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal de Creación */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Agregar Nuevo Empleado</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="nombreCompleto"
                      value={formData.nombreCompleto}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contraseña * (mínimo 8 caracteres)
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      minLength={8}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Departamento
                    </label>
                    <select
                      name="departamento"
                      value={formData.departamento}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="0">Ninguno</option>
                      <option value="1">Finanzas</option>
                      <option value="2">Mantenimiento</option>
                      <option value="3">Producción</option>
                      <option value="4">Marketing</option>
                      <option value="5">Logística</option>
                      <option value="6">Recursos Humanos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nivel de Habilidad (1-5)
                    </label>
                    <select
                      name="nivelHabilidad"
                      value={formData.nivelHabilidad}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="1">1 - Principiante</option>
                      <option value="2">2 - Básico</option>
                      <option value="3">3 - Intermedio</option>
                      <option value="4">4 - Avanzado</option>
                      <option value="5">5 - Experto</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  disabled={saving}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveCreate}
                  disabled={saving}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Guardando...' : 'Crear Empleado'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edición */}
      {showEditModal && selectedEmpleado && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Editar Empleado</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="nombreCompleto"
                      value={formData.nombreCompleto}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={selectedEmpleado.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      readOnly
                    />
                    <p className="mt-1 text-xs text-gray-500">El email no se puede modificar</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Departamento
                    </label>
                    <select
                      name="departamento"
                      value={formData.departamento}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="0">Ninguno</option>
                      <option value="1">Finanzas</option>
                      <option value="2">Mantenimiento</option>
                      <option value="3">Producción</option>
                      <option value="4">Marketing</option>
                      <option value="5">Logística</option>
                      <option value="6">Recursos Humanos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nivel de Habilidad (1-5)
                    </label>
                    <select
                      name="nivelHabilidad"
                      value={formData.nivelHabilidad}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="1">1 - Principiante</option>
                      <option value="2">2 - Básico</option>
                      <option value="3">3 - Intermedio</option>
                      <option value="4">4 - Avanzado</option>
                      <option value="5">5 - Experto</option>
                    </select>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Estado:</span>
                      <span className={`ml-2 font-medium ${selectedEmpleado.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedEmpleado.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Rol:</span>
                      <span className="ml-2 font-medium">{selectedEmpleado.rol}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  disabled={saving}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={saving}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesManagement;
