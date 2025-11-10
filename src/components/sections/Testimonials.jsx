import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "María González",
      role: "CEO",
      company: "TechStart Solutions",
      image: null,
      rating: 5,
      text: "TaskControl transformó completamente nuestra operación. La asignación automática de tareas nos ahorró más de 15 horas semanales en coordinación. El ROI fue visible en el primer mes.",
      stats: { metric: "40% más productividad", time: "Primer mes" }
    },
    {
      name: "Roberto Sánchez",
      role: "Director de Operaciones",
      company: "GlobalTech Corp",
      image: null,
      rating: 5,
      text: "Implementamos TaskControl en un equipo de 120 personas. El sistema de calificaciones nos ayudó a identificar talento oculto y optimizar la distribución de carga de trabajo. Impresionante.",
      stats: { metric: "25% reducción costos", time: "Trimestre 1" }
    },
    {
      name: "Ana Martínez",
      role: "VP of Engineering",
      company: "DataFlow Inc",
      image: null,
      rating: 5,
      text: "La integración fue sorprendentemente sencilla. En menos de una semana, todo nuestro equipo estaba operativo. El soporte técnico es excepcional - responden en minutos, no horas.",
      stats: { metric: "5 días implementación", time: "Setup completo" }
    },
    {
      name: "Carlos Ruiz",
      role: "Gerente de Proyectos",
      company: "BuildSmart",
      image: null,
      rating: 5,
      text: "El chat integrado eliminó la necesidad de usar 3 herramientas diferentes. Tener todo centralizado - tareas, comunicación y métricas - en una sola plataforma es un game changer total.",
      stats: { metric: "3 herramientas eliminadas", time: "Ahorro $500/mes" }
    },
    {
      name: "Laura Torres",
      role: "COO",
      company: "FinanceHub",
      image: null,
      rating: 5,
      text: "Somos una empresa regulada y la seguridad es crítica. TaskControl cumple con todos nuestros requisitos de compliance. La auditoría de acciones es invaluable para nosotros.",
      stats: { metric: "100% compliance", time: "Auditorías aprobadas" }
    },
    {
      name: "Diego Vargas",
      role: "CTO",
      company: "CloudScale",
      image: null,
      rating: 5,
      text: "El algoritmo de IA aprende continuamente. Después de 3 meses, la precisión en asignación de tareas alcanzó el 97%. Esto es machine learning aplicado de forma práctica y efectiva.",
      stats: { metric: "97% precisión", time: "A los 3 meses" }
    }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-brand-yellow-400 border-4 border-black"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-brand-cyan-500 border-4 border-black"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-black text-white font-bold mb-6 uppercase tracking-wider">
            Testimonios
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-black mb-6">
            Lo Que Dirán
            <span className="block text-brand-cyan-600 mt-2">Nuestros Clientes</span>
          </h2>
          <div className="w-32 h-2 bg-brand-yellow-400 mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-xl text-gray-700 font-medium leading-relaxed">
            En un futuro no muy lejano...
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border-4 border-black p-8 hover:shadow-brutal hover:translate-x-1 hover:translate-y-1 transition-all relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-brand-yellow-400 border-2 border-black flex items-center justify-center">
                <Quote className="h-6 w-6 text-black" />
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-brand-yellow-500 text-brand-yellow-500" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-800 font-medium leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Stats Badge */}
              <div className="mb-6 p-3 bg-brand-cyan-100 border-2 border-black">
                <div className="text-lg font-black text-black">{testimonial.stats.metric}</div>
                <div className="text-sm font-bold text-gray-700">{testimonial.stats.time}</div>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-3 pt-6 border-t-2 border-gray-200">
                <div className="w-12 h-12 bg-gray-200 border-2 border-black flex items-center justify-center font-black text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-black text-black">{testimonial.name}</div>
                  <div className="text-sm font-bold text-gray-600">
                    {testimonial.role} - {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-black border-4 border-black">
            <p className="text-white text-xl font-bold mb-4">
              ¿Quieres formar parte de estas historias de éxito?
            </p>
            <button className="px-8 py-4 bg-brand-yellow-400 text-black font-bold border-2 border-white hover:bg-brand-yellow-500 transition-colors">
              Comenzar Prueba Gratuita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
