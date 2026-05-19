import { Injectable, Inject } from '@nestjs/common';
import { ISaleRepository, Sale } from '../../../domain/interfaces/sale.repository.interface';
import { IPurchaseRepository, Purchase } from '../../../domain/interfaces/purchase.repository.interface';

@Injectable()
export class TotalsReportUseCase {
  constructor(
    @Inject('ISaleRepository') private readonly saleRepository: ISaleRepository,
    @Inject('IPurchaseRepository') private readonly purchaseRepository: IPurchaseRepository,
  ) {}

  async execute(): Promise<{ sales_total: number; purchases_total: number }> {
    const sales = await this.saleRepository.findAll();
    const purchases = await this.purchaseRepository.findAllWithoutLimit();

    const salesTotal = sales.reduce((sum: number, sale: Sale) => sum + parseFloat(sale.total || '0'), 0);
    const purchasesTotal = purchases.reduce((sum: number, purchase: Purchase) => sum + purchase.total, 0);

    return { sales_total: salesTotal, purchases_total: purchasesTotal };
  }
}
