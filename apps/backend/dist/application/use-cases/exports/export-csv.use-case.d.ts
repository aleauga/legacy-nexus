import { ISaleRepository } from '../../../domain/interfaces/sale.repository.interface';
export declare class ExportCsvUseCase {
    private readonly saleRepository;
    constructor(saleRepository: ISaleRepository);
    execute(startDate?: string, endDate?: string): Promise<string>;
}
