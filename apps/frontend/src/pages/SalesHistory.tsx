import { useState, useEffect } from 'react';
import { salesApi, Sale } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { History, RotateCcw } from 'lucide-react';

export default function SalesHistory() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadSales();
  }, [user]);

  const loadSales = async () => {
    try {
      setIsLoading(true);
      const data = await salesApi.getByUser(user?.id || 1);
      setSales(data);
    } catch (error) {
      console.error('Error loading sales:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturn = async (saleId: number) => {
    if (!confirm('¿Estás seguro de devolver esta venta?')) return;
    try {
      await salesApi.returnSale(saleId, []);
      alert('Venta devuelta exitosamente');
      loadSales();
    } catch (error) {
      console.error('Error returning sale:', error);
      alert('Error al devolver venta');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Historial de Ventas</h1>
        <p className="mt-2 text-slate-600">Revisa todas las ventas realizadas</p>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 text-center">
          <History className="w-12 h-12 text-slate-400 mx-auto animate-pulse" aria-hidden="true" />
          <p className="mt-4 text-slate-600">Cargando ventas...</p>
        </div>
      ) : sales.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 text-center">
          <History className="w-12 h-12 text-slate-400 mx-auto" aria-hidden="true" />
          <p className="mt-4 text-slate-600">No hay ventas registradas</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Tabla de historial de ventas">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {sale.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                      ${Number(sale.total).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {sale.status || 'completed'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {new Date(sale.created_at).toLocaleString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleReturn(sale.id)}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                        aria-label={`Devolver venta ${sale.id}`}
                      >
                        <RotateCcw className="w-4 h-4" aria-hidden="true" />
                        Devolver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
