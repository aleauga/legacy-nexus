import { IInventoryRepository } from '../../domain/interfaces/inventory.repository.interface';
export declare class InventoryController {
    private readonly inventoryRepository;
    constructor(inventoryRepository: IInventoryRepository);
    getInventoryOverview(): Promise<import("../../domain/interfaces/inventory.repository.interface").WarehouseStock[]>;
    getInventoryByWarehouse(warehouse: string): Promise<import("../../domain/interfaces/inventory.repository.interface").WarehouseStock[]>;
}
