import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryStockOrmEntity } from '../database/entities/inventory-stock.orm-entity';
import { ProductOrmEntity } from '../database/entities/product.orm-entity';
import { IInventoryRepository, WarehouseStock } from '../../domain/interfaces/inventory.repository.interface';

@Injectable()
export class InventoryTypeOrmRepository implements IInventoryRepository {
  constructor(
    @InjectRepository(InventoryStockOrmEntity)
    private readonly repository: Repository<InventoryStockOrmEntity>,
    @InjectRepository(ProductOrmEntity)
    private readonly productRepository: Repository<ProductOrmEntity>,
  ) {}

  async getStock(productId: number, warehouseId?: number): Promise<number> {
    if (warehouseId) {
      const stock = await this.repository.findOne({
        where: { product_id: productId, warehouse_id: warehouseId },
      });
      return stock?.quantity ?? 0;
    }

    const result = await this.repository
      .createQueryBuilder('stock')
      .select('SUM(stock.quantity)', 'total')
      .where('stock.product_id = :productId', { productId })
      .getRawOne();

    return result?.total ?? 0;
  }

  async decrementStock(
    productId: number,
    warehouseId: number,
    qty: number,
  ): Promise<void> {
    const stock = await this.repository.findOne({
      where: { product_id: productId, warehouse_id: warehouseId },
    });

    const current = stock?.quantity ?? 0;
    const newQty = Math.max(0, current - qty);

    if (stock) {
      await this.repository.update(
        { product_id: productId, warehouse_id: warehouseId },
        { quantity: newQty }
      );
    } else {
      await this.repository.save({
        product_id: productId,
        warehouse_id: warehouseId,
        quantity: newQty,
      });
    }
  }

  async incrementStock(
    productId: number,
    warehouseId: number,
    qty: number,
  ): Promise<void> {
    const stock = await this.repository.findOne({
      where: { product_id: productId, warehouse_id: warehouseId },
    });

    const current = stock?.quantity ?? 0;
    const newQty = current + qty;

    if (stock) {
      await this.repository.update(
        { product_id: productId, warehouse_id: warehouseId },
        { quantity: newQty }
      );
    } else {
      await this.repository.save({
        product_id: productId,
        warehouse_id: warehouseId,
        quantity: newQty,
      });
    }
  }

  async getProductPrice(productId: number): Promise<number> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    return product?.price ?? 0;
  }

  async filterByWarehouse(warehouse: string): Promise<WarehouseStock[]> {
    const stockRecords = await this.repository.find({
      where: { warehouse_id: Number(warehouse) },
    });

    // Join with products to get sku and name
    const result = [];
    for (const stock of stockRecords) {
      const product = await this.productRepository.findOne({
        where: { id: stock.product_id },
      });
      if (product) {
        result.push({
          product_id: stock.product_id,
          warehouse_id: stock.warehouse_id,
          quantity: stock.quantity,
          sku: product.sku,
          name: product.name,
          warehouse: stock.warehouse_id,
        });
      }
    }

    return result;
  }
}
