import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrmEntity } from '../database/entities/product.orm-entity';
import { Product } from '../../domain/entities/product.entity';
import { IProductRepository } from '../../domain/interfaces/product.repository.interface';

@Injectable()
export class ProductTypeOrmRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly repository: Repository<ProductOrmEntity>,
  ) {}

  async findById(id: number): Promise<Product | null> {
    const ormEntity = await this.repository.findOne({
      where: { id },
    });

    if (!ormEntity) {
      return null;
    }

    return new Product(
      ormEntity.id,
      ormEntity.sku,
      ormEntity.name,
      ormEntity.price,
      ormEntity.category,
      ormEntity.supplier_id,
      ormEntity.deleted_at,
    );
  }

  async findAll(): Promise<Product[]> {
    const ormEntities = await this.repository.find();
    return ormEntities.map(
      (entity: ProductOrmEntity) =>
        new Product(
          entity.id,
          entity.sku,
          entity.name,
          entity.price,
          entity.category,
          entity.supplier_id,
          entity.deleted_at,
        ),
    );
  }

  async findActive(): Promise<Product[]> {
    const ormEntities = await this.repository.find({
      where: { deleted_at: null as unknown as Date },
    });
    return ormEntities.map(
      (entity: ProductOrmEntity) =>
        new Product(
          entity.id,
          entity.sku,
          entity.name,
          entity.price,
          entity.category,
          entity.supplier_id,
          entity.deleted_at,
        ),
    );
  }

  async findBySku(sku: string): Promise<Product | null> {
    const ormEntity = await this.repository.findOne({
      where: { sku },
    });

    if (!ormEntity) {
      return null;
    }

    return new Product(
      ormEntity.id,
      ormEntity.sku,
      ormEntity.name,
      ormEntity.price,
      ormEntity.category,
      ormEntity.supplier_id,
      ormEntity.deleted_at,
    );
  }

  async create(product: Omit<Product, 'id'>): Promise<number> {
    const ormEntity = this.repository.create({
      sku: product.sku,
      name: product.name,
      price: product.price,
      category: product.category,
      supplier_id: product.supplierId,
      deleted_at: product.deletedAt,
    });

    const saved = await this.repository.save(ormEntity);
    return saved.id;
  }

  async delete(id: number): Promise<void> {
    await this.repository.update(id, { deleted_at: new Date() });
  }
}
