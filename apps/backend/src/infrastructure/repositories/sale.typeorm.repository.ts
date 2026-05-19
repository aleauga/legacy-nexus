import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleOrmEntity } from '../database/entities/sale.orm-entity';
import { ISaleRepository, Sale, DetailedSaleRow } from '../../domain/interfaces/sale.repository.interface';

@Injectable()
export class SaleTypeOrmRepository implements ISaleRepository {
  constructor(
    @InjectRepository(SaleOrmEntity)
    private readonly repository: Repository<SaleOrmEntity>,
  ) {}

  async createSale(
    userId: number,
    customerType: string,
    subtotal: number,
    total: number,
    status: string,
    lastTouchAt: Date,
    createdAt: Date,
  ): Promise<number> {
    const entity = this.repository.create({
      user_id: userId,
      customer_type: customerType,
      subtotal,
      total: total.toString(),
      status,
      last_touch_at: lastTouchAt.toISOString(),
      created_at: createdAt.toISOString(),
    });
    const saved = await this.repository.save(entity);
    return Array.isArray(saved) ? saved[0].id : saved.id;
  }

  async findById(id: number): Promise<Sale | null> {
    return this.repository.findOne({ where: { id } }) as Promise<Sale | null>;
  }

  async findByUserId(userId: number): Promise<Sale[]> {
    return this.repository.find({
      where: { user_id: userId, status: 'completed' },
    }) as Promise<Sale[]>;
  }

  async findAll(): Promise<Sale[]> {
    return this.repository.find() as Promise<Sale[]>;
  }

  async findDetailedByMonth(year: number, month: number): Promise<DetailedSaleRow[]> {
    const query = this.repository.createQueryBuilder('sale')
      .leftJoin('users', 'user', 'user.id = sale.user_id')
      .leftJoin('sale_items', 'item', 'item.sale_id = sale.id')
      .leftJoin('products', 'product', 'product.id = item.product_id')
      .select([
        'sale.id',
        'user.username',
        'sale.user_id',
        'sale.customer_type',
        'product.name as product_name',
        'item.qty',
        'item.unit_price',
        'sale.subtotal as effective_subtotal',
        'sale.total as line_after_discount',
        'sale.created_at',
      ])
      .where("sale.status IN ('completed', 'done', 'COMPLETED', 'finalizada')");

    const result = await query.getRawMany();
    const filtered = result.filter((row: Record<string, unknown>) => {
      const dateStr = String(row.sale_created_at || '');
      if (!dateStr) return false;
      
      // Try different date formats
      const patterns = [
        `${year}-${month.toString().padStart(2, '0')}`,
        `${month}/${year}`,
        `${year}/${month.toString().padStart(2, '0')}`,
        `${month.toString().padStart(2, '0')}/${year}`
      ];
      
      const matches = patterns.some(pattern => dateStr.includes(pattern));
      return matches;
    });
    
    return filtered.map((row: Record<string, unknown>): DetailedSaleRow => ({
      id: Number(row.sale_id),
      username: String(row.user_username || row.sale_user_id?.toString()),
      user_id: Number(row.sale_user_id),
      customer_type: String(row.sale_customer_type),
      product_name: String(row.product_name),
      qty: Number(row.item_qty),
      unit_price: Number(row.item_unit_price),
      effective_subtotal: parseFloat(String(row.effective_subtotal)) || 0,
      line_after_discount: parseFloat(String(row.line_after_discount)) || 0,
      created_at: String(row.sale_created_at),
    }));
  }

  async updateLastTouchAt(id: number, date: Date): Promise<void> {
    await this.repository.update(id, { last_touch_at: date.toISOString() });
  }
}
