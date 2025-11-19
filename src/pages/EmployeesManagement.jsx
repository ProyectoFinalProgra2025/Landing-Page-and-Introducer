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
      <div className="bg-white border-4 border-black shadow-brutal p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-black">Gestión de Empleados</h1>
          <div className="w-32 h-1 bg-brand-cyan-500 mt-2"></div>
          <p className="mt-3 text-base font-bold text-gray-700 uppercase tracking-wider">
            Administra los empleados de tu empresa
          </p>
        </div>
        <button
          onClick={handleCreateClick}
          className="inline-flex items-center px-6 py-3 bg-brand-yellow-400 text-black font-bold border-2 border-black shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Agregar Empleado
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border-4 border-black shadow-brutal p-4">
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

      {/* Error */}
      {error && (
        <div className="bg-red-100 border-4 border-black shadow-brutal p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-500 border-2 border-black flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <p className="text-lg font-bold text-black">{error}</p>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="bg-white border-4 border-black shadow-brutal p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-black border-t-brand-cyan-500"></div>
          <p className="mt-6 text-xl font-black text-black uppercase tracking-wider">Cargando empleados...</p>
        </div>
      ) : (
        <>
          {/* Empleados Grid */}
          {filteredEmpleados.length === 0 ? (
            <div className="bg-white border-4 border-black shadow-brutal p-12 text-center">
              <div className="w-24 h-24 bg-brand-cyan-500 border-4 border-black mx-auto flex items-center justify-center">
                <Users className="h-12 w-12 text-black" />
              </div>
              <h3 className="mt-6 text-2xl font-black text-black uppercase">No hay empleados</h3>
              <div className="w-24 h-1 bg-brand-yellow-400 mx-auto my-3"></div>
              <p className="text-base font-semibold text-gray-700">
                Comienza agregando tu primer empleado
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmpleados.map((empleado) => (
                <div key={empleado.id} className="bg-white border-4 border-black shadow-brutal overflow-hidden hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center justify-center w-14 h-14 bg-brand-cyan-500 border-2 border-black">
                        <Users className="h-7 w-7 text-black" />
                      </div>
                      {empleado.isActive ? (
                        <span className="inline-flex items-center px-3 py-1 border-2 border-black text-xs font-black bg-green-400 text-black uppercase tracking-wider">
                          <UserCheck className="h-4 w-4 mr-1" />
                          Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 border-2 border-black text-xs font-black bg-gray-300 text-black uppercase tracking-wider">
                          <UserX className="h-4 w-4 mr-1" />
                          Inactivo
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-black text-black mb-3">
                      {empleado.nombreCompleto}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm font-semibold text-gray-700">
                        <Mail className="h-4 w-4 mr-2 text-black" />
                        {empleado.email}
                      </div>
                      {empleado.telefono && (
                        <div className="flex items-center text-sm font-semibold text-gray-700">
                          <Phone className="h-4 w-4 mr-2 text-black" />
                          {empleado.telefono}
                        </div>
                      )}
                      {empleado.departamento && (
                        <div className="flex items-center text-sm font-semibold text-gray-700">
                          <Briefcase className="h-4 w-4 mr-2 text-black" />
                          {getDepartamentoNombre(empleado.departamento)}
                        </div>
                      )}
                      {empleado.nivelHabilidad && (
                        <div className="flex items-center text-sm font-semibold text-gray-700">
                          <Star className="h-4 w-4 mr-2 text-brand-yellow-500" />
                          Nivel {empleado.nivelHabilidad}/5
                        </div>
                      )}
                    </div>

                    {/* Capacidades */}
                    {empleado.capacidades && empleado.capacidades.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-bold text-black mb-2 uppercase tracking-wider">Capacidades:</p>
                        <div className="flex flex-wrap gap-1">
                          {empleado.capacidades.slice(0, 3).map((cap, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-1 border border-black text-xs font-bold bg-brand-cyan-100 text-black">
                              {cap.nombreCapacidad} - Nivel {cap.nivel}
                            </span>
                          ))}
                          {empleado.capacidades.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 border border-black text-xs font-bold bg-gray-200 text-black">
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
                        className="flex-1 inline-flex justify-center items-center px-3 py-2 border-2 border-black text-sm font-bold text-black bg-white hover:bg-brand-cyan-100 transition-colors"
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(empleado.id)}
                        className="inline-flex items-center px-3 py-2 border-2 border-black text-sm font-bold text-black bg-red-400 hover:bg-red-500 transition-colors"
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black shadow-brutal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-black text-black uppercase">Agregar Nuevo Empleado</h2>
                  <div className="w-24 h-1 bg-brand-cyan-500 mt-2"></div>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 bg-red-400 border-2 border-black hover:bg-red-500 transition-colors"
                >
                  <X className="h-6 w-6 text-black" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="nombreCompleto"
                      value={formData.nombreCompleto}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border-2 border-black font-semibold focus:ring-0 focus:border-brand-cyan-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border-2 border-black font-semibold focus:ring-0 focus:border-brand-cyan-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                      Contraseña * (mínimo 8 caracteres)
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border-2 border-black font-semibold focus:ring-0 focus:border-brand-cyan-500 focus:outline-none"
                      required
                      minLength={8}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border-2 border-black font-semibold focus:ring-0 focus:border-brand-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                      Departamento
                    </label>
                    <select
                      name="departamento"
                      value={formData.departamento}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border-2 border-black font-semibold focus:ring-0 focus:border-brand-cyan-500 focus:outline-none"
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
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                      Nivel de Habilidad (1-5)
                    </label>
                    <select
                      name="nivelHabilidad"
                      value={formData.nivelHabilidad}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border-2 border-black font-semibold focus:ring-0 focus:border-brand-cyan-500 focus:outline-none"
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
                  className="px-6 py-3 border-2 border-black text-black font-bold bg-white hover:bg-gray-100 disabled:opacity-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveCreate}
                  disabled={saving}
                  className="inline-flex items-center px-6 py-3 bg-brand-yellow-400 text-black font-bold border-2 border-black shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                >
                  <Save className="h-5 w-5 mr-2" />
                  {saving ? 'Guardando...' : 'Crear Empleado'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edición */}
      {showEditModal && selectedEmpleado && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black shadow-brutal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-black text-black uppercase">Editar Empleado</h2>
                  <div className="w-24 h-1 bg-brand-cyan-500 mt-2"></div>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 bg-red-400 border-2 border-black hover:bg-red-500 transition-colors"
                >
                  <X className="h-6 w-6 text-black" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="nombreCompleto"
                      value={formData.nombreCompleto}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border-2 border-black font-semibold focus:ring-0 focus:border-brand-cyan-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      value={selectedEmpleado.email}
                      className="w-full px-3 py-3 border-2 border-black font-semibold bg-gray-100"
                      readOnly
                    />
                    <p className="mt-2 text-xs font-semibold text-gray-600">El email no se puede modificar</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border-2 border-black font-semibold focus:ring-0 focus:border-brand-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                      Departamento
                    </label>
                    <select
                      name="departamento"
                      value={formData.departamento}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border-2 border-black font-semibold focus:ring-0 focus:border-brand-cyan-500 focus:outline-none"
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
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                      Nivel de Habilidad (1-5)
                    </label>
                    <select
                      name="nivelHabilidad"
                      value={formData.nivelHabilidad}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border-2 border-black font-semibold focus:ring-0 focus:border-brand-cyan-500 focus:outline-none"
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
                <div className="pt-4 border-t-2 border-black">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-brand-cyan-100 border-2 border-black">
                      <span className="font-bold text-black uppercase tracking-wider block mb-1">Estado:</span>
                      <span className={`font-black text-lg ${selectedEmpleado.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedEmpleado.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    <div className="p-3 bg-brand-yellow-100 border-2 border-black">
                      <span className="font-bold text-black uppercase tracking-wider block mb-1">Rol:</span>
                      <span className="font-black text-lg text-black">{selectedEmpleado.rol}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  disabled={saving}
                  className="px-6 py-3 border-2 border-black text-black font-bold bg-white hover:bg-gray-100 disabled:opacity-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={saving}
                  className="inline-flex items-center px-6 py-3 bg-brand-cyan-500 text-black font-bold border-2 border-black shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                >
                  <Save className="h-5 w-5 mr-2" />
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
