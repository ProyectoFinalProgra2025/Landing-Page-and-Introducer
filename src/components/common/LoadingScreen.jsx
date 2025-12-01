import { Zap } from 'lucide-react';

export default function LoadingScreen({ message = "Cargando..." }) {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center space-y-6">
        {/* Logo animado */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-brand-cyan-500 border-4 border-black shadow-brutal animate-pulse">
            <div className="w-full h-full bg-black flex items-center justify-center">
              <Zap className="h-10 w-10 text-brand-yellow-400 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Spinner custom */}
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-black">
            <div className="w-full h-full border-4 border-t-brand-cyan-500 border-r-brand-yellow-400 border-b-brand-cyan-500 border-l-brand-yellow-400 animate-spin"></div>
          </div>
        </div>

        {/* Texto de carga */}
        <div>
          <h2 className="text-2xl font-black text-black mb-2">TaskControl</h2>
          <p className="text-gray-700 font-bold uppercase tracking-wider">
            {message}
          </p>
        </div>

        {/* Barra de progreso animada */}
        <div className="w-64 h-3 border-2 border-black bg-white">
          <div className="h-full bg-brand-cyan-500 animate-pulse" style={{ width: '100%', animation: 'loading-bar 2s ease-in-out infinite' }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
      `}</style>
    </div>
  );
}