import { useState, useEffect } from 'react';
import { reportsApi } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3 } from 'lucide-react';

export default function Reports() {
  const { user } = useAuth();
  const [totalSales, setTotalSales] = useState<number | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadTotalSales = async (y: number, m: number) => {
    try {
      setIsLoading(true);
      const data = await reportsApi.getTotal(y, m);
      setTotalSales(data.total);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error loading total sales:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMonthly = async () => {
    try {
      setIsLoading(true);
      const data = await reportsApi.getMonthly(year, month);
      setMonthlyData(data);
    } catch (error) {
      console.error('Error loading monthly report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTotalSales(year, month);
    loadMonthly();
  }, []);

  if (!user?.is_admin) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 text-center">
        <BarChart3 className="w-12 h-12 text-slate-400 mx-auto" aria-hidden="true" />
        <p className="mt-4 text-slate-600">Acceso denegado. Solo administradores pueden ver reportes.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Reportes</h1>
        <p className="mt-2 text-slate-600">Analiza el rendimiento del negocio</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <p className="text-lg">
          Total ventas mes actual: <span className="font-bold text-blue-600">{totalSales !== null ? totalSales.toFixed(2) : '...'}</span>
        </p>
        <p className="text-slate-600">
          Última actualización: <span>{lastUpdate || '...'}</span>
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Detalle del mes</h3>
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Año</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mes</label>
            <input
              type="number"
              min="1"
              max="12"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                loadTotalSales(year, month);
                loadMonthly();
              }}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors disabled:opacity-50"
            >
              Ver mes
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Venta</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Usuario</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tipo cliente</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Producto</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Cant</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Precio</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Subtotal efectivo</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Linea c/desc</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Fecha</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {monthlyData.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">{row.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">{row.username}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">{row.customer_type}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">{row.product_name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">{row.qty}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">{row.unit_price.toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">{row.effective_subtotal.toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">{row.line_after_discount.toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">{row.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-slate-600">{monthlyData.length} registros</p>
      </div>
    </div>
  );
}
