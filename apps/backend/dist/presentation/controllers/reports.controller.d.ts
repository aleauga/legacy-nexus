import { MonthlyReportUseCase } from '../../application/use-cases/reports/monthly-report.use-case';
import { TotalsReportUseCase } from '../../application/use-cases/reports/totals-report.use-case';
import { DetailedSaleRow } from '../../domain/interfaces/sale.repository.interface';
export declare class ReportsController {
    private readonly monthlyReportUseCase;
    private readonly totalsReportUseCase;
    constructor(monthlyReportUseCase: MonthlyReportUseCase, totalsReportUseCase: TotalsReportUseCase);
    monthlyReport(year: string, month: string): Promise<DetailedSaleRow[]>;
    totalsReport(): Promise<{
        sales_total: number;
        purchases_total: number;
    }>;
    totalReport(year: string, month: string): Promise<{
        total: number;
    }>;
}
