import { ISaleRepository } from '../../../domain/interfaces/sale.repository.interface';
import { IPurchaseRepository } from '../../../domain/interfaces/purchase.repository.interface';
export declare class TotalsReportUseCase {
    private readonly saleRepository;
    private readonly purchaseRepository;
    constructor(saleRepository: ISaleRepository, purchaseRepository: IPurchaseRepository);
    execute(): Promise<{
        sales_total: number;
        purchases_total: number;
    }>;
}
