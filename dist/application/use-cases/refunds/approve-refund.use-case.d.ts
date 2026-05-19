import { IRefundRepository } from '../../../domain/interfaces/refund.repository.interface';
export declare class ApproveRefundUseCase {
    private readonly refundRepository;
    constructor(refundRepository: IRefundRepository);
    execute(refundId: number): Promise<{
        refund_id: number;
        status: string;
    }>;
}
