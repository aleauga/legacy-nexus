import { useState, useEffect } from 'react';
import { purchasesApi, suppliersApi, Purchase } from '../services/api';
import { ShoppingCart, Plus } from 'lucide-react';

export default function Purchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [suppliers, setSuppliers] = useState<Array<{ id: number; name: string }>>([]);

  const [formData, setFormData] = useState({
    supplier_id: '',
    received_date: '',
    product_id: '',
    qty: '',
    unit_cost: '',
    warehouse_id: '1',
  });

  useEffect(() => {
    loadPurchases();
  }, []);

  useEffect(() => {
    if (showForm) {
      loadSuppliers();
    }
  }, [showForm]);

  const loadSuppliers = async () => {
    try {
      const data = await suppliersApi.getAll();
      setSuppliers(data);
    } catch (error) {
      console.error('Error loading suppliers:', error);
    }
  };

  const loadPurchases = async () => {
    try {
      setIsLoading(true);
      const data = await purchasesApi.getAll();
      setPurchases(data);
    } catch (error) {
      console.error('Error loading purchases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await purchasesApi.create({
        supplier_id: parseInt(formData.supplier_id),
        received_date: formData.received_date,
        items: [{
          product_id: parseInt(formData.product_id),
          qty: parseInt(formData.qty),
          unit_cost: parseFloat(formData.unit_cost),
          warehouse_id: parseInt(formData.warehouse_id),
        }],
      });
      alert('Compra registrada exitosamente');
      setShowForm(false);
      setFormData({
        supplier_id: '',
        received_date: '',
        product_id: '',
        qty: '',
        unit_cost: '',
        warehouse_id: '1',
      });
      loadPurchases();
    } catch (error) {
      console.error('Error creating purchase:', error);
      alert('Error al registrar compra');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Compras</h1>
          <p className="mt-2 text-slate-600">Historial de compras realizadas</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors"
        >
          <Plus className="w-5 h-5" aria-hidden="true" />
          Nueva Compra
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Registrar Nueva Compra</h2>
          <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulario de compra">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="supplier_id" className="block text-sm font-medium text-slate-700 mb-1">
                  Proveedor
                </label>
                <select
                  id="supplier_id"
                  value={formData.supplier_id}
                  onChange={(e) => setFormData({ ...formData, supplier_id: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccionar proveedor</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="received_date" className="block text-sm font-medium text-slate-700 mb-1">
                  Fecha de Recepción
                </label>
                <input
                  id="received_date"
                  type="date"
                  value={formData.received_date}
                  onChange={(e) => setFormData({ ...formData, received_date: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="product_id" className="block text-sm font-medium text-slate-700 mb-1">
                  ID de Producto
                </label>
                <input
                  id="product_id"
                  type="number"
                  value={formData.product_id}
                  onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="qty" className="block text-sm font-medium text-slate-700 mb-1">
                  Cantidad
                </label>
                <input
                  id="qty"
                  type="number"
                  value={formData.qty}
                  onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="unit_cost" className="block text-sm font-medium text-slate-700 mb-1">
                  Costo Unitario
                </label>
                <input
                  id="unit_cost"
                  type="number"
                  step="0.01"
                  value={formData.unit_cost}
                  onChange={(e) => setFormData({ ...formData, unit_cost: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="warehouse_id" className="block text-sm font-medium text-slate-700 mb-1">
                  ID de Bodega
                </label>
                <input
                  id="warehouse_id"
                  type="number"
                  value={formData.warehouse_id}
                  onChange={(e) => setFormData({ ...formData, warehouse_id: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Registrar
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 text-center">
          <ShoppingCart className="w-12 h-12 text-slate-400 mx-auto animate-pulse" aria-hidden="true" />
          <p className="mt-4 text-slate-600">Cargando compras...</p>
        </div>
      ) : purchases.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 text-center">
          <ShoppingCart className="w-12 h-12 text-slate-400 mx-auto" aria-hidden="true" />
          <p className="mt-4 text-slate-600">No hay compras registradas</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Tabla de compras">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Proveedor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Recibida
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Ref. bancaria
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {purchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {purchase.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {purchase.supplier_name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                      ${Number(purchase.total).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {new Date(purchase.received_date).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {purchase.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {purchase.bank_ref || '-'}
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
