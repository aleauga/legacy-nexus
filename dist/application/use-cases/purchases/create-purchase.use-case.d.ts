import { CreatePurchaseDto } from '../../dto/create-purchase.dto';
import { IPurchaseRepository } from '../../../domain/interfaces/purchase.repository.interface';
import { IPurchaseItemRepository } from '../../../domain/interfaces/purchase-item.repository.interface';
import { IInventoryRepository } from '../../../domain/interfaces/inventory.repository.interface';
import { ISupplierRepository } from '../../../domain/interfaces/supplier.repository.interface';
export declare class CreatePurchaseUseCase {
    private readonly purchaseRepository;
    private readonly purchaseItemRepository;
    private readonly inventoryRepository;
    private readonly supplierRepository;
    constructor(purchaseRepository: IPurchaseRepository, purchaseItemRepository: IPurchaseItemRepository, inventoryRepository: IInventoryRepository, supplierRepository: ISupplierRepository);
    execute(dto: CreatePurchaseDto): Promise<{
        purchase_id: number;
        supplier_name: string;
    }>;
    private _calcPurchaseTotal;
}
