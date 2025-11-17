import { ArrowRight, PlayCircle, Zap, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-cyan-500 transform skew-x-12 translate-x-1/3"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-brand-yellow-400 border-4 border-black"></div>
      <div className="absolute bottom-20 right-32 w-48 h-48 bg-black"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-block">
              <div className="px-6 py-3 bg-brand-yellow-400 border-2 border-black inline-flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span className="font-bold text-black uppercase tracking-wider">Sistema SaaS Empresarial</span>
              </div>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-5xl lg:text-7xl font-black text-black leading-none mb-6">
                Automatiza la
                <span className="block text-brand-cyan-600 mt-2">Delegación</span>
                <span className="block mt-2">de Tareas</span>
              </h1>
              <div className="w-32 h-2 bg-brand-yellow-400"></div>
            </div>

            {/* Subheading */}
            <p className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed">
              Optimiza la asignación de trabajo con nuestro algoritmo avanzado como si fuera IA.
              Analiza disponibilidad, habilidades y rendimiento para maximizar
              la productividad de tu equipo.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/register"
                className="group px-8 py-4 bg-black text-white font-bold border-4 border-black shadow-brutal hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all flex items-center justify-center space-x-2"
              >
                <span>Comenzar Prueba Gratis</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login"
                className="group px-8 py-4 bg-white text-black font-bold border-4 border-black shadow-brutal hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all flex items-center justify-center space-x-2"
              >
                <PlayCircle className="h-5 w-5" />
                <span>Ver Demo en Vivo</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t-2 border-gray-300">
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">
                Confiado por empresas líderes
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="px-6 py-2 border-2 border-gray-300 bg-white font-bold text-gray-600">
                  ChatUPSA
                </div>
                <div className="px-6 py-2 border-2 border-gray-300 bg-white font-bold text-gray-600">
                  UPSA
                </div>
                <div className="px-6 py-2 border-2 border-gray-300 bg-white font-bold text-gray-600">
                  Dolar Blue Bolivia
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative hidden lg:block">
            <div className="relative z-10">
              {/* Main Card */}
              <div className="bg-white border-4 border-black shadow-brutal p-8 transform hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all">
                <div className="space-y-6">
                  {/* Stat 1 */}
                  <div className="flex items-start space-x-4 p-4 bg-brand-cyan-100 border-2 border-black">
                    <div className="w-12 h-12 bg-brand-cyan-500 border-2 border-black flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-black">5+</div>
                      <div className="text-sm font-bold text-gray-700">Empresas Activas</div>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="flex items-start space-x-4 p-4 bg-brand-yellow-100 border-2 border-black">
                    <div className="w-12 h-12 bg-brand-yellow-500 border-2 border-black flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-black">100%</div>
                      <div className="text-sm font-bold text-gray-700">Aumento en Productividad</div>
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="flex items-start space-x-4 p-4 bg-gray-100 border-2 border-black">
                    <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center flex-shrink-0">
                      <Zap className="h-6 w-6 text-brand-yellow-400" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-black">10K+</div>
                      <div className="text-sm font-bold text-gray-700">Tareas Procesadas</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-yellow-400 border-4 border-black animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-cyan-500 border-4 border-black"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
