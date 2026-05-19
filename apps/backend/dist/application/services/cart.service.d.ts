import { IProductRepository } from '../../domain/interfaces/product.repository.interface';
export interface CartItem {
    product_id: number;
    quantity: number;
}
export declare class CartService {
    private readonly productRepository;
    private carts;
    constructor(productRepository: IProductRepository);
    private getCartKey;
    getCart(sessionId: string): Promise<CartItem[]>;
    addToCart(sessionId: string, productId: number, quantity: number): Promise<void>;
    removeFromCart(sessionId: string, productId: number): Promise<void>;
    clearCart(sessionId: string): Promise<void>;
    checkout(sessionId: string): Promise<{
        sale_id: number;
    }>;
}
