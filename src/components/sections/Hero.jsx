import { ArrowRight, PlayCircle, Zap, Users, TrendingUp, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-cyan-500 to-brand-cyan-400 transform skew-x-12 translate-x-1/3 opacity-90"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-brand-yellow-400 border-4 border-black animate-bounce"></div>
      <div className="absolute bottom-20 right-32 w-48 h-48 bg-black shadow-brutal"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-block">
              <div className="px-6 py-3 bg-brand-yellow-400 border-2 border-black inline-flex items-center space-x-2 shadow-brutal-sm">
                <Zap className="h-5 w-5" />
                <span className="font-bold text-black uppercase tracking-wider">Sistema SaaS Empresarial</span>
              </div>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-5xl lg:text-7xl font-black text-black leading-none mb-6">
                Automatiza la
                <span className="block text-brand-cyan-600 mt-2 animate-pulse">Delegación</span>
                <span className="block mt-2">de Tareas</span>
              </h1>
              <div className="w-32 h-2 bg-brand-yellow-400 animate-pulse"></div>
            </div>

            {/* Subheading */}
            <p className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed">
              Optimiza la asignación de trabajo con nuestro algoritmo avanzado como si fuera <strong className="text-brand-cyan-600">IA</strong>.
              Analiza disponibilidad, habilidades y rendimiento para maximizar
              la <strong>productividad de tu equipo</strong>.
            </p>

            {/* Trust Points */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-green-100 border-2 border-green-500 px-3 py-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-bold text-green-700">30 días gratuitos</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 border-2 border-blue-500 px-3 py-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="font-bold text-blue-700">Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-100 border-2 border-purple-500 px-3 py-2">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span className="font-bold text-purple-700">Configuración instantánea</span>
              </div>
            </div>

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
                Confiado por empresas líderes en Bolivia
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="px-6 py-2 border-2 border-gray-300 bg-white font-bold text-gray-600 hover:border-brand-cyan-500 transition-colors">
                  UPSA
                </div>
                <div className="px-6 py-2 border-2 border-gray-300 bg-white font-bold text-gray-600 hover:border-brand-cyan-500 transition-colors">
                  ChatUPSA
                </div>
                <div className="px-6 py-2 border-2 border-gray-300 bg-white font-bold text-gray-600 hover:border-brand-cyan-500 transition-colors">
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
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-black mb-2">Métricas en Tiempo Real</h3>
                    <div className="w-16 h-1 bg-brand-cyan-500 mx-auto"></div>
                  </div>

                  {/* Stat 1 */}
                  <div className="flex items-start space-x-4 p-4 bg-brand-cyan-100 border-2 border-black">
                    <div className="w-12 h-12 bg-brand-cyan-500 border-2 border-black flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-black">10+</div>
                      <div className="text-sm font-bold text-gray-700">Empresas Activas</div>
                      <div className="text-xs text-brand-cyan-600 font-bold">+200% este mes</div>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="flex items-start space-x-4 p-4 bg-brand-yellow-100 border-2 border-black">
                    <div className="w-12 h-12 bg-brand-yellow-500 border-2 border-black flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-black">95%</div>
                      <div className="text-sm font-bold text-gray-700">Aumento en Productividad</div>
                      <div className="text-xs text-yellow-600 font-bold">Promedio verificado</div>
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="flex items-start space-x-4 p-4 bg-gray-100 border-2 border-black">
                    <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center flex-shrink-0">
                      <Zap className="h-6 w-6 text-brand-yellow-400" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-black">50K+</div>
                      <div className="text-sm font-bold text-gray-700">Tareas Procesadas</div>
                      <div className="text-xs text-gray-600 font-bold">Este trimestre</div>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="text-center pt-4 border-t-2 border-gray-200">
                    <div className="flex justify-center items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm font-bold text-gray-700">"La mejor inversión que hemos hecho"</p>
                    <p className="text-xs text-gray-500">- CEO, Empresa Líder</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-yellow-400 border-4 border-black animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-cyan-500 border-4 border-black animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Additional CTAs for mobile */}
        <div className="lg:hidden mt-12 text-center">
          <p className="text-lg font-bold text-gray-700 mb-4">
            Únete a las <span className="text-brand-cyan-600">10+ empresas</span> que ya optimizan sus tareas
          </p>
          <div className="flex justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
