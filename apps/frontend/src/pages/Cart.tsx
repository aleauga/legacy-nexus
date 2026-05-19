import { useState, useEffect } from 'react';
import { cartApi, CartItem, Product, catalogApi } from '../services/api';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from 'lucide-react';

interface CartItemWithProduct extends CartItem {
  product?: Product;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setIsLoading(true);
      const items = await cartApi.get();
      // Fetch product details for each cart item
      const itemsWithProducts = await Promise.all(
        items.map(async (item) => {
          try {
            const products = await catalogApi.getAll();
            const product = products.find(p => p.id === item.product_id);
            return { ...item, product };
          } catch {
            return item;
          }
        })
      );
      setCartItems(itemsWithProducts);
      calculateTotal(itemsWithProducts);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = (items: CartItemWithProduct[]) => {
    const sum = items.reduce((acc, item) => {
      return acc + (item.product?.price || 0) * item.quantity;
    }, 0);
    const ivaAmount = sum * 0.16;
    const totalAmount = sum + ivaAmount;
    setSubtotal(sum);
    setIva(ivaAmount);
    setTotal(totalAmount);
  };

  const addItem = async () => {
    if (!productId || quantity <= 0) {
      alert('Por favor ingresa un ID de producto válido y una cantidad');
      return;
    }
    try {
      await cartApi.add(parseInt(productId), quantity);
      setProductId('');
      setQuantity(1);
      loadCart();
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error al agregar producto al carrito');
    }
  };

  const updateQuantity = async (productId: number, delta: number) => {
    try {
      const item = cartItems.find((i) => i.product_id === productId);
      if (!item) return;

      const newQuantity = item.quantity + delta;
      if (newQuantity <= 0) {
        await cartApi.remove(productId);
      } else {
        await cartApi.add(productId, newQuantity);
      }
      loadCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Error al actualizar cantidad');
    }
  };

  const removeItem = async (productId: number) => {
    try {
      await cartApi.remove(productId);
      loadCart();
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Error al eliminar item');
    }
  };

  const clearCart = async () => {
    try {
      await cartApi.clear();
      loadCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Error al limpiar carrito');
    }
  };

  const checkout = async () => {
    try {
      await cartApi.checkout();
      alert('¡Compra realizada con éxito!');
      loadCart();
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Error al procesar la compra');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Carrito de Compras</h1>
        <p className="mt-2 text-slate-600">Gestiona tus productos antes de finalizar la compra</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Agregar Producto</h2>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label htmlFor="productId" className="block text-sm font-medium text-slate-700 mb-1">
              ID de Producto
            </label>
            <input
              id="productId"
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Product ID"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="w-32">
            <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 mb-1">
              Cantidad
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              min="1"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={addItem}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors"
          >
            Agregar
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 text-center">
          <ShoppingCart className="w-12 h-12 text-slate-400 mx-auto animate-pulse" aria-hidden="true" />
          <p className="mt-4 text-slate-600">Cargando carrito...</p>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 text-center">
          <ShoppingCart className="w-12 h-12 text-slate-400 mx-auto" aria-hidden="true" />
          <p className="mt-4 text-slate-600">Tu carrito está vacío</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full" aria-label="Tabla de items del carrito">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Precio unitario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Cantidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Subtotal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {cartItems.map((item) => (
                    <tr key={item.product_id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {item.product?.name || `Producto ${item.product_id}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                        ${item.product?.price.toFixed(2) || '0.00'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product_id, -1)}
                            className="p-1 rounded bg-slate-200 hover:bg-slate-300 transition-colors"
                            aria-label={`Reducir cantidad de ${item.product?.name}`}
                          >
                            <Minus className="w-4 h-4" aria-hidden="true" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product_id, 1)}
                            className="p-1 rounded bg-slate-200 hover:bg-slate-300 transition-colors"
                            aria-label={`Aumentar cantidad de ${item.product?.name}`}
                          >
                            <Plus className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => removeItem(item.product_id)}
                          className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
                          aria-label={`Eliminar ${item.product?.name} del carrito`}
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <p className="text-lg text-slate-600">Subtotal:</p>
                <p className="text-xl font-semibold text-slate-900">${subtotal.toFixed(4)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg text-slate-600">IVA (16%):</p>
                <p className="text-xl font-semibold text-slate-900">${iva.toFixed(4)}</p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                <p className="text-lg text-slate-800 font-semibold">Total:</p>
                <p className="text-3xl font-bold text-slate-900">${total.toFixed(4)}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Limpiar
              </button>
              <button
                onClick={checkout}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-colors"
              >
                <CreditCard className="w-5 h-5" aria-hidden="true" />
                Procesar Compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
