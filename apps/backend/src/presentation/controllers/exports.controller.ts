import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExportCsvUseCase } from '../../application/use-cases/exports/export-csv.use-case';
import { ExportPivotUseCase } from '../../application/use-cases/exports/export-pivot.use-case';
import { Inject } from '@nestjs/common';
import { ISaleRepository, Sale } from '../../domain/interfaces/sale.repository.interface';

@Controller('api')
export class ExportsController {
  constructor(
    private readonly exportCsvUseCase: ExportCsvUseCase,
    private readonly exportPivotUseCase: ExportPivotUseCase,
    @Inject('ISaleRepository') private readonly saleRepository: ISaleRepository,
  ) {}

  @Get('exports/csv')
  async exportCsv(@Query('start') start: string, @Query('end') end: string, @Query('filter') _filter: string, @Query('is_admin') _isAdmin: string, @Res() res: Response) {
    const csv = await this.exportCsvUseCase.execute(start, end);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=sales.csv');
    res.send(csv);
  }

  @Get('exports/pivot')
  async exportPivot(@Query('year') year: string, @Query('a') a: string, @Query('b') b: string, @Res() res: Response) {
    const pivot = await this.exportPivotUseCase.execute(parseInt(year), a, b);
    res.setHeader('Content-Type', 'application/json');
    res.json(pivot);
  }

  @Get('exports/totals')
  async getTotals(@Query('year') year: string, @Query('customer_type') customerType: string, @Res() res: Response) {
    const sales = await this.saleRepository.findAll();
    
    let filtered = sales;
    if (customerType) {
      filtered = sales.filter((s: Sale) => s.customer_type === customerType);
    }
    
    const total = filtered.reduce((sum: number, s: Sale) => sum + parseFloat(s.total), 0);
    
    res.setHeader('Content-Type', 'application/json');
    res.json({
      year,
      customer_type: customerType || 'all',
      total_sales: filtered.length,
      total_amount: total,
    });
  }
}
