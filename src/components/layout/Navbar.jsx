import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigation = [
    { name: 'Inicio', href: '/' },
    {
      name: 'Producto',
      href: '#',
      dropdown: [
        { name: 'Características', href: '#features' },
        { name: 'Cómo Funciona', href: '#how-it-works' },
        { name: 'Integraciones', href: '#integrations' },
      ]
    },
    { name: 'Precios', href: '#pricing' },
    { name: 'Sobre Nosotros', href: '#about' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white border-b-4 border-black z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-brand-cyan-500 border-2 border-black flex items-center justify-center transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform">
                <img
                  src="/TaskControl%20-%20Logo.png"
                  alt="TaskControl logo"
                  className="h-8 w-8 object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-2xl font-bold text-black">TaskControl</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="px-4 py-2 text-black font-semibold hover:bg-brand-cyan-100 transition-colors flex items-center">
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white border-2 border-black shadow-brutal-sm">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-black font-medium hover:bg-brand-yellow-400 transition-colors border-b border-gray-200 last:border-b-0"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="px-4 py-2 text-black font-semibold hover:bg-brand-cyan-100 transition-colors block"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              to="/login"
              className="px-6 py-2 text-black font-bold border-2 border-black hover:bg-gray-100 transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link 
              to="/register"
              className="px-6 py-2 bg-brand-yellow-500 text-black font-bold border-2 border-black shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              Prueba Gratis
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border-2 border-black bg-white hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t-2 border-black bg-white">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className="w-full text-left px-4 py-3 text-black font-semibold border-2 border-black bg-white hover:bg-brand-cyan-100 flex justify-between items-center mb-1"
                    >
                      {item.name}
                      <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="ml-4 space-y-1 mb-1">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-black border-l-4 border-brand-cyan-500 hover:bg-gray-100"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="block px-4 py-3 text-black font-semibold border-2 border-black bg-white hover:bg-brand-cyan-100 mb-1"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-2">
              <Link 
                to="/login"
                className="block w-full px-6 py-3 text-black font-bold border-2 border-black bg-white hover:bg-gray-100 text-center"
              >
                Iniciar Sesión
              </Link>
              <Link 
                to="/register"
                className="block w-full px-6 py-3 bg-brand-yellow-500 text-black font-bold border-2 border-black text-center"
              >
                Prueba Gratis
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
