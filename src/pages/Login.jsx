import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogIn, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
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

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Error al iniciar sesión');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan-500 transform rotate-12"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-yellow-400"></div>
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-black transform -translate-y-1/2"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-black border-4 border-black shadow-brutal flex items-center justify-center">
              <LogIn className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-black text-black mb-2">
            Iniciar Sesión
          </h1>
          <div className="w-24 h-1 bg-brand-cyan-500 mx-auto mb-4"></div>
          <p className="text-lg font-bold text-gray-700 uppercase tracking-wide">
            Panel de Administración
          </p>
        </div>

        {/* Form */}
        <form className="bg-white border-4 border-black shadow-brutal p-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border-4 border-red-600 p-4 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm font-bold text-red-900">{error}</span>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-600" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 border-3 border-black font-medium focus:outline-none focus:ring-4 focus:ring-brand-cyan-500 focus:border-black transition-all"
                  placeholder="admin@taskcontrol.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-600" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 border-3 border-black font-medium focus:outline-none focus:ring-4 focus:ring-brand-cyan-500 focus:border-black transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-black text-white font-black text-lg uppercase tracking-wide border-4 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>

          <div className="border-t-2 border-gray-300 pt-6 space-y-4">
            <p className="text-center text-sm font-bold text-gray-700">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-brand-cyan-600 hover:text-brand-cyan-700 underline decoration-2 underline-offset-2">
                Regístrate aquí
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

export default Login;
