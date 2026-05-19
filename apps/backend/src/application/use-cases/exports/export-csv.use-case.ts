import { Injectable, Inject } from '@nestjs/common';
import { ISaleRepository, Sale } from '../../../domain/interfaces/sale.repository.interface';

@Injectable()
export class ExportCsvUseCase {
  constructor(@Inject('ISaleRepository') private readonly saleRepository: ISaleRepository) {}

  async execute(startDate?: string, endDate?: string): Promise<string> {
    const sales = await this.saleRepository.findAll();
    
    let filtered = sales;
    
    if (startDate && endDate) {
      filtered = sales.filter((sale: Sale) => {
        const date = new Date(sale.created_at);
        return date >= new Date(startDate) && date <= new Date(endDate);
      });
    }

    const headers = 'id,user_id,customer_type,subtotal,total,status,created_at';
    const rows = filtered.map((sale: Sale) => 
      `${sale.id},${sale.user_id},${sale.customer_type},${sale.subtotal},${sale.total},${sale.status},${sale.created_at}`
    );

    return [headers, ...rows].join('\n');
  }
}
