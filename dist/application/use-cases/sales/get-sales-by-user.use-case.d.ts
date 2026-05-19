import { ISaleRepository } from '../../../domain/interfaces/sale.repository.interface';
export declare class GetSalesByUserUseCase {
    private readonly saleRepository;
    constructor(saleRepository: ISaleRepository);
    execute(userId: number): Promise<unknown[]>;
}
