import { IRefundRepository } from '../../../domain/interfaces/refund.repository.interface';
export declare class GetRefundsByUserUseCase {
    private readonly refundRepository;
    constructor(refundRepository: IRefundRepository);
    execute(userId: number): Promise<unknown[]>;
}
