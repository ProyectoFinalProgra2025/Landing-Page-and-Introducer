import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas con layout de landing */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Home />
            </main>
            <Footer />
          </div>
        } />

        {/* Rutas de autenticación sin navbar/footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas del dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="companies" element={<CompaniesManagement />} />
          <Route path="employees" element={<EmployeesManagement />} />
          <Route path="statistics" element={<CompanyStatistics />} />
          <Route path="my-company" element={<MyCompany />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
