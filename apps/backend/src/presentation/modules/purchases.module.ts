import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatePurchaseUseCase } from '../../application/use-cases/purchases/create-purchase.use-case';
import { ReconcilePurchaseUseCase } from '../../application/use-cases/purchases/reconcile-purchase.use-case';
import { ListPurchasesUseCase } from '../../application/use-cases/purchases/list-purchases.use-case';
import { PurchaseTypeOrmRepository } from '../../infrastructure/repositories/purchase.typeorm.repository';
import { PurchaseItemTypeOrmRepository } from '../../infrastructure/repositories/purchase-item.typeorm.repository';
import { InventoryTypeOrmRepository } from '../../infrastructure/repositories/inventory.typeorm.repository';
import { SupplierTypeOrmRepository } from '../../infrastructure/repositories/supplier.typeorm.repository';
import { PurchaseOrmEntity } from '../../infrastructure/database/entities/purchase.orm-entity';
import { PurchaseItemOrmEntity } from '../../infrastructure/database/entities/purchase-item.orm-entity';
import { InventoryStockOrmEntity } from '../../infrastructure/database/entities/inventory-stock.orm-entity';
import { ProductOrmEntity } from '../../infrastructure/database/entities/product.orm-entity';
import { SupplierOrmEntity } from '../../infrastructure/database/entities/supplier.orm-entity';
import { PurchasesController } from '../controllers/purchases.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseOrmEntity, PurchaseItemOrmEntity, InventoryStockOrmEntity, ProductOrmEntity, SupplierOrmEntity]),
  ],
  controllers: [PurchasesController],
  providers: [
    {
      provide: 'IPurchaseRepository',
      useClass: PurchaseTypeOrmRepository,
    },
    {
      provide: 'IPurchaseItemRepository',
      useClass: PurchaseItemTypeOrmRepository,
    },
    {
      provide: 'IInventoryRepository',
      useClass: InventoryTypeOrmRepository,
    },
    {
      provide: 'ISupplierRepository',
      useClass: SupplierTypeOrmRepository,
    },
    CreatePurchaseUseCase,
    ReconcilePurchaseUseCase,
    ListPurchasesUseCase,
  ],
})
export class PurchasesModule {}
