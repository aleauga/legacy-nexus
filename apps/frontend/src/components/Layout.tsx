import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Home,
  Package,
  ShoppingCart,
  History,
  ShoppingCart as PurchasesIcon,
  BarChart3,
  Bell,
  RotateCcw,
  Download,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Inicio', href: '/', icon: Home },
  { name: 'Catálogo', href: '/catalog', icon: Package },
  { name: 'Inventario', href: '/inventory', icon: LayoutDashboard },
  { name: 'Carrito', href: '/cart', icon: ShoppingCart },
  { name: 'Ventas', href: '/sales-history', icon: History },
  { name: 'Compras', href: '/purchases', icon: PurchasesIcon },
  { name: 'Reportes', href: '/reports', icon: BarChart3 },
  { name: 'Notificaciones', href: '/notifications', icon: Bell },
  { name: 'Devoluciones', href: '/refunds', icon: RotateCcw },
  { name: 'Exportes', href: '/exports', icon: Download },
];

export default function Layout({ children }: { children?: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 transition-colors"
        aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-slate-800 text-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        aria-label="Navegación principal"
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">Legacy Nexus</h1>
          {user && (
            <p className="mt-2 text-sm text-slate-300">
              Bienvenido, {user.username}
              {user.is_admin && ' (admin)'}
            </p>
          )}
        </div>

        <nav className="mt-6" aria-label="Menú de navegación">
          <ul className="space-y-1 px-3">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            aria-label="Cerrar sesión"
          >
            <LogOut className="w-5 h-5" aria-hidden="true" />
            <span>Salir</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}
