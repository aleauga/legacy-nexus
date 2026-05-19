import { ISaleRepository, DetailedSaleRow } from '../../../domain/interfaces/sale.repository.interface';
export declare class MonthlyReportUseCase {
    private readonly saleRepository;
    constructor(saleRepository: ISaleRepository);
    execute(year: number, month: number): Promise<DetailedSaleRow[]>;
}
