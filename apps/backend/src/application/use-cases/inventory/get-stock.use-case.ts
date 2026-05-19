import { Injectable, Inject } from '@nestjs/common';
import { IInventoryRepository } from '../../../domain/interfaces/inventory.repository.interface';

@Injectable()
export class GetStockUseCase {
  constructor(@Inject('IInventoryRepository') private readonly inventoryRepository: IInventoryRepository) {}

  async execute(productId: number, warehouseId?: number): Promise<number> {
    return this.inventoryRepository.getStock(productId, warehouseId);
  }
}
