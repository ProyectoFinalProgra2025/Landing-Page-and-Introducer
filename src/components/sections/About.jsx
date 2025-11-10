import { Target, Lightbulb, Award, TrendingUp, Users2, Shield } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Misión Clara",
      description: "Revolucionar la gestión empresarial mediante tecnología inteligente que maximiza la eficiencia operativa."
    },
    {
      icon: Lightbulb,
      title: "Innovación Constante",
      description: "Investigación continua en IA y machine learning para ofrecer las soluciones más avanzadas del mercado."
    },
    {
      icon: Shield,
      title: "Seguridad Primero",
      description: "Encriptación de nivel empresarial y cumplimiento total con regulaciones internacionales de protección de datos."
    },
    {
      icon: Award,
      title: "Excelencia Operativa",
      description: "Compromiso con la calidad en cada aspecto, desde el código hasta el soporte al cliente."
    }
  ];

  const milestones = [
    { year: "2025", event: "Fundación de TaskControl", description: "Inicio del desarrollo de nuestra plataforma" },
    { year: "2025", event: "Lanzamiento Beta", description: "Primeros 50 ideas para clientes corporativos" },
    { year: "2025", event: "Expansión Internacional", description: "Presencia en 4 hogares de Bolivia diferentes" },
    { year: "2025", event: "IA Avanzada", description: "Implementación de algoritmo predictivo" },
    { year: "2025", event: "5+ Empresas", description: "Líder en gestión de tareas empresariales en el futuro" }
  ];

  const team = [
    { role: "Director General", name: "Carlos Moises Zambrana", expertise: "20 años en gestión empresarial" },
    { role: "FullStack Developer", name: "Mateo Andres Soto", expertise: "5 años en desarrollo web" },
    { role: "Director de Innovación", name: "Ervin Yabeta", expertise: "1 años en investigación y desarrollo" },
    { role: "Administrador operativo", name: "Javier Salazar Caballero", expertise: "2 años en gestión de operaciones" }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-1/3 h-64 bg-brand-cyan-500 opacity-10"></div>
      <div className="absolute bottom-1/4 left-0 w-1/4 h-48 bg-brand-yellow-400 opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-brand-cyan-500 text-black font-bold mb-6 uppercase tracking-wider border-2 border-black">
            Sobre Nosotros
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-black mb-6">
            Transformando la Gestión
            <span className="block text-brand-cyan-600 mt-2">Empresarial Moderna</span>
          </h2>
          <div className="w-32 h-2 bg-brand-yellow-400 mx-auto mb-8"></div>
          <p className="max-w-4xl mx-auto text-xl text-gray-700 font-medium leading-relaxed">
            TaskControl nace de la frustración de ver empresas perder millones de dólares en
            tiempo improductivo y asignación ineficiente de recursos. Combinamos expertise en
            gestión empresarial con las últimas tecnologías de IA para crear la solución definitiva.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          <div className="p-8 bg-black text-white border-4 border-black text-center">
            <div className="text-5xl font-black mb-2">500+</div>
            <div className="text-brand-yellow-400 font-bold uppercase tracking-wider">Empresas</div>
          </div>
          <div className="p-8 bg-brand-cyan-500 text-black border-4 border-black text-center">
            <div className="text-5xl font-black mb-2">50K+</div>
            <div className="font-bold uppercase tracking-wider">Usuarios</div>
          </div>
          <div className="p-8 bg-brand-yellow-400 text-black border-4 border-black text-center">
            <div className="text-5xl font-black mb-2">1M+</div>
            <div className="font-bold uppercase tracking-wider">Tareas/Mes</div>
          </div>
          <div className="p-8 bg-white text-black border-4 border-black text-center">
            <div className="text-5xl font-black mb-2">99.9%</div>
            <div className="text-brand-cyan-600 font-bold uppercase tracking-wider">Uptime</div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-black text-black mb-8 text-center">
            Nuestros Valores Fundamentales
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="p-6 bg-gray-50 border-4 border-black hover:shadow-brutal hover:translate-x-1 hover:translate-y-1 transition-all">
                  <div className="w-14 h-14 bg-brand-cyan-500 border-2 border-black flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-black" />
                  </div>
                  <h4 className="text-xl font-black text-black mb-2">{value.title}</h4>
                  <p className="text-gray-700 font-medium leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="text-3xl font-black text-black mb-12 text-center">
            Nuestra Historia
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-black"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="w-full md:w-1/2 md:px-8">
                    <div className={`p-6 bg-white border-4 border-black shadow-brutal ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="inline-block px-4 py-1 bg-brand-yellow-400 border-2 border-black font-black text-2xl mb-3">
                        {milestone.year}
                      </div>
                      <h4 className="text-2xl font-black text-black mb-2">{milestone.event}</h4>
                      <p className="text-gray-700 font-semibold">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand-cyan-500 border-4 border-black"></div>
                  <div className="hidden md:block w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="text-3xl font-black text-black mb-8 text-center">
            Equipo de Liderazgo
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="group p-6 bg-white border-4 border-black hover:bg-brand-cyan-500 transition-colors">
                <div className="w-20 h-20 bg-gray-200 border-4 border-black mb-4 flex items-center justify-center">
                  <Users2 className="h-10 w-10 text-gray-600" />
                </div>
                <div className="text-sm font-bold text-brand-cyan-600 group-hover:text-black uppercase tracking-wider mb-1">
                  {member.role}
                </div>
                <h4 className="text-xl font-black text-black mb-2">{member.name}</h4>
                <p className="text-gray-700 font-semibold text-sm">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
