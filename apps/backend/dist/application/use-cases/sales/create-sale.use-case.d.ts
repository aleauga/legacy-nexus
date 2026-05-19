import { CreateSaleDto } from '../../dto/create-sale.dto';
import { ISaleRepository } from '../../../domain/interfaces/sale.repository.interface';
import { ISaleItemRepository } from '../../../domain/interfaces/sale-item.repository.interface';
import { IInventoryRepository } from '../../../domain/interfaces/inventory.repository.interface';
import { IEmailService } from '../../../domain/interfaces/email.service.interface';
import { FinanceService } from '../../../domain/services/finance.service';
export declare class CreateSaleUseCase {
    private readonly saleRepository;
    private readonly saleItemRepository;
    private readonly inventoryRepository;
    private readonly emailService;
    private readonly financeService;
    constructor(saleRepository: ISaleRepository, saleItemRepository: ISaleItemRepository, inventoryRepository: IInventoryRepository, emailService: IEmailService, financeService: FinanceService);
    execute(dto: CreateSaleDto): Promise<{
        sale_id: number;
        total: number;
    }>;
}
