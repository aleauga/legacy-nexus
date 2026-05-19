import { FinanceService } from '../domain/services/finance.service';
import { IvaHook } from '../domain/hooks/iva.hook';
export declare class AppModule {
    private readonly financeService;
    private readonly ivaHook;
    constructor(financeService: FinanceService, ivaHook: IvaHook);
}
