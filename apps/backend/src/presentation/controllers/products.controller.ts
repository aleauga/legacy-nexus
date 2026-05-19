import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IProductRepository } from '../../domain/interfaces/product.repository.interface';
import { Product } from '../../domain/entities/product.entity';

@Controller('api/products')
export class ProductsController {
  constructor(@Inject('IProductRepository') private readonly productRepository: IProductRepository) {}

  @Get()
  async listProducts() {
    return this.productRepository.findAll();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productRepository.findById(Number(id));
  }

  @Post()
  async createProduct(@Body() data: Omit<Product, 'id'>) {
    return this.productRepository.create(data);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productRepository.delete(Number(id));
  }

  @Get('search')
  async searchProducts(@Query('q') query: string) {
    return this.productRepository.findBySku(query);
  }
}
