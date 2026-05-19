import { CreateSaleUseCase } from '../../application/use-cases/sales/create-sale.use-case';
import { ReturnSaleUseCase } from '../../application/use-cases/sales/return-sale.use-case';
import { GetSalesByUserUseCase } from '../../application/use-cases/sales/get-sales-by-user.use-case';
import { CreateSaleDto } from '../../application/dto/create-sale.dto';
export declare class SalesController {
    private readonly createSaleUseCase;
    private readonly returnSaleUseCase;
    private readonly getSalesByUserUseCase;
    constructor(createSaleUseCase: CreateSaleUseCase, returnSaleUseCase: ReturnSaleUseCase, getSalesByUserUseCase: GetSalesByUserUseCase);
    createSale(dto: CreateSaleDto): Promise<{
        sale_id: number;
        total: number;
    }>;
    returnSale(sid: string, body: {
        items: Array<{
            product_id: number;
            qty: number;
        }>;
    }): Promise<{
        sale_id: number;
        returned_items: number;
    }>;
    getSalesByUser(uid: string): Promise<unknown[]>;
}
