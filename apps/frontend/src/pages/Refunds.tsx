import { useState, useEffect } from 'react';
import { refundsApi, Refund } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { RotateCcw, Search, Check } from 'lucide-react';

export default function Refunds() {
  const { user } = useAuth();
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSaleId, setSelectedSaleId] = useState('');
  const [reason, setReason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Refund[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const refundsData = user?.is_admin 
        ? await refundsApi.getAll() 
        : await refundsApi.getByUser(user!.user_id);
      setRefunds(refundsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefund = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSaleId || !reason) return;

    try {
      await refundsApi.create(parseInt(selectedSaleId), reason);
      alert('Devolución solicitada con éxito');
      setSelectedSaleId('');
      setReason('');
      loadData();
    } catch (error) {
      console.error('Error processing refund:', error);
      alert('Error al procesar la devolución');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      setIsSearching(true);
      const results = await refundsApi.search(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching refunds:', error);
      alert('Error al buscar devoluciones');
    } finally {
      setIsSearching(false);
    }
  };

  const handleApprove = async (refundId: number) => {
    try {
      await refundsApi.approve(refundId);
      alert('Devolución aprobada con éxito');
      loadData();
    } catch (error) {
      console.error('Error approving refund:', error);
      alert('Error al aprobar la devolución');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    const labels = {
      pending: 'Pendiente',
      approved: 'Aprobada',
      rejected: 'Rechazada',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.pending}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const displayRefunds = searchQuery ? searchResults : refunds;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Devoluciones</h1>
        <p className="mt-2 text-slate-600">Gestiona las devoluciones de productos</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Crear devolución</h2>
        <form onSubmit={handleRefund} className="space-y-4" aria-label="Formulario de devolución">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="saleId" className="block text-sm font-medium text-slate-700 mb-1">
                Sale ID
              </label>
              <input
                id="saleId"
                type="number"
                value={selectedSaleId}
                onChange={(e) => setSelectedSaleId(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Sale ID"
              />
            </div>
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-1">
                Motivo
              </label>
              <input
                id="reason"
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Motivo"
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors"
          >
            Solicitar
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Mis devoluciones</h2>
          <button
            onClick={loadData}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-600 text-white hover:bg-slate-700 focus:ring-4 focus:ring-slate-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Recargar
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <RotateCcw className="w-12 h-12 text-slate-400 mx-auto animate-pulse" aria-hidden="true" />
            <p className="mt-4 text-slate-600">Cargando devoluciones...</p>
          </div>
        ) : displayRefunds.length === 0 ? (
          <div className="text-center py-8">
            <RotateCcw className="w-12 h-12 text-slate-400 mx-auto" aria-hidden="true" />
            <p className="mt-4 text-slate-600">No hay devoluciones registradas</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Tabla de devoluciones">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Sale
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Motivo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    IVA
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {displayRefunds.map((refund) => (
                  <tr key={refund.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      #{refund.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-700">
                      #{refund.sale_id}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700 max-w-xs truncate">
                      {refund.reason}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-700">
                      ${Number(refund.amount).toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-700">
                      ${(Number(refund.amount) * 0.16).toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                      ${(Number(refund.amount) * 1.16).toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {getStatusBadge(refund.status)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-700">
                      {new Date(refund.created_at).toLocaleString('es-ES')}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {user?.is_admin && refund.status === 'pending' && (
                        <button
                          onClick={() => handleApprove(refund.id)}
                          className="flex items-center gap-1 px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                          <Check className="w-4 h-4" aria-hidden="true" />
                          Aprobar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {user?.is_admin && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Buscar devoluciones (admin)</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por motivo"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors disabled:opacity-50"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              Buscar
            </button>
          </div>
          {searchResults.length > 0 && (
            <p className="mt-2 text-sm text-slate-600">{searchResults.length} resultados encontrados</p>
          )}
        </div>
      )}
    </div>
  );
}
