import { useState, useEffect } from 'react';
import { catalogApi, api, Product } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Search, Trash2, Package } from 'lucide-react';

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await catalogApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadProducts();
      return;
    }
    try {
      setIsLoading(true);
      const data = await catalogApi.search(searchQuery);
      setProducts(data);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      await api.delete(`/api/products/${productId}`);
      alert('Producto eliminado');
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar producto');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Catálogo</h1>
        <p className="mt-2 text-slate-600">Explora y busca productos en el catálogo</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">
              Buscar productos
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Buscar por nombre"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-describedby="search-hint"
              />
            </div>
            <p id="search-hint" className="sr-only">
              Presiona Enter para buscar o usa el botón de búsqueda
            </p>
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors"
          >
            Buscar
          </button>
          <button
            onClick={loadProducts}
            className="bg-slate-600 text-white px-6 py-2 rounded-lg hover:bg-slate-700 focus:ring-4 focus:ring-slate-300 transition-colors"
          >
            Ver todos
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 text-center">
          <Package className="w-12 h-12 text-slate-400 mx-auto animate-pulse" aria-hidden="true" />
          <p className="mt-4 text-slate-600">Cargando productos...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 text-center">
          <Package className="w-12 h-12 text-slate-400 mx-auto" aria-hidden="true" />
          <p className="mt-4 text-slate-600">No se encontraron productos</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Tabla de productos del catálogo">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  {user?.is_admin && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {product.category}
                    </td>
                    {user?.is_admin && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="inline-flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 focus:ring-2 focus:ring-red-300 transition-colors"
                          aria-label={`Eliminar ${product.name}`}
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                          Eliminar
                        </button>
                      </td>
                    )}
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
