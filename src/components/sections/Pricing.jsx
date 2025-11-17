import { Check, X, Zap, Building2, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const plans = [
    {
      icon: Zap,
      name: "Starter",
      tagline: "Para equipos que empiezan",
      price: "$89",
      period: "/mes",
      billing: "Facturado mensualmente",
      users: "Hasta 10 usuarios",
      features: [
        { name: "Delegación automática de tareas", included: true },
        { name: "Chat interno ilimitado", included: true },
        { name: "Notificaciones push", included: true },
        { name: "Sistema de calificación", included: true },
        { name: "Dashboard básico", included: true },
        { name: "Soporte por email", included: true },
        { name: "Analytics avanzados", included: false },
        { name: "API access", included: false },
        { name: "Integraciones premium", included: false },
        { name: "Soporte 24/7", included: false }
      ],
      cta: "Empezar Gratis",
      popular: false,
      color: "white"
    },
    {
      icon: Building2,
      name: "Professional",
      tagline: "Para empresas en crecimiento",
      price: "$129",
      period: "/mes",
      billing: "Facturado mensualmente",
      users: "Hasta 50 usuarios",
      features: [
        { name: "Todo en Starter, más:", included: true },
        { name: "Analytics avanzados", included: true },
        { name: "API REST completa", included: true },
        { name: "Integraciones premium ilimitadas", included: true },
        { name: "Grupos de trabajo ilimitados", included: true },
        { name: "Roles y permisos personalizados", included: true },
        { name: "Soporte prioritario 24/7", included: true },
        { name: "Onboarding personalizado", included: true },
        { name: "Reportes exportables", included: true },
        { name: "SLA 99.9%", included: true }
      ],
      cta: "Empezar Ahora",
      popular: true,
      color: "cyan"
    },
    {
      icon: Rocket,
      name: "Enterprise",
      tagline: "Para grandes organizaciones",
      price: "$259",
      period: "/mes",
      billing: "Facturado mensualmente",
      users: "Usuarios ilimitados",
      features: [
        { name: "Todo en Professional, más:", included: true },
        { name: "Usuarios ilimitados", included: true },
        { name: "Customer Success Manager", included: true },
        { name: "Capacitación personalizada", included: true },
        { name: "SLA 99.99% garantizado", included: true },
        { name: "Hosting privado (opcional)", included: true },
        { name: "Seguridad enterprise", included: true },
        { name: "SSO & SAML", included: true },
        { name: "Auditoría completa", included: true },
        { name: "Soporte telefónico directo", included: true }
      ],
      cta: "Contactar Ventas",
      popular: false,
      color: "yellow"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-cyan-500 opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-yellow-400 opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-black text-white font-bold mb-6 uppercase tracking-wider">
            Precios Transparentes
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-black mb-6">
            Planes para Cada
            <span className="block text-brand-cyan-600 mt-2">Tamaño de Empresa</span>
          </h2>
          <div className="w-32 h-2 bg-brand-yellow-400 mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-xl text-gray-700 font-medium leading-relaxed">
            14 días de prueba gratuita en todos los planes. Sin tarjeta de crédito requerida.
            Cancela en cualquier momento.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`relative ${
                  plan.popular ? 'lg:-mt-8 lg:mb-8' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="px-6 py-2 bg-brand-yellow-400 border-4 border-black font-black uppercase tracking-wider">
                      Más Popular
                    </div>
                  </div>
                )}

                <div className={`h-full border-4 border-black ${
                  plan.color === 'cyan' ? 'bg-brand-cyan-500' :
                  plan.color === 'yellow' ? 'bg-brand-yellow-400' :
                  'bg-white'
                } ${plan.popular ? 'shadow-brutal' : 'hover:shadow-brutal hover:translate-x-1 hover:translate-y-1'} transition-all`}>
                  {/* Header */}
                  <div className="p-8 border-b-4 border-black">
                    <div className="w-16 h-16 bg-black border-2 border-black flex items-center justify-center mb-4">
                      <Icon className={`h-8 w-8 ${
                        plan.color === 'white' ? 'text-white' : 'text-brand-yellow-400'
                      }`} />
                    </div>
                    <h3 className="text-3xl font-black text-black mb-2">{plan.name}</h3>
                    <p className="text-gray-800 font-bold mb-6">{plan.tagline}</p>
                    <div className="flex items-end mb-2">
                      <span className="text-6xl font-black text-black">{plan.price}</span>
                      <span className="text-2xl font-bold text-gray-700 mb-2">{plan.period}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-700 mb-4">{plan.billing}</p>
                    <div className="inline-block px-4 py-2 bg-black text-white font-bold border-2 border-black">
                      {plan.users}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-8">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          {feature.included ? (
                            <div className="w-6 h-6 bg-black border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-gray-200 border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5">
                              <X className="h-4 w-4 text-gray-500" />
                            </div>
                          )}
                          <span className={`font-semibold ${
                            feature.included ? 'text-black' : 'text-gray-500'
                          }`}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link 
                      to="/register"
                      className={`block w-full px-6 py-4 font-black border-4 border-black transition-all hover:translate-x-1 hover:translate-y-1 text-center ${
                        plan.popular
                          ? 'bg-black text-white hover:bg-gray-900'
                          : 'bg-white text-black hover:bg-gray-100'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Info */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-white border-4 border-black text-center">
            <div className="text-3xl font-black text-black mb-2">14 días</div>
            <div className="text-gray-700 font-bold">Prueba gratuita</div>
          </div>
          <div className="p-6 bg-white border-4 border-black text-center">
            <div className="text-3xl font-black text-black mb-2">Sin tarjeta</div>
            <div className="text-gray-700 font-bold">Para empezar</div>
          </div>
          <div className="p-6 bg-white border-4 border-black text-center">
            <div className="text-3xl font-black text-black mb-2">Cancela</div>
            <div className="text-gray-700 font-bold">Cuando quieras</div>
          </div>
        </div>

        {/* Enterprise Contact */}
        <div className="mt-16 p-8 bg-black border-4 border-black text-center">
          <h3 className="text-2xl font-black text-white mb-4">
            ¿Necesitas un plan personalizado?
          </h3>
          <p className="text-gray-300 font-medium mb-6 text-lg max-w-2xl mx-auto">
            Para empresas con más de 200 usuarios u organizaciones con requisitos especiales,
            contacta con nuestro equipo de ventas para un plan a medida.
          </p>
          <button className="px-8 py-4 bg-brand-yellow-400 text-black font-bold border-2 border-white hover:bg-brand-yellow-500 transition-colors">
            Hablar con Ventas
          </button>
        </div>
      </div>
    </section>
  );
}
