import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan-500 opacity-20 transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-yellow-400 opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-black opacity-10 transform -translate-y-1/2"></div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-block p-6 bg-brand-yellow-400 border-4 border-black shadow-brutal">
            <AlertTriangle className="h-16 w-16 text-black" />
          </div>
        </div>

        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-8xl lg:text-9xl font-black text-black leading-none">
            404
          </h1>
          <div className="w-24 h-2 bg-brand-cyan-500 mx-auto mt-4"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl lg:text-4xl font-black text-black mb-4">
            Página No Encontrada
          </h2>
          <p className="text-xl text-gray-700 font-medium leading-relaxed max-w-lg mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación.
          </p>
        </div>

        {/* Suggested Actions */}
        <div className="mb-12">
          <div className="bg-gray-50 border-4 border-black p-6 mb-6">
            <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">
              ¿Qué puedes hacer?
            </h3>
            <ul className="text-left space-y-3 text-gray-700 font-medium">
              <li className="flex items-start space-x-2">
                <span className="text-brand-cyan-600 font-bold">•</span>
                <span>Verifica que la URL sea correcta</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-brand-cyan-600 font-bold">•</span>
                <span>Regresa a la página principal</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-brand-cyan-600 font-bold">•</span>
                <span>Contacta con nuestro soporte si el problema persiste</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="group px-8 py-4 bg-black text-white font-bold border-4 border-black shadow-brutal hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all flex items-center justify-center space-x-2"
          >
            <Home className="h-5 w-5" />
            <span>Volver al Inicio</span>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="group px-8 py-4 bg-white text-black font-bold border-4 border-black shadow-brutal hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Página Anterior</span>
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-12 pt-8 border-t-2 border-gray-300">
          <p className="text-sm text-gray-600 font-medium mb-4">
            ¿Necesitas ayuda? Estamos aquí para asistirte
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a 
              href="#contact" 
              className="text-brand-cyan-600 font-bold hover:text-brand-cyan-700 underline decoration-2 underline-offset-2"
            >
              Contactar Soporte
            </a>
            <Link 
              to="/login" 
              className="text-brand-cyan-600 font-bold hover:text-brand-cyan-700 underline decoration-2 underline-offset-2"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}