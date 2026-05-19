import { useState, useEffect } from 'react';
import { inventoryApi, InventoryItem } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Edit, Trash2, Package } from 'lucide-react';

export default function Inventory() {
  const [products, setProducts] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<InventoryItem | null>(null);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    warehouse: '',
    quantity: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await inventoryApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Inventory is read-only from the API, just reload
    setShowForm(false);
    setEditingProduct(null);
    setFormData({ sku: '', name: '', warehouse: '', quantity: '' });
    loadProducts();
  };

  const handleEdit = (product: InventoryItem) => {
    setEditingProduct(product);
    setFormData({
      sku: product.sku,
      name: product.name,
      warehouse: product.warehouse.toString(),
      quantity: product.quantity.toString(),
    });
    setShowForm(true);
  };

  const handleDelete = async (productId: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      await inventoryApi.delete(productId);
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar producto');
    }
  };

  if (!user?.is_admin) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 text-center">
        <Package className="w-12 h-12 text-slate-400 mx-auto" aria-hidden="true" />
        <p className="mt-4 text-slate-600">Acceso denegado. Solo administradores pueden gestionar el inventario.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Inventario</h1>
          <p className="mt-2 text-slate-600">Gestiona los productos del sistema</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingProduct(null);
            setFormData({ sku: '', name: '', warehouse: '', quantity: '' });
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors"
        >
          <Plus className="w-5 h-5" aria-hidden="true" />
          Nuevo Producto
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulario de producto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-slate-700 mb-1">
                  SKU
                </label>
                <input
                  id="sku"
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Producto
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="warehouse" className="block text-sm font-medium text-slate-700 mb-1">
                  Bodega
                </label>
                <input
                  id="warehouse"
                  type="number"
                  value={formData.warehouse}
                  onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 mb-1">
                  Cantidad
                </label>
                <input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
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
                {editingProduct ? 'Actualizar' : 'Crear'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                  setFormData({ sku: '', name: '', warehouse: '', quantity: '' });
                }}
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
          <Package className="w-12 h-12 text-slate-400 mx-auto animate-pulse" aria-hidden="true" />
          <p className="mt-4 text-slate-600">Cargando inventario...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 text-center">
          <Package className="w-12 h-12 text-slate-400 mx-auto" aria-hidden="true" />
          <p className="mt-4 text-slate-600">No hay productos en el inventario</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Tabla de inventario">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Bodega
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {products.map((product, index) => (
                  <tr key={product.product_id || index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {product.warehouse}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                          aria-label={`Editar ${product.name}`}
                        >
                          <Edit className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.product_id)}
                          className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
                          aria-label={`Eliminar ${product.name}`}
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
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
