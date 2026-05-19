import { CreateRefundDto } from '../../dto/create-refund.dto';
import { IRefundRepository } from '../../../domain/interfaces/refund.repository.interface';
import { ISaleRepository } from '../../../domain/interfaces/sale.repository.interface';
export declare class CreateRefundUseCase {
    private readonly refundRepository;
    private readonly saleRepository;
    constructor(refundRepository: IRefundRepository, saleRepository: ISaleRepository);
    execute(dto: CreateRefundDto): Promise<{
        refund_id: number;
        status: string;
    }>;
}
