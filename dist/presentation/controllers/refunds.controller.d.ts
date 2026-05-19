import { CreateRefundUseCase } from '../../application/use-cases/refunds/create-refund.use-case';
import { ApproveRefundUseCase } from '../../application/use-cases/refunds/approve-refund.use-case';
import { GetRefundsByUserUseCase } from '../../application/use-cases/refunds/get-refunds-by-user.use-case';
import { SearchRefundsUseCase } from '../../application/use-cases/refunds/search-refunds.use-case';
import { CreateRefundDto } from '../../application/dto/create-refund.dto';
export declare class RefundsController {
    private readonly createRefundUseCase;
    private readonly approveRefundUseCase;
    private readonly getRefundsByUserUseCase;
    private readonly searchRefundsUseCase;
    constructor(createRefundUseCase: CreateRefundUseCase, approveRefundUseCase: ApproveRefundUseCase, getRefundsByUserUseCase: GetRefundsByUserUseCase, searchRefundsUseCase: SearchRefundsUseCase);
    createRefund(dto: CreateRefundDto): Promise<{
        refund_id: number;
        status: string;
    }>;
    approveRefund(rid: string): Promise<{
        refund_id: number;
        status: string;
    }>;
    getRefundsByUser(userId: string): Promise<unknown[]>;
    searchRefunds(query: string): Promise<unknown[]>;
}
