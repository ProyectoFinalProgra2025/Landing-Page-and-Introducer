import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserPlus, Mail, Lock, User, Phone, Building, MapPin, AlertCircle, CheckCircle, ArrowLeft, Sparkles } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { registerAdminEmpresa } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nombreCompleto: '',
    telefono: '',
    nombreEmpresa: '',
    direccionEmpresa: '',
    telefonoEmpresa: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      setLoading(false);
      return;
    }

    // Preparar datos para el backend
    const registerData = {
      email: formData.email,
      password: formData.password,
      nombreCompleto: formData.nombreCompleto,
      telefono: formData.telefono || null,
      nombreEmpresa: formData.nombreEmpresa,
      direccionEmpresa: formData.direccionEmpresa || null,
      telefonoEmpresa: formData.telefonoEmpresa || null,
    };

    const result = await registerAdminEmpresa(registerData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      setError(result.error || 'Error al registrar empresa');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-400"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-yellow-400"></div>
        
        <div className="max-w-md w-full relative z-10">
          <div className="bg-white border-4 border-black shadow-brutal p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-500 border-4 border-black flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-black text-black">¡Registro Exitoso!</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
            <p className="text-base font-bold text-gray-700 leading-relaxed">
              Tu solicitud ha sido enviada. Un administrador revisará tu cuenta y te notificará cuando sea aprobada.
            </p>
            <div className="pt-4">
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide animate-pulse">
                Redirigiendo al login...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan-500 transform rotate-12"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow-400"></div>
      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-black"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-6">
            <div className="px-6 py-3 bg-brand-yellow-400 border-4 border-black inline-flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-black" />
              <span className="font-black text-black uppercase tracking-wider">Prueba Gratis 30 Días</span>
            </div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-black mb-4">
            Registro de Empresa
          </h1>
          <div className="w-32 h-2 bg-brand-cyan-500 mx-auto mb-6"></div>
          <p className="text-lg font-bold text-gray-700 max-w-2xl mx-auto">
            Completa el formulario para comenzar tu prueba gratuita. Tu cuenta será revisada y aprobada en menos de 24 horas.
          </p>
        </div>

        {/* Form */}
        <form className="bg-white border-4 border-black shadow-brutal p-8 space-y-8" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border-4 border-red-600 p-4 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm font-bold text-red-900">{error}</span>
            </div>
          )}

          <div className="space-y-8">
            {/* Datos Personales */}
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-black text-black mb-2 uppercase">Datos Personales</h3>
                <div className="w-20 h-1 bg-brand-cyan-500"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label htmlFor="nombreCompleto" className="block text-xs font-black text-black mb-2 uppercase tracking-wide">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <input
                      id="nombreCompleto"
                      name="nombreCompleto"
                      type="text"
                      required
                      value={formData.nombreCompleto}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3 border-3 border-black font-medium focus:outline-none focus:ring-4 focus:ring-brand-cyan-500 focus:border-black transition-all"
                      placeholder="Juan Pérez García"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-xs font-black text-black mb-2 uppercase tracking-wide">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-600" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3 border-3 border-black font-medium focus:outline-none focus:ring-4 focus:ring-brand-cyan-500 focus:border-black transition-all"
                      placeholder="admin@miempresa.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-xs font-black text-black mb-2 uppercase tracking-wide">
                    Contraseña *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-600" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3 border-3 border-black font-medium focus:outline-none focus:ring-4 focus:ring-brand-cyan-500 focus:border-black transition-all"
                      placeholder="Mínimo 8 caracteres"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-black text-black mb-2 uppercase tracking-wide">
                    Confirmar Contraseña *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-600" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3 border-3 border-black font-medium focus:outline-none focus:ring-4 focus:ring-brand-cyan-500 focus:border-black transition-all"
                      placeholder="Repite tu contraseña"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="telefono" className="block text-xs font-black text-black mb-2 uppercase tracking-wide">
                    Teléfono Personal (Opcional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-600" />
                    </div>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3 border-3 border-black font-medium focus:outline-none focus:ring-4 focus:ring-brand-cyan-500 focus:border-black transition-all"
                      placeholder="+591 12345678"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Datos de la Empresa */}
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-black text-black mb-2 uppercase">Datos de la Empresa</h3>
                <div className="w-20 h-1 bg-brand-yellow-400"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label htmlFor="nombreEmpresa" className="block text-xs font-black text-black mb-2 uppercase tracking-wide">
                    Nombre de la Empresa *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-600" />
                    </div>
                    <input
                      id="nombreEmpresa"
                      name="nombreEmpresa"
                      type="text"
                      required
                      value={formData.nombreEmpresa}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3 border-3 border-black font-medium focus:outline-none focus:ring-4 focus:ring-brand-yellow-400 focus:border-black transition-all"
                      placeholder="TaskControl Solutions S.A."
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="direccionEmpresa" className="block text-xs font-black text-black mb-2 uppercase tracking-wide">
                    Dirección de la Empresa (Opcional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-600" />
                    </div>
                    <input
                      id="direccionEmpresa"
                      name="direccionEmpresa"
                      type="text"
                      value={formData.direccionEmpresa}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3 border-3 border-black font-medium focus:outline-none focus:ring-4 focus:ring-brand-yellow-400 focus:border-black transition-all"
                      placeholder="Av. Principal #123, Santa Cruz"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="telefonoEmpresa" className="block text-xs font-black text-black mb-2 uppercase tracking-wide">
                    Teléfono de la Empresa (Opcional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-600" />
                    </div>
                    <input
                      id="telefonoEmpresa"
                      name="telefonoEmpresa"
                      type="tel"
                      value={formData.telefonoEmpresa}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3 border-3 border-black font-medium focus:outline-none focus:ring-4 focus:ring-brand-yellow-400 focus:border-black transition-all"
                      placeholder="+591 12345678"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-brand-cyan-100 border-4 border-black p-6">
              <p className="text-sm font-bold text-gray-800 leading-relaxed">
                <span className="text-brand-cyan-700 font-black">ℹ️ IMPORTANTE:</span> Tu cuenta será creada como <span className="font-black">Administrador de Empresa</span>. Una vez aprobada por nuestro equipo, podrás acceder al panel completo y comenzar a gestionar tareas y empleados.
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-brand-yellow-400 text-black font-black text-lg uppercase tracking-wide border-4 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                'Registrando...'
              ) : (
                <>
                  <UserPlus className="w-6 h-6" />
                  Registrar Empresa
                </>
              )}
            </button>
          </div>

          <div className="border-t-4 border-black pt-6 space-y-4">
            <p className="text-center text-sm font-bold text-gray-700">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-brand-cyan-600 hover:text-brand-cyan-700 underline decoration-2 underline-offset-2">
                Inicia sesión aquí
              </Link>
            </p>
            <Link 
              to="/" 
              className="flex items-center justify-center gap-2 text-sm font-bold text-gray-700 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
