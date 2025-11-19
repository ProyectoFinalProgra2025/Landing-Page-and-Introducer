import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  LayoutDashboard, 
  Building2, 
  LogOut, 
  User,
  Menu,
  X,
  Users,
  BarChart3
} from 'lucide-react';
import { useState } from 'react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Menú dinámico según el rol
  const getMenuItems = () => {
    const items = [
      {
        name: 'Dashboard',
        path: '/dashboard',
        icon: LayoutDashboard,
        roles: ['AdminGeneral', 'AdminEmpresa'],
      },
    ];

    if (user?.rol === 'AdminGeneral') {
      items.push({
        name: 'Gestión de Empresas',
        path: '/dashboard/companies',
        icon: Building2,
        roles: ['AdminGeneral'],
      });
    }

    if (user?.rol === 'AdminEmpresa') {
      items.push(
        {
          name: 'Mi Empresa',
          path: '/dashboard/my-company',
          icon: Building2,
          roles: ['AdminEmpresa'],
        },
        {
          name: 'Empleados',
          path: '/dashboard/employees',
          icon: Users,
          roles: ['AdminEmpresa'],
        },
        {
          name: 'Estadísticas',
          path: '/dashboard/statistics',
          icon: BarChart3,
          roles: ['AdminEmpresa'],
        }
      );
    }

    return items;
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Superior - Estilo Neobrutalism */}
      <nav className="bg-white border-b-4 border-black fixed w-full z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 bg-white border-2 border-black hover:bg-brand-cyan-100 transition-colors"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <div className="ml-2 flex items-center space-x-3">
                <div className="w-12 h-12 bg-brand-cyan-500 border-2 border-black flex items-center justify-center">
                  <img
                    src="/TaskControl%20-%20Logo.png"
                    alt="TaskControl"
                    className="h-8 w-8 object-contain"
                    loading="lazy"
                  />
                </div>
                <h1 className="text-2xl font-black text-black">TaskControl</h1>
              </div>
              {user?.rol === 'AdminEmpresa' && (
                <span className="ml-3 px-3 py-1 text-xs font-bold bg-brand-cyan-500 text-black border-2 border-black uppercase tracking-wider">
                  Admin Empresa
                </span>
              )}
              {user?.rol === 'AdminGeneral' && (
                <span className="ml-3 px-3 py-1 text-xs font-bold bg-brand-yellow-400 text-black border-2 border-black uppercase tracking-wider">
                  Super Admin
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-4 py-2 bg-white border-2 border-black">
                <User className="h-5 w-5 text-black" />
                <span className="text-sm font-bold text-black hidden sm:inline">{user?.nombreCompleto}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white font-bold border-2 border-black hover:bg-brand-cyan-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-20">
        {/* Sidebar - Estilo Neobrutalism */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-20 w-64 bg-white border-r-4 border-black transition-transform duration-300 ease-in-out pt-20 lg:pt-0`}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 font-bold transition-all border-2 border-black ${
                    isActive
                      ? 'bg-brand-cyan-500 text-black shadow-brutal-sm translate-x-1 translate-y-1'
                      : 'bg-white text-black hover:bg-brand-yellow-400 hover:shadow-brutal-sm hover:translate-x-1 hover:translate-y-1'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay para mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden pt-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Contenido Principal */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
