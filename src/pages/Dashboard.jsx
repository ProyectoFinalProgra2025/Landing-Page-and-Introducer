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
      {/* Navbar Superior - Estilo Microsoft */}
      <nav className="bg-white border-b border-gray-200 fixed w-full z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <h1 className="ml-2 text-lg font-semibold text-gray-900">TaskControl</h1>
              {user?.rol === 'AdminEmpresa' && (
                <span className="ml-3 px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded">
                  Admin Empresa
                </span>
              )}
              {user?.rol === 'AdminGeneral' && (
                <span className="ml-3 px-2.5 py-0.5 text-xs font-medium bg-purple-50 text-purple-700 rounded">
                  Super Admin
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{user?.nombreCompleto}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-14">
        {/* Sidebar - Estilo Microsoft */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-20 w-60 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out pt-14 lg:pt-0`}
        >
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium border-l-3 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100 border-l-3 border-transparent'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay para mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
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
