import { Product } from '../entities/product.entity';

export interface IProductRepository {
  findById(id: number): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findActive(): Promise<Product[]>;
  findBySku(sku: string): Promise<Product | null>;
  create(product: Omit<Product, 'id'>): Promise<number>;
  delete(id: number): Promise<void>;
}
