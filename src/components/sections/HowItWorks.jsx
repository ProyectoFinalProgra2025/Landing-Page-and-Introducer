import { UserPlus, Users, BrainCircuit, BarChart } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Crea tu Cuenta Admin",
      description: "Regístrate en menos de 5 minutos. Configura tu empresa, personaliza roles y define tu estructura organizacional.",
      details: [
        "Setup guiado paso a paso",
        "Importa empleados vía CSV",
        "Configura departamentos"
      ],
      color: "brand-cyan"
    },
    {
      number: "02",
      icon: Users,
      title: "Agrega tu Equipo",
      description: "Invita a trabajadores y administradores. Define habilidades, niveles de acceso y disponibilidad para cada miembro.",
      details: [
        "Invitaciones por email",
        "Perfiles personalizables",
        "Asignación de skills"
      ],
      color: "brand-yellow"
    },
    {
      number: "03",
      icon: BrainCircuit,
      title: "Delega Tareas Inteligentemente",
      description: "Crea tareas y deja que nuestro algoritmo las asigne automáticamente al trabajador más adecuado basándose en múltiples factores.",
      details: [
        "Asignación en tiempo real",
        "Matching inteligente",
        "Aprendizaje continuo"
      ],
      color: "black"
    },
    {
      number: "04",
      icon: BarChart,
      title: "Monitorea y Optimiza",
      description: "Visualiza métricas en tiempo real, califica el desempeño y mejora continuamente la productividad de tu equipo.",
      details: [
        "Dashboard en vivo",
        "Reportes automáticos",
        "Sistema de calificación"
      ],
      color: "brand-cyan"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-1/4 h-48 bg-brand-cyan-500 opacity-10"></div>
      <div className="absolute bottom-1/4 right-0 w-1/3 h-64 bg-brand-yellow-400 opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-2 bg-brand-cyan-500 text-black font-bold mb-6 uppercase tracking-wider border-2 border-black">
            Cómo Funciona
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-black mb-6">
            Implementación en
            <span className="block text-brand-cyan-600 mt-2">4 Simples Pasos</span>
          </h2>
          <div className="w-32 h-2 bg-brand-yellow-400 mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-xl text-gray-700 font-medium leading-relaxed">
            De cero a optimización completa en menos de una semana. Sin complicaciones técnicas.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                {/* Connector Line (hidden on mobile, shown on lg) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-1 bg-black z-0"></div>
                )}

                {/* Card */}
                <div className="relative z-10 bg-white border-4 border-black p-6 hover:shadow-brutal hover:translate-x-1 hover:translate-y-1 transition-all h-full">
                  {/* Number Badge */}
                  <div className={`absolute -top-4 -right-4 w-16 h-16 ${
                    step.color === 'brand-cyan' ? 'bg-brand-cyan-500' :
                    step.color === 'brand-yellow' ? 'bg-brand-yellow-400' :
                    'bg-black'
                  } border-4 border-black flex items-center justify-center`}>
                    <span className={`text-2xl font-black ${
                      step.color === 'black' ? 'text-white' : 'text-black'
                    }`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 ${
                    step.color === 'brand-cyan' ? 'bg-brand-cyan-500' :
                    step.color === 'brand-yellow' ? 'bg-brand-yellow-400' :
                    'bg-black'
                  } border-2 border-black flex items-center justify-center mb-4 mt-4`}>
                    <Icon className={`h-8 w-8 ${
                      step.color === 'black' ? 'text-white' : 'text-black'
                    }`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black text-black mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 font-medium leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-2 text-sm font-bold text-gray-600">
                        <div className="w-2 h-2 bg-black"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto p-8 bg-black border-4 border-black text-center">
          <h3 className="text-3xl font-black text-white mb-4">
            ¿Listo para Comenzar?
          </h3>
          <p className="text-gray-300 font-medium mb-6 text-lg">
            Únete a las 500+ empresas que ya están optimizando su gestión de tareas con TaskControl.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-brand-yellow-400 text-black font-bold border-2 border-white hover:bg-brand-yellow-500 transition-colors">
              Empezar Prueba Gratuita
            </button>
            <button className="px-8 py-4 bg-white text-black font-bold border-2 border-white hover:bg-gray-100 transition-colors">
              Agendar Demo
            </button>
          </div>
          <p className="text-gray-400 text-sm font-medium mt-4">
            No requiere tarjeta de crédito • Setup en 5 minutos
          </p>
        </div>
      </div>
    </section>
  );
}
