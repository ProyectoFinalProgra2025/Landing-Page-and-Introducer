import { useState } from 'react';
import { Send, Github } from 'lucide-react';
import { contactInfo, GITHUB_URL } from '../../data/contactData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // contactInfo and GITHUB_URL are imported from src/data/contactData.js

  return (
    <section id="contact" className="py-24 bg-white relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-brand-cyan-500 opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-yellow-400 opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-brand-yellow-400 text-black font-bold mb-6 uppercase tracking-wider border-2 border-black">
            Contacto
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-black mb-6">
            Hablemos de tu
            <span className="block text-brand-cyan-600 mt-2">Transformación Digital</span>
          </h2>
          <div className="w-32 h-2 bg-brand-yellow-400 mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-xl text-gray-700 font-medium leading-relaxed">
            ¿Listo para optimizar la gestión de tu equipo? Nuestro equipo de expertos está
            disponible para ayudarte a implementar TaskControl en tu organización.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white border-4 border-black shadow-brutal p-8">
              <h3 className="text-2xl font-black text-black mb-6">Envíanos un Mensaje</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-brand-cyan-500 font-medium"
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                      Email Corporativo *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-brand-cyan-500 font-medium"
                      placeholder="juan@empresa.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-brand-cyan-500 font-medium"
                      placeholder="Mi Empresa S.A."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-brand-cyan-500 font-medium"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                    Asunto *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-brand-cyan-500 font-medium bg-white"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="demo">Solicitar Demo</option>
                    <option value="sales">Consulta de Ventas</option>
                    <option value="support">Soporte Técnico</option>
                    <option value="partnership">Alianzas Estratégicas</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                    Mensaje *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-brand-cyan-500 font-medium resize-none"
                    placeholder="Cuéntanos más sobre tus necesidades..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="group w-full px-8 py-4 bg-black text-white font-bold border-2 border-black shadow-brutal hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all flex items-center justify-center space-x-2"
                >
                  <span>Enviar Mensaje</span>
                  <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-sm text-gray-600 font-medium text-center">
                  Al enviar este formulario, aceptas nuestra política de privacidad.
                </p>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="order-1 lg:order-2 space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-gray-50 border-4 border-black hover:shadow-brutal hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-brand-cyan-500 border-2 border-black flex items-center justify-center flex-shrink-0">
                      <Icon className="h-7 w-7 text-black" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-black text-black mb-1">{info.title}</h4>
                      {info.link ? (
                        <a href={info.link} className="text-xl font-bold text-brand-cyan-600 hover:text-brand-cyan-700 block mb-1">
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-xl font-bold text-gray-900 mb-1">{info.content}</p>
                      )}
                      <p className="text-sm text-gray-600 font-medium">{info.subtext}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Social Media */}
            <div className="p-6 bg-black border-4 border-black">
              <h4 className="text-lg font-black text-white mb-4 uppercase tracking-wider">Síguenos</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/ProyectoFinalProgra2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="ProyectoFinalProgra2025 GitHub"
                    className="w-12 h-12 bg-white border-2 border-white flex items-center justify-center hover:bg-brand-cyan-500 transition-colors"
                  >
                    <Github className="h-6 w-6 text-black" />
                  </a>
                </div>
            </div>

            {/* CTA Box */}
            <div className="p-6 bg-brand-yellow-400 border-4 border-black">
              <h4 className="text-2xl font-black text-black mb-2">¿Prefieres una Demo?</h4>
              <p className="text-gray-800 font-semibold mb-4">
                Agenda una demostración personalizada de 30 minutos con nuestro equipo.
              </p>
              <button className="w-full px-6 py-3 bg-black text-white font-bold border-2 border-black hover:bg-gray-900 transition-colors">
                Agendar Demo Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
