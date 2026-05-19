import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, BarChart3, Bell, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const quickActions = [
    {
      name: 'Ver Catálogo',
      description: 'Explora todos los productos disponibles',
      href: '/catalog',
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      name: 'Gestionar Carrito',
      description: 'Revisa y gestiona tus compras',
      href: '/cart',
      icon: ShoppingCart,
      color: 'bg-green-500',
    },
    {
      name: 'Ver Reportes',
      description: 'Analiza ventas y rendimiento',
      href: '/reports',
      icon: BarChart3,
      color: 'bg-purple-500',
    },
    {
      name: 'Notificaciones',
      description: 'Revisa alertas y actualizaciones',
      href: '/notifications',
      icon: Bell,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Bienvenido, {user?.username}
          {user?.is_admin && ' (admin)'}
        </h1>
        <p className="mt-2 text-slate-600">
          Aquí tienes un resumen rápido y accesos directos a los módulos principales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.name}
              to={action.href}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 p-6 border border-slate-200 hover:border-blue-300"
            >
              <div className="flex items-start gap-4">
                <div className={`${action.color} p-3 rounded-lg text-white`}>
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {action.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{action.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Información del Sistema</h2>
        <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <dt className="text-sm font-medium text-slate-600">Usuario</dt>
            <dd className="mt-1 text-lg font-semibold text-slate-800">{user?.username}</dd>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <dt className="text-sm font-medium text-slate-600">Rol</dt>
            <dd className="mt-1 text-lg font-semibold text-slate-800">
              {user?.is_admin ? 'Administrador' : 'Usuario'}
            </dd>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <dt className="text-sm font-medium text-slate-600">Estado</dt>
            <dd className="mt-1 text-lg font-semibold text-green-600">Activo</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
