import { Injectable, Inject } from '@nestjs/common';
import { ISaleRepository, DetailedSaleRow } from '../../../domain/interfaces/sale.repository.interface';

@Injectable()
export class MonthlyReportUseCase {
  constructor(@Inject('ISaleRepository') private readonly saleRepository: ISaleRepository) {}

  async execute(year: number, month: number): Promise<DetailedSaleRow[]> {
    return this.saleRepository.findDetailedByMonth(year, month);
  }
}
