import { ISaleRepository } from '../../../domain/interfaces/sale.repository.interface';
import { IProductRepository } from '../../../domain/interfaces/product.repository.interface';
interface PivotRow {
    dim_a: string | number;
    dim_b: string | number;
    n_sales: number;
    gross: number;
    effective: number;
    after_volume: number;
}
interface PivotResult {
    data: PivotRow[];
    summary: {
        total_gross: number;
        filas: number;
    };
}
export declare class ExportPivotUseCase {
    private readonly saleRepository;
    private readonly productRepository;
    constructor(saleRepository: ISaleRepository, productRepository: IProductRepository);
    execute(_year: number, dimensionA: string, dimensionB: string): Promise<PivotResult>;
}
export {};
