import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "¿Cómo funciona el periodo de prueba gratuita?",
      answer: "Ofrecemos 14 días de prueba gratuita sin necesidad de tarjeta de crédito. Tendrás acceso completo a todas las funcionalidades del plan que elijas. Puedes cancelar en cualquier momento durante el periodo de prueba sin costo alguno. Si decides continuar, simplemente ingresa tu información de pago antes de que termine el periodo de prueba."
    },
    {
      question: "¿Qué tan segura es la información de mi empresa en TaskControl?",
      answer: "La seguridad es nuestra máxima prioridad. Utilizamos encriptación AES-256 para datos en reposo y TLS 1.3 para datos en tránsito. Cumplimos con SOC 2 Type II, GDPR, ISO 27001 y CCPA. Realizamos auditorías de seguridad trimestrales con firmas externas. Todos los datos se almacenan en centros de datos certificados con redundancia geográfica. Además, ofrecemos autenticación de dos factores (2FA) y SSO empresarial."
    },
    {
      question: "¿Puedo integrar TaskControl con mis herramientas actuales?",
      answer: "Absolutamente. TaskControl se integra con más de 50 herramientas empresariales populares incluyendo: Slack, Microsoft Teams, Google Workspace, Salesforce, Jira, GitHub, Asana, Trello, y muchas más. También ofrecemos una API REST completa y webhooks para integraciones personalizadas. Nuestro equipo de soporte puede ayudarte con la configuración inicial sin costo adicional."
    },
    {
      question: "¿Qué sucede si necesito más usuarios que los incluidos en mi plan?",
      answer: "Puedes agregar usuarios adicionales en cualquier momento. Para el plan Starter, cada usuario adicional cuesta $5/mes. En el plan Professional, $8/mes por usuario adicional. El plan Enterprise incluye usuarios ilimitados. Los cambios se prorratean automáticamente en tu próxima factura. También puedes cambiar de plan en cualquier momento si necesitas más funcionalidades."
    },
    {
      question: "¿Ofrecen capacitación para mi equipo?",
      answer: "Sí. Todos los planes incluyen acceso a nuestra biblioteca de recursos de aprendizaje con videos tutoriales, guías paso a paso y webinars mensuales. El plan Professional incluye 2 sesiones de onboarding en vivo. El plan Enterprise incluye capacitación personalizada ilimitada, un customer success manager dedicado y sesiones de training mensuales para nuevos empleados."
    },
    {
      question: "¿Puedo cancelar mi suscripción en cualquier momento?",
      answer: "Sí, puedes cancelar tu suscripción en cualquier momento desde el panel de configuración. No hay contratos de permanencia ni penalizaciones por cancelación. Si cancelas, tendrás acceso hasta el final de tu periodo de facturación actual. Todos tus datos permanecen disponibles para exportación durante 30 días después de la cancelación."
    },
    {
      question: "¿Cómo funciona el algoritmo de asignación de tareas?",
      answer: "Nuestro algoritmo utiliza machine learning para analizar múltiples factores: (1) Disponibilidad en tiempo real del trabajador, (2) Conjunto de habilidades y certificaciones, (3) Calificaciones históricas en tareas similares, (4) Carga de trabajo actual, (5) Preferencias del trabajador, (6) Prioridad de la tarea. El sistema aprende continuamente de cada asignación y se optimiza automáticamente. La precisión promedio es del 95% después de 2 semanas de uso."
    },
    {
      question: "¿Qué tipo de soporte técnico ofrecen?",
      answer: "El plan Starter incluye soporte por email con respuesta en 24 horas hábiles. El plan Professional incluye soporte prioritario 24/7 por email y chat con tiempo de respuesta de <2 horas. El plan Enterprise incluye soporte telefónico directo, Slack compartido con nuestro equipo, SLA garantizado del 99.9% de uptime, y un technical account manager dedicado."
    },
    {
      question: "¿Los datos se pueden exportar?",
      answer: "Sí, puedes exportar todos tus datos en cualquier momento en múltiples formatos: CSV, Excel, JSON y PDF. Esto incluye tareas, usuarios, calificaciones, mensajes de chat, analytics y reportes. No hay límites en las exportaciones. También ofrecemos backup automático diario incluido en todos los planes, con retención de 90 días en Professional y 365 días en Enterprise."
    },
    {
      question: "¿Necesito conocimientos técnicos para implementar TaskControl?",
      answer: "No. TaskControl está diseñado para ser extremadamente intuitivo. La configuración inicial toma menos de 30 minutos. Ofrecemos wizards paso a paso para importar empleados, configurar departamentos y crear tu primera tarea. La interfaz es drag-and-drop y no requiere programación. Sin embargo, para integraciones avanzadas con API, sí recomendamos tener un desarrollador en tu equipo."
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-cyan-500 border-4 border-black opacity-20"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-6 py-2 bg-brand-yellow-400 text-black font-bold mb-6 uppercase tracking-wider border-2 border-black">
            <HelpCircle className="h-5 w-5" />
            <span>Preguntas Frecuentes</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-black mb-6">
            ¿Tienes Dudas?
            <span className="block text-brand-cyan-600 mt-2">Aquí las Respuestas</span>
          </h2>
          <div className="w-32 h-2 bg-brand-yellow-400 mx-auto mb-8"></div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-4 border-black bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg lg:text-xl font-black text-black pr-4">
                  {faq.question}
                </span>
                <div className={`w-10 h-10 flex-shrink-0 border-2 border-black flex items-center justify-center transition-colors ${
                  openIndex === index ? 'bg-brand-cyan-500' : 'bg-white'
                }`}>
                  {openIndex === index ? (
                    <Minus className="h-6 w-6 text-black" />
                  ) : (
                    <Plus className="h-6 w-6 text-black" />
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 pt-2 bg-gray-50 border-t-4 border-black">
                  <p className="text-gray-800 font-medium leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 p-8 bg-black border-4 border-black text-center">
          <h3 className="text-2xl font-black text-white mb-4">
            ¿No encuentras lo que buscas?
          </h3>
          <p className="text-gray-300 font-medium mb-6 text-lg">
            Nuestro equipo de soporte está disponible para ayudarte con cualquier pregunta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-brand-yellow-400 text-black font-bold border-2 border-white hover:bg-brand-yellow-500 transition-colors">
              Contactar Soporte
            </button>
            <button className="px-8 py-4 bg-white text-black font-bold border-2 border-white hover:bg-gray-100 transition-colors">
              Ver Documentación
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
