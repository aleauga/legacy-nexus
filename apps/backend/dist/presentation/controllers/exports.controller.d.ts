import { Response } from 'express';
import { ExportCsvUseCase } from '../../application/use-cases/exports/export-csv.use-case';
import { ExportPivotUseCase } from '../../application/use-cases/exports/export-pivot.use-case';
import { ISaleRepository } from '../../domain/interfaces/sale.repository.interface';
export declare class ExportsController {
    private readonly exportCsvUseCase;
    private readonly exportPivotUseCase;
    private readonly saleRepository;
    constructor(exportCsvUseCase: ExportCsvUseCase, exportPivotUseCase: ExportPivotUseCase, saleRepository: ISaleRepository);
    exportCsv(start: string, end: string, _filter: string, _isAdmin: string, res: Response): Promise<void>;
    exportPivot(year: string, a: string, b: string, res: Response): Promise<void>;
    getTotals(year: string, customerType: string, res: Response): Promise<void>;
}
