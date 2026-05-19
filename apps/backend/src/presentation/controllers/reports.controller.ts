import { Controller, Get, Query } from '@nestjs/common';
import { MonthlyReportUseCase } from '../../application/use-cases/reports/monthly-report.use-case';
import { TotalsReportUseCase } from '../../application/use-cases/reports/totals-report.use-case';
import { DetailedSaleRow } from '../../domain/interfaces/sale.repository.interface';

@Controller('api')
export class ReportsController {
  constructor(
    private readonly monthlyReportUseCase: MonthlyReportUseCase,
    private readonly totalsReportUseCase: TotalsReportUseCase,
  ) {}

  @Get('reports/monthly')
  async monthlyReport(@Query('year') year: string, @Query('month') month: string) {
    return this.monthlyReportUseCase.execute(Number(year), Number(month));
  }

  @Get('reports/totals')
  async totalsReport() {
    return this.totalsReportUseCase.execute();
  }

  @Get('reports/total')
  async totalReport(@Query('year') year: string, @Query('month') month: string) {
    const rows = await this.monthlyReportUseCase.execute(Number(year), Number(month));
    const total = rows.reduce((sum: number, row: DetailedSaleRow) => sum + row.line_after_discount, 0);
    return { total };
  }
}
