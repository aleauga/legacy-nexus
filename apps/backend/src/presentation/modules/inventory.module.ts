import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from '../controllers/inventory.controller';
import { InventoryTypeOrmRepository } from '../../infrastructure/repositories/inventory.typeorm.repository';
import { InventoryStockOrmEntity } from '../../infrastructure/database/entities/inventory-stock.orm-entity';
import { ProductOrmEntity } from '../../infrastructure/database/entities/product.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryStockOrmEntity, ProductOrmEntity])],
  controllers: [InventoryController],
  providers: [
    {
      provide: 'IInventoryRepository',
      useClass: InventoryTypeOrmRepository,
    },
  ],
})
export class InventoryModule {}
