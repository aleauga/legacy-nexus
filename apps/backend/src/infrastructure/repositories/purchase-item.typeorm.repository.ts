import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseItemOrmEntity } from '../database/entities/purchase-item.orm-entity';
import { IPurchaseItemRepository } from '../../domain/interfaces/purchase-item.repository.interface';

@Injectable()
export class PurchaseItemTypeOrmRepository implements IPurchaseItemRepository {
  constructor(
    @InjectRepository(PurchaseItemOrmEntity)
    private readonly repository: Repository<PurchaseItemOrmEntity>,
  ) {}

  async createPurchaseItem(
    purchaseId: number,
    productId: number,
    qty: number,
    unitCost: number,
  ): Promise<number> {
    const entity = this.repository.create({
      purchase_id: purchaseId,
      product_id: productId,
      qty,
      unit_cost: unitCost,
    });
    const saved = await this.repository.save(entity);
    return saved.id;
  }
}
