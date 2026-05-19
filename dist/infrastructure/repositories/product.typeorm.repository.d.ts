import { Repository } from 'typeorm';
import { ProductOrmEntity } from '../database/entities/product.orm-entity';
import { Product } from '../../domain/entities/product.entity';
import { IProductRepository } from '../../domain/interfaces/product.repository.interface';
export declare class ProductTypeOrmRepository implements IProductRepository {
    private readonly repository;
    constructor(repository: Repository<ProductOrmEntity>);
    findById(id: number): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    findActive(): Promise<Product[]>;
    findBySku(sku: string): Promise<Product | null>;
    create(product: Omit<Product, 'id'>): Promise<number>;
    delete(id: number): Promise<void>;
}
