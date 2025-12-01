import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SignalRProvider } from './context/SignalRContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import PerformanceMonitor from './components/common/PerformanceMonitor';
import SEOHead from './components/common/SEOHead';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DashboardHome from './pages/DashboardHome';
import CompaniesManagement from './pages/CompaniesManagement';
import EmployeesManagement from './pages/EmployeesManagement';
import CompanyStatistics from './pages/CompanyStatistics';
import MyCompany from './pages/MyCompany';
import TasksManagement from './pages/TasksManagement';
import TaskDetail from './pages/TaskDetail';
import NotFound from './pages/NotFound';
import { seoData } from './utils/seoData';

export default function App() {
  return (
    <ErrorBoundary>
      <PerformanceMonitor>
        <AuthProvider>
          <SignalRProvider>
            <Routes>
              {/* Rutas públicas con layout de landing */}
              <Route path="/" element={
                <div className="min-h-screen flex flex-col">
                  <SEOHead {...seoData.home} />
                  <Navbar />
                  <main className="flex-1">
                    <Home />
                  </main>
                  <Footer />
                </div>
              } />

              {/* Rutas de autenticación sin navbar/footer */}
              <Route path="/login" element={
                <>
                  <SEOHead {...seoData.login} />
                  <Login />
                </>
              } />
              
              <Route path="/register" element={
                <>
                  <SEOHead {...seoData.register} />
                  <Register />
                </>
              } />

              {/* Rutas protegidas del dashboard */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <SEOHead {...seoData.dashboard} />
                  <Dashboard />
                </ProtectedRoute>
              }>
                <Route index element={<DashboardHome />} />
                <Route path="companies" element={
                  <>
                    <SEOHead 
                      title="Gestión de Empresas - TaskControl"
                      description="Administra y gestiona empresas registradas en TaskControl. Aprueba nuevas solicitudes y monitorea el estado de las organizaciones."
                      keywords="gestión empresas, administración, aprobación empresas, TaskControl"
                    />
                    <CompaniesManagement />
                  </>
                } />
                <Route path="employees" element={
                  <>
                    <SEOHead 
                      title="Gestión de Empleados - TaskControl"
                      description="Gestiona empleados, roles y capacidades del equipo. Asigna permisos y optimiza la distribución de trabajo."
                      keywords="gestión empleados, roles, capacidades, permisos, TaskControl"
                    />
                    <EmployeesManagement />
                  </>
                } />
                <Route path="statistics" element={
                  <>
                    <SEOHead 
                      title="Estadísticas de Empresa - TaskControl"
                      description="Visualiza métricas de productividad, estadísticas de tareas y reportes de rendimiento empresarial."
                      keywords="estadísticas, métricas, productividad, reportes, TaskControl"
                    />
                    <CompanyStatistics />
                  </>
                } />
                <Route path="my-company" element={
                  <>
                    <SEOHead 
                      title="Mi Empresa - TaskControl"
                      description="Información y configuración de tu empresa en TaskControl. Actualiza datos y preferencias organizacionales."
                      keywords="mi empresa, configuración empresa, información, TaskControl"
                    />
                    <MyCompany />
                  </>
                } />
                <Route path="tasks" element={
                  <>
                    <SEOHead 
                      title="Gestión de Tareas - TaskControl"
                      description="Administra tareas empresariales, asigna trabajo y monitorea el progreso del equipo en tiempo real."
                      keywords="gestión tareas, asignación trabajo, progreso equipo, TaskControl"
                    />
                    <TasksManagement />
                  </>
                } />
                <Route path="tasks/:id" element={
                  <>
                    <SEOHead 
                      title="Detalle de Tarea - TaskControl"
                      description="Información detallada de la tarea, progreso, asignaciones y comunicación del equipo."
                      keywords="detalle tarea, progreso, asignaciones, TaskControl"
                    />
                    <TaskDetail />
                  </>
                } />
              </Route>

              {/* Página 404 para rutas no encontradas */}
              <Route path="*" element={
                <>
                  <SEOHead {...seoData.notFound} />
                  <NotFound />
                </>
              } />
            </Routes>
          </SignalRProvider>
        </AuthProvider>
      </PerformanceMonitor>
    </ErrorBoundary>
  );
}
