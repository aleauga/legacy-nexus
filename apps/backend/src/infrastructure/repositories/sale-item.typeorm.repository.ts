import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleItemOrmEntity } from '../database/entities/sale-item.orm-entity';
import { ISaleItemRepository } from '../../domain/interfaces/sale-item.repository.interface';

@Injectable()
export class SaleItemTypeOrmRepository implements ISaleItemRepository {
  constructor(
    @InjectRepository(SaleItemOrmEntity)
    private readonly repository: Repository<SaleItemOrmEntity>,
  ) {}

  async createSaleItem(
    saleId: number,
    productId: number,
    qty: number,
    unitPrice: number,
  ): Promise<number> {
    const entity = this.repository.create({
      sale_id: saleId,
      product_id: productId,
      qty,
      unit_price: unitPrice,
    });
    const saved = await this.repository.save(entity);
    return saved.id;
  }

  async findBySaleId(saleId: number): Promise<unknown[]> {
    return this.repository.find({ where: { sale_id: saleId } });
  }
}
