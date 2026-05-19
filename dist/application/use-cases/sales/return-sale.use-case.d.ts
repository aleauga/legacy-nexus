import { ISaleRepository } from '../../../domain/interfaces/sale.repository.interface';
import { IInventoryRepository } from '../../../domain/interfaces/inventory.repository.interface';
export declare class ReturnSaleUseCase {
    private readonly saleRepository;
    private readonly inventoryRepository;
    constructor(saleRepository: ISaleRepository, inventoryRepository: IInventoryRepository);
    execute(saleId: number, itemsToReturn: Array<{
        product_id: number;
        qty: number;
    }>): Promise<{
        sale_id: number;
        returned_items: number;
    }>;
}
