import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateSaleUseCase } from '../../application/use-cases/sales/create-sale.use-case';
import { ReturnSaleUseCase } from '../../application/use-cases/sales/return-sale.use-case';
import { GetSalesByUserUseCase } from '../../application/use-cases/sales/get-sales-by-user.use-case';
import { SaleTypeOrmRepository } from '../../infrastructure/repositories/sale.typeorm.repository';
import { SaleItemTypeOrmRepository } from '../../infrastructure/repositories/sale-item.typeorm.repository';
import { InventoryTypeOrmRepository } from '../../infrastructure/repositories/inventory.typeorm.repository';
import { SaleOrmEntity } from '../../infrastructure/database/entities/sale.orm-entity';
import { SaleItemOrmEntity } from '../../infrastructure/database/entities/sale-item.orm-entity';
import { InventoryStockOrmEntity } from '../../infrastructure/database/entities/inventory-stock.orm-entity';
import { ProductOrmEntity } from '../../infrastructure/database/entities/product.orm-entity';
import { SalesController } from '../controllers/sales.controller';
import { EmailService } from '../../infrastructure/services/email.service.impl';
import { FinanceService } from '../../domain/services/finance.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleOrmEntity, SaleItemOrmEntity, InventoryStockOrmEntity, ProductOrmEntity]),
  ],
  controllers: [SalesController],
  providers: [
    {
      provide: 'ISaleRepository',
      useClass: SaleTypeOrmRepository,
    },
    {
      provide: 'ISaleItemRepository',
      useClass: SaleItemTypeOrmRepository,
    },
    {
      provide: 'IInventoryRepository',
      useClass: InventoryTypeOrmRepository,
    },
    {
      provide: 'IEmailService',
      useClass: EmailService,
    },
    FinanceService,
    CreateSaleUseCase,
    ReturnSaleUseCase,
    GetSalesByUserUseCase,
  ],
})
export class SalesModule {}
