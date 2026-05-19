import { IRefundRepository } from '../../../domain/interfaces/refund.repository.interface';
export declare class SearchRefundsUseCase {
    private readonly refundRepository;
    constructor(refundRepository: IRefundRepository);
    execute(query: string): Promise<unknown[]>;
}
