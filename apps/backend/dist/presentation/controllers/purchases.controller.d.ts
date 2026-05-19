import { CreatePurchaseUseCase } from '../../application/use-cases/purchases/create-purchase.use-case';
import { ReconcilePurchaseUseCase } from '../../application/use-cases/purchases/reconcile-purchase.use-case';
import { ListPurchasesUseCase } from '../../application/use-cases/purchases/list-purchases.use-case';
import { CreatePurchaseDto } from '../../application/dto/create-purchase.dto';
export declare class PurchasesController {
    private readonly createPurchaseUseCase;
    private readonly reconcilePurchaseUseCase;
    private readonly listPurchasesUseCase;
    constructor(createPurchaseUseCase: CreatePurchaseUseCase, reconcilePurchaseUseCase: ReconcilePurchaseUseCase, listPurchasesUseCase: ListPurchasesUseCase);
    createPurchase(dto: CreatePurchaseDto): Promise<{
        purchase_id: number;
        supplier_name: string;
    }>;
    reconcilePurchase(pid: string, body: {
        bank_ref: string;
    }): Promise<{
        purchase_id: number;
        bank_ref: string;
    }>;
    listPurchases(limit?: string): Promise<(import("../../domain/interfaces/purchase.repository.interface").Purchase & {
        supplier_name: string;
    })[]>;
}
