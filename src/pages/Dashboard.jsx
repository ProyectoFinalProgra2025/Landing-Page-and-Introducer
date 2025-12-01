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
  BarChart3,
  ListChecks
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
        roles: ['AdminGeneral', 'AdminEmpresa', 'ManagerDepartamento'],
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
          name: 'Tareas',
          path: '/dashboard/tasks',
          icon: ListChecks,
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

    if (user?.rol === 'ManagerDepartamento') {
      items.push(
        {
          name: 'Tareas',
          path: '/dashboard/tasks',
          icon: ListChecks,
          roles: ['ManagerDepartamento'],
        },
        {
          name: 'Estadísticas',
          path: '/dashboard/statistics',
          icon: BarChart3,
          roles: ['ManagerDepartamento'],
        }
      );
    }

    return items;
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar Superior - Estilo Neobrutalism Premium */}
      <nav className="bg-white border-b-4 border-black fixed w-full z-30 shadow-brutal-sm transition-all duration-300">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-4">
              {user?.rol !== 'Usuario' && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 bg-white border-2 border-black hover:bg-brand-cyan-300 hover:shadow-brutal-sm transition-all active:translate-x-1 active:translate-y-1"
                >
                  {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              )}

              <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/dashboard')}>
                <div className="w-12 h-12 bg-brand-cyan-400 border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all duration-200">
                  <img
                    src="/TaskControl%20-%20Logo.png"
                    alt="TaskControl"
                    className="h-8 w-8 object-contain"
                    loading="lazy"
                  />
                </div>
                <h1 className="text-2xl font-black text-black tracking-tight hidden sm:block">
                  Task<span className="text-brand-cyan-600">Control</span>
                </h1>
              </div>

              {/* Role Badges */}
              <div className="hidden md:flex items-center ml-4">
                {user?.rol === 'AdminEmpresa' && (
                  <span className="px-3 py-1 text-xs font-black bg-brand-cyan-300 text-black border-2 border-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Admin Empresa
                  </span>
                )}
                {user?.rol === 'AdminGeneral' && (
                  <span className="px-3 py-1 text-xs font-black bg-brand-yellow-400 text-black border-2 border-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Super Admin
                  </span>
                )}
                {user?.rol === 'ManagerDepartamento' && (
                  <span className="px-3 py-1 text-xs font-black bg-purple-400 text-black border-2 border-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Manager
                  </span>
                )}
                {user?.rol === 'Usuario' && (
                  <span className="px-3 py-1 text-xs font-black bg-gray-300 text-black border-2 border-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Trabajador
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="w-8 h-8 bg-brand-yellow-400 rounded-full border-2 border-black flex items-center justify-center">
                  <User className="h-5 w-5 text-black" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-black leading-none">{user?.nombreCompleto}</span>
                  <span className="text-xs font-medium text-gray-600 leading-none mt-1">{user?.email}</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0)] hover:bg-red-500 hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200"
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
        {user?.rol !== 'Usuario' && (
          <aside
            className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-20 w-72 bg-white border-r-4 border-black transition-transform duration-300 ease-in-out pt-20 lg:pt-0 flex flex-col`}
          >
            <nav className="p-6 space-y-4 flex-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-4 px-6 py-4 font-black text-lg transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${isActive
                        ? 'bg-brand-cyan-400 text-black translate-x-1 translate-y-1 shadow-none'
                        : 'bg-white text-black hover:bg-brand-yellow-400 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                      }`}
                  >
                    <Icon className={`h-6 w-6 ${isActive ? 'text-black' : 'text-gray-800'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-6 border-t-4 border-black bg-brand-yellow-100">
              <p className="text-xs font-bold text-center uppercase tracking-widest opacity-60">
                TaskControl v1.0
              </p>
            </div>
          </aside>
        )}

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
