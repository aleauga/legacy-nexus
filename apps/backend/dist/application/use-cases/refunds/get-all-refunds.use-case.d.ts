import { IRefundRepository } from '../../../domain/interfaces/refund.repository.interface';
export declare class GetAllRefundsUseCase {
    private readonly refundRepository;
    constructor(refundRepository: IRefundRepository);
    execute(): Promise<unknown[]>;
}
