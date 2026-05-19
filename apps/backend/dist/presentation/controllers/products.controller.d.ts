import { IProductRepository } from '../../domain/interfaces/product.repository.interface';
import { Product } from '../../domain/entities/product.entity';
export declare class ProductsController {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    listProducts(): Promise<Product[]>;
    getProduct(id: string): Promise<Product | null>;
    createProduct(data: Omit<Product, 'id'>): Promise<number>;
    deleteProduct(id: string): Promise<void>;
    searchProducts(query: string): Promise<Product | null>;
}
