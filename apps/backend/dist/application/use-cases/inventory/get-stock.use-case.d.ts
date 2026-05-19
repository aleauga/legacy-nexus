import { IInventoryRepository } from '../../../domain/interfaces/inventory.repository.interface';
export declare class GetStockUseCase {
    private readonly inventoryRepository;
    constructor(inventoryRepository: IInventoryRepository);
    execute(productId: number, warehouseId?: number): Promise<number>;
}
