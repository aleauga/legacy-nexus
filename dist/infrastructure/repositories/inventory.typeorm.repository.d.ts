import { Repository } from 'typeorm';
import { InventoryStockOrmEntity } from '../database/entities/inventory-stock.orm-entity';
import { ProductOrmEntity } from '../database/entities/product.orm-entity';
import { IInventoryRepository, WarehouseStock } from '../../domain/interfaces/inventory.repository.interface';
export declare class InventoryTypeOrmRepository implements IInventoryRepository {
    private readonly repository;
    private readonly productRepository;
    constructor(repository: Repository<InventoryStockOrmEntity>, productRepository: Repository<ProductOrmEntity>);
    getStock(productId: number, warehouseId?: number): Promise<number>;
    decrementStock(productId: number, warehouseId: number, qty: number): Promise<void>;
    incrementStock(productId: number, warehouseId: number, qty: number): Promise<void>;
    getProductPrice(productId: number): Promise<number>;
    filterByWarehouse(warehouse: string): Promise<WarehouseStock[]>;
}
