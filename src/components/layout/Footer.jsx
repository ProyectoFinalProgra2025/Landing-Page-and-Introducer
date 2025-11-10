import { Github } from 'lucide-react';
import { contactInfo, GITHUB_URL } from '../../data/contactData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Características", href: "#features" },
      { name: "Precios", href: "#pricing" },
      { name: "Cómo Funciona", href: "#how-it-works" },
      { name: "Integraciones", href: "#" },
      { name: "API Docs", href: "#" },
      { name: "Roadmap", href: "#" }
    ],
    company: [
      { name: "Sobre Nosotros", href: "#about" },
      { name: "Equipo", href: "#" },
      { name: "Carreras", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Prensa", href: "#" },
      { name: "Contacto", href: "#contact" }
    ],
    resources: [
      { name: "Documentación", href: "#" },
      { name: "Centro de Ayuda", href: "#" },
      { name: "FAQ", href: "#faq" },
      { name: "Casos de Estudio", href: "#" },
      { name: "Webinars", href: "#" },
      { name: "Tutoriales", href: "#" }
    ],
    legal: [
      { name: "Términos de Servicio", href: "#" },
      { name: "Política de Privacidad", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "SLA", href: "#" },
      { name: "Compliance", href: "#" },
      { name: "Seguridad", href: "#" }
    ]
  };

  return (
    <footer className="bg-black text-white border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-brand-cyan-500 border-2 border-white flex items-center justify-center">
                <span className="text-black font-bold text-xl">TC</span>
              </div>
              <span className="text-2xl font-black text-white">TaskControl</span>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed mb-6 max-w-sm">
              La plataforma SaaS líder en automatización de gestión de tareas empresariales
              con inteligencia artificial.
            </p>

            {/* Contact Info (reused from shared data) */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <div key={idx} className="flex items-center space-x-3 text-gray-400">
                    <Icon className="h-5 w-5" />
                    {info.link ? (
                      <a href={info.link} className="hover:text-brand-cyan-500 font-medium">
                        {info.content}
                      </a>
                    ) : (
                      <span className="font-medium">{info.content}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Social Media - only GitHub (organization repo) */}
            <div className="flex space-x-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ProyectoFinalProgra2025 GitHub"
                className="w-10 h-10 bg-white border-2 border-white flex items-center justify-center hover:bg-brand-cyan-500 transition-colors"
              >
                <Github className="h-5 w-5 text-black" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-black mb-4 uppercase tracking-wider">Producto</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 font-medium hover:text-brand-yellow-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-black mb-4 uppercase tracking-wider">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 font-medium hover:text-brand-yellow-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-black mb-4 uppercase tracking-wider">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 font-medium hover:text-brand-yellow-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-black mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 font-medium hover:text-brand-yellow-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t-2 border-gray-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-black text-white mb-2">
                Mantente Actualizado
              </h4>
              <p className="text-gray-400 font-medium">
                Recibe las últimas noticias, actualizaciones y tips de productividad.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 border-2 border-white bg-black text-white font-medium focus:outline-none focus:border-brand-cyan-500"
              />
              <button className="px-6 py-3 bg-brand-yellow-400 text-black font-bold border-2 border-white hover:bg-brand-yellow-500 transition-colors">
                Suscribir
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t-2 border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 font-medium">
              © {currentYear} TaskControl. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <div className="px-4 py-2 bg-gray-900 border-2 border-gray-700 text-gray-400 font-bold text-sm">
                SOC 2 Type II
              </div>
              <div className="px-4 py-2 bg-gray-900 border-2 border-gray-700 text-gray-400 font-bold text-sm">
                GDPR Compliant
              </div>
              <div className="px-4 py-2 bg-gray-900 border-2 border-gray-700 text-gray-400 font-bold text-sm">
                ISO 27001
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
