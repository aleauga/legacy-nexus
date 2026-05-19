import { CartService } from '../../application/services/cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<import("../../application/services/cart.service").CartItem[]>;
    addToCart(req: any, body: {
        product_id: number;
        quantity: number;
    }): Promise<{
        success: boolean;
    }>;
    removeFromCart(req: any, productId: string): Promise<{
        success: boolean;
    }>;
    clearCart(req: any): Promise<{
        success: boolean;
    }>;
    checkout(req: any): Promise<{
        sale_id: number;
    }>;
}
