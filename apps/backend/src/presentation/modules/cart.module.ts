import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from '../controllers/cart.controller';
import { CartService } from '../../application/services/cart.service';
import { ProductOrmEntity } from '../../infrastructure/database/entities/product.orm-entity';
import { ProductTypeOrmRepository } from '../../infrastructure/repositories/product.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity])],
  controllers: [CartController],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: ProductTypeOrmRepository,
    },
    CartService,
  ],
})
export class CartModule {}
