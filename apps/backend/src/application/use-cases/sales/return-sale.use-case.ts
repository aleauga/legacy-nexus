import { Injectable, Inject } from '@nestjs/common';
import { ISaleRepository } from '../../../domain/interfaces/sale.repository.interface';
import { IInventoryRepository } from '../../../domain/interfaces/inventory.repository.interface';

@Injectable()
export class ReturnSaleUseCase {
  constructor(
    @Inject('ISaleRepository') private readonly saleRepository: ISaleRepository,
    @Inject('IInventoryRepository') private readonly inventoryRepository: IInventoryRepository,
  ) {}

  async execute(saleId: number, itemsToReturn: Array<{ product_id: number; qty: number }>): Promise<{ sale_id: number; returned_items: number }> {
    await this.saleRepository.updateLastTouchAt(saleId, new Date());

    for (const item of itemsToReturn) {
      await this.inventoryRepository.incrementStock(item.product_id, 1, item.qty);
    }

    return { sale_id: saleId, returned_items: itemsToReturn.length };
  }
}
