import { useState } from 'react';
import {
  Bot,
  MessageSquare,
  Users,
  Bell,
  Star,
  UserCog,
  BarChart3,
  Zap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Bot,
      title: "Algoritmo Inteligente",
      description: "Sistema avanzado que analiza disponibilidad en tiempo real, conjunto de habilidades técnicas y calificaciones históricas para asignar cada tarea al trabajador más óptimo.",
      benefits: [
        "Asignación automática en <2 segundos",
        "Precisión del 95% en matching",
        "Aprende de cada asignación"
      ],
      color: "brand-cyan"
    },
    {
      icon: MessageSquare,
      title: "Chat Empresarial Integrado",
      description: "Comunicación directa y segura entre superiores y trabajadores. Mantén todas las conversaciones relacionadas con tareas centralizadas en un solo lugar.",
      benefits: [
        "Mensajería instantánea",
        "Historial completo de conversaciones",
        "Compartir archivos hasta 100MB"
      ],
      color: "brand-yellow"
    },
    {
      icon: Users,
      title: "Grupos de Trabajo Dinámicos",
      description: "Organiza equipos por proyecto, departamento o especialización. Gestiona permisos y flujos de trabajo específicos para cada grupo.",
      benefits: [
        "Grupos ilimitados",
        "Permisos granulares",
        "Colaboración en tiempo real"
      ],
      color: "black"
    },
    {
      icon: Bell,
      title: "Notificaciones Push Inteligentes",
      description: "Alertas personalizables para eventos críticos: nuevas asignaciones, mensajes urgentes, finalización de tareas y más.",
      benefits: [
        "Priorización automática",
        "Multi-canal (app, email, SMS)",
        "Configuración por usuario"
      ],
      color: "brand-cyan"
    },
    {
      icon: Star,
      title: "Sistema de Evaluación 360°",
      description: "Califica el desempeño de cada tarea completada. El sistema aprende y mejora continuamente la asignación basándose en resultados reales.",
      benefits: [
        "Métricas detalladas de rendimiento",
        "Feedback bidireccional",
        "Reports automáticos"
      ],
      color: "brand-yellow"
    },
    {
      icon: UserCog,
      title: "Gestión Avanzada de Roles",
      description: "Control total sobre permisos y accesos. Crea roles personalizados: administradores, delegadores, supervisores y trabajadores.",
      benefits: [
        "Roles ilimitados personalizables",
        "Jerarquías multinivel",
        "Auditoría completa de acciones"
      ],
      color: "black"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Dashboard completo con métricas en tiempo real. Visualiza productividad, tiempos de respuesta, tasas de completado y mucho más.",
      benefits: [
        "Reportes exportables (PDF, Excel)",
        "Gráficos interactivos",
        "KPIs personalizables"
      ],
      color: "brand-cyan"
    },
    {
      icon: Zap,
      title: "Sincronización en Tiempo Real",
      description: "Todas las actualizaciones se reflejan instantáneamente en todos los dispositivos. Tecnología WebSocket para máxima velocidad.",
      benefits: [
        "Latencia <100ms",
        "Offline mode disponible",
        "Sincronización automática"
      ],
      color: "brand-yellow"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50 relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-brand-cyan-500 border-4 border-black"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-brand-yellow-400 border-4 border-black"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-black text-white font-bold mb-6 uppercase tracking-wider">
            Características Principales
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-black mb-6">
            Todo lo que Necesitas
            <span className="block text-brand-cyan-600 mt-2">en Una Plataforma</span>
          </h2>
          <div className="w-32 h-2 bg-brand-yellow-400 mx-auto"></div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = activeFeature === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setActiveFeature(index)}
                className={`group cursor-pointer p-6 bg-white border-4 border-black transition-all duration-300 ${
                  isActive
                    ? 'shadow-brutal translate-x-2 translate-y-2'
                    : 'hover:shadow-brutal hover:translate-x-1 hover:translate-y-1'
                }`}
              >
                <div className={`w-16 h-16 ${
                  feature.color === 'brand-cyan' ? 'bg-brand-cyan-500' :
                  feature.color === 'brand-yellow' ? 'bg-brand-yellow-400' :
                  'bg-black'
                } border-2 border-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-8 w-8 ${
                    feature.color === 'black' ? 'text-white' : 'text-black'
                  }`} />
                </div>
                <h3 className="text-xl font-black text-black mb-2 group-hover:text-brand-cyan-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Active Feature Details */}
        <div className="bg-white border-4 border-black shadow-brutal p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {(() => {
                  const Icon = features[activeFeature].icon;
                  return (
                    <div className={`w-20 h-20 ${
                      features[activeFeature].color === 'brand-cyan' ? 'bg-brand-cyan-500' :
                      features[activeFeature].color === 'brand-yellow' ? 'bg-brand-yellow-400' :
                      'bg-black'
                    } border-4 border-black flex items-center justify-center`}>
                      <Icon className={`h-10 w-10 ${
                        features[activeFeature].color === 'black' ? 'text-white' : 'text-black'
                      }`} />
                    </div>
                  );
                })()}
                <div>
                  <h3 className="text-3xl font-black text-black">
                    {features[activeFeature].title}
                  </h3>
                  <div className="w-20 h-1 bg-brand-yellow-400 mt-2"></div>
                </div>
              </div>
              <p className="text-xl text-gray-700 font-medium leading-relaxed mb-8">
                {features[activeFeature].description}
              </p>
              <button className="group px-6 py-3 bg-black text-white font-bold border-2 border-black inline-flex items-center space-x-2 hover:bg-brand-cyan-600 transition-colors">
                <span>Conocer Más</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="font-bold text-black text-lg mb-4 uppercase tracking-wider">
                Beneficios Clave:
              </div>
              {features[activeFeature].benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-4 bg-gray-50 border-2 border-gray-300">
                  <CheckCircle2 className="h-6 w-6 text-brand-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800 font-semibold">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
