export interface WarehouseStock {
  product_id: number;
  warehouse_id: number;
  quantity: number;
  sku: string;
  name: string;
  warehouse: number;
}

export interface IInventoryRepository {
  getStock(productId: number, warehouseId?: number): Promise<number>;
  decrementStock(productId: number, warehouseId: number, qty: number): Promise<void>;
  incrementStock(productId: number, warehouseId: number, qty: number): Promise<void>;
  getProductPrice(productId: number): Promise<number>;
  filterByWarehouse(warehouse: string): Promise<WarehouseStock[]>;
}
