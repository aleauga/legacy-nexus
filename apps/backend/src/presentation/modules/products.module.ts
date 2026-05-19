import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from '../controllers/products.controller';
import { ProductTypeOrmRepository } from '../../infrastructure/repositories/product.typeorm.repository';
import { ProductOrmEntity } from '../../infrastructure/database/entities/product.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity])],
  controllers: [ProductsController],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: ProductTypeOrmRepository,
    },
  ],
})
export class ProductsModule {}
