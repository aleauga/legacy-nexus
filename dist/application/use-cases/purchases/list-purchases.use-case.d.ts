import { IPurchaseRepository, Purchase } from '../../../domain/interfaces/purchase.repository.interface';
import { ISupplierRepository } from '../../../domain/interfaces/supplier.repository.interface';
export declare class ListPurchasesUseCase {
    private readonly purchaseRepository;
    private readonly supplierRepository;
    constructor(purchaseRepository: IPurchaseRepository, supplierRepository: ISupplierRepository);
    execute(limit?: number): Promise<(Purchase & {
        supplier_name: string;
    })[]>;
}
