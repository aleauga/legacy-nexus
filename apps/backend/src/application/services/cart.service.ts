import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IProductRepository } from '../../domain/interfaces/product.repository.interface';

export interface CartItem {
  product_id: number;
  quantity: number;
}

@Injectable()
export class CartService {
  private carts: Map<string, CartItem[]> = new Map();

  constructor(@Inject('IProductRepository') private readonly productRepository: IProductRepository) {}

  private getCartKey(sessionId: string): string {
    return sessionId || 'default';
  }

  async getCart(sessionId: string): Promise<CartItem[]> {
    return this.carts.get(this.getCartKey(sessionId)) || [];
  }

  async addToCart(sessionId: string, productId: number, quantity: number): Promise<void> {
    const key = this.getCartKey(sessionId);
    let cart = this.carts.get(key) || [];

    // Verify product exists
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const existingItem = cart.find(item => item.product_id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ product_id: productId, quantity });
    }

    this.carts.set(key, cart);
  }

  async removeFromCart(sessionId: string, productId: number): Promise<void> {
    const key = this.getCartKey(sessionId);
    let cart = this.carts.get(key) || [];
    cart = cart.filter(item => item.product_id !== productId);
    this.carts.set(key, cart);
  }

  async clearCart(sessionId: string): Promise<void> {
    const key = this.getCartKey(sessionId);
    this.carts.delete(key);
  }

  async checkout(sessionId: string): Promise<{ sale_id: number }> {
    const key = this.getCartKey(sessionId);
    const cart = this.carts.get(key);

    if (!cart || cart.length === 0) {
      throw new Error('Cart is empty');
    }

    // This would typically call the sales use case to create a sale
    // For now, we'll clear the cart and return a mock sale_id
    this.carts.delete(key);

    // In a real implementation, you would:
    // 1. Calculate totals with IVA
    // 2. Create sale using CreateSaleUseCase
    // 3. Update inventory
    // 4. Return the actual sale_id

    return { sale_id: Math.floor(Math.random() * 1000) };
  }
}
