import { IPurchaseRepository } from '../../../domain/interfaces/purchase.repository.interface';
export declare class ReconcilePurchaseUseCase {
    private readonly purchaseRepository;
    constructor(purchaseRepository: IPurchaseRepository);
    execute(purchaseId: number, bankRef: string): Promise<{
        purchase_id: number;
        bank_ref: string;
    }>;
}
