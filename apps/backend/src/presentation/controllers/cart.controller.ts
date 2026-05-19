import { Controller, Get, Post, Delete, Body, Param, Req } from '@nestjs/common';
import { CartService } from '../../application/services/cart.service';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Req() req: any) {
    const sessionId = req.headers['session-id'] || 'default';
    return this.cartService.getCart(sessionId);
  }

  @Post()
  async addToCart(@Req() req: any, @Body() body: { product_id: number; quantity: number }) {
    const sessionId = req.headers['session-id'] || 'default';
    await this.cartService.addToCart(sessionId, body.product_id, body.quantity);
    return { success: true };
  }

  @Delete(':productId')
  async removeFromCart(@Req() req: any, @Param('productId') productId: string) {
    const sessionId = req.headers['session-id'] || 'default';
    await this.cartService.removeFromCart(sessionId, Number(productId));
    return { success: true };
  }

  @Delete()
  async clearCart(@Req() req: any) {
    const sessionId = req.headers['session-id'] || 'default';
    await this.cartService.clearCart(sessionId);
    return { success: true };
  }

  @Post('checkout')
  async checkout(@Req() req: any) {
    const sessionId = req.headers['session-id'] || 'default';
    return this.cartService.checkout(sessionId);
  }
}
