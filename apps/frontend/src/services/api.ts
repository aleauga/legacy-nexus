const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000';

export interface User {
  user_id: number;
  username: string;
  is_admin: boolean;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  category: string;
  supplier_id: number;
  stock: number;
  deleted_at: Date | null;
}

export interface InventoryItem {
  product_id: number;
  warehouse_id: number;
  quantity: number;
  sku: string;
  name: string;
  warehouse: number;
}

export interface CartItem {
  product_id: number;
  quantity: number;
}

export interface Sale {
  id: number;
  total: number;
  created_at: string;
  status?: string;
  items: Array<{
    product_id: number;
    quantity: number;
    price: number;
  }>;
}

export interface Purchase {
  id: number;
  supplier_id: number;
  total: number;
  received_date: string;
  status: string;
  bank_ref: string | null;
  supplier_name?: string;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.text();
    throw new ApiError(response.status, error || 'Request failed');
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, data: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  delete: <T>(endpoint: string, data?: unknown) =>
    request<T>(endpoint, { method: 'DELETE', body: JSON.stringify(data || {}) }),
  getText: async (endpoint: string) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      const error = await response.text();
      throw new ApiError(response.status, error || 'Request failed');
    }
    return response.text();
  },
};

export const authApi = {
  login: (username: string, password: string) =>
    api.post<User>('/api/login', { username, password }),
};

export const catalogApi = {
  getAll: () => api.get<Product[]>('/api/products'),
  search: (query: string) => api.get<Product[]>(`/api/products/search?q=${query}`),
};

export const cartApi = {
  get: () => api.get<CartItem[]>('/api/cart'),
  add: (productId: number, quantity: number) =>
    api.post('/api/cart', { product_id: productId, quantity }),
  remove: (productId: number) =>
    api.delete(`/api/cart/${productId}`),
  clear: () => api.delete('/api/cart'),
  checkout: () => api.post<{ sale_id: number }>('/api/cart/checkout', {}),
};

export const inventoryApi = {
  getAll: () => api.get<InventoryItem[]>('/api/inventory'),
  create: (product: Omit<Product, 'id'>) =>
    api.post<Product>('/api/inventory', product),
  update: (id: number, product: Partial<Product>) =>
    api.post<Product>(`/api/inventory/${id}`, product),
  delete: (id: number) => api.delete(`/api/inventory/${id}`),
};

export const salesApi = {
  getAll: () => api.get<Sale[]>('/api/sales'),
  getByUser: (userId: number) => api.get<Sale[]>(`/api/sales/by-user/${userId}`),
  returnSale: (saleId: number, items: Array<{ product_id: number; qty: number }>) =>
    api.post(`/api/sales/${saleId}/return`, { items }),
};

export const purchasesApi = {
  getAll: () => api.get<Purchase[]>('/api/purchases'),
  create: (data: { supplier_id: number; received_date: string; items: Array<{ product_id: number; qty: number; unit_cost: number; warehouse_id: number }> }) =>
    api.post<Purchase>('/api/purchases', data),
};

export const suppliersApi = {
  getAll: () => api.get<Array<{ id: number; name: string }>>('/api/suppliers'),
};

export const reportsApi = {
  getTotal: (year: number, month: number) => api.get<{ total: number }>(`/api/reports/total?year=${year}&month=${month}`),
  getMonthly: (year: number, month: number) => api.get<any[]>(`/api/reports/monthly?year=${year}&month=${month}`),
  getSales: () => api.getText('/api/reports/sales'),
  getInventory: () => api.getText('/api/reports/inventory'),
};

export interface Notification {
  id: number;
  user_id: number;
  message: string;
  kind: string;
  status: string;
  created_at: string;
}

export const notificationsApi = {
  getByUser: (userId: number) => api.get<Notification[]>(`/api/notifications/${userId}`),
  send: (userId: number, subject: string, message: string, kind: string) =>
    api.post('/api/notifications', { user_id: userId, subject, message, kind }),
  markAsRead: (id: number) => api.post(`/api/notifications/${id}/read`, {}),
  delete: (id: number) => api.delete(`/api/notifications/${id}`),
  broadcast: (subject: string, message: string, userIds?: number[]) =>
    api.post('/api/notifications/broadcast', { subject, message, userIds }),
};

export interface Refund {
  id: number;
  sale_id: number;
  user_id: number;
  amount: number;
  tax: number;
  total: number;
  reason: string;
  status: string;
  approved_by: number | null;
  created_at: string;
}

export const refundsApi = {
  getAll: () => api.get<Refund[]>('/api/refunds'),
  getByUser: (userId: number) => api.get<Refund[]>(`/api/refunds/by-user/${userId}`),
  search: (query: string) => api.get<Refund[]>(`/api/refunds/search?q=${query}`),
  create: (saleId: number, reason: string) =>
    api.post('/api/refunds', { sale_id: saleId, reason }),
  approve: (refundId: number) =>
    api.post(`/api/refunds/${refundId}/approve`, {}),
};

export const exportsApi = {
  getSalesCSV: () => api.getText('/api/exports/sales'),
  getInventoryCSV: () => api.getText('/api/exports/inventory'),
  getPivot: (year: number, dimA: string, dimB: string) =>
    api.get<any>(`/api/exports/pivot?year=${year}&a=${dimA}&b=${dimB}`),
  getTotals: (year: number, customerType?: string) => {
    const query = customerType 
      ? `/api/exports/totals?year=${year}&customer_type=${customerType}`
      : `/api/exports/totals?year=${year}`;
    return api.get<any>(query);
  },
  downloadCsv: (filter?: string) => {
    const query = filter 
      ? `/api/exports/csv?filter=${encodeURIComponent(filter)}&is_admin=true`
      : `/api/exports/csv?is_admin=true`;
    return api.getText(query);
  },
};
