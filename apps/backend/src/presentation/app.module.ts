import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { AuthModule } from './modules/auth.module';
import { SalesModule } from './modules/sales.module';
import { PurchasesModule } from './modules/purchases.module';
import { RefundsModule } from './modules/refunds.module';
import { ReportsModule } from './modules/reports.module';
import { ExportsModule } from './modules/exports.module';
import { InventoryModule } from './modules/inventory.module';
import { SuppliersModule } from './modules/suppliers.module';
import { NotificationsModule } from './modules/notifications.module';
import { ProductsModule } from './modules/products.module';
import { CartModule } from './modules/cart.module';
import { HealthController } from './controllers/health.controller';
import { AppController } from './controllers/app.controller';
import { MemoryCacheService } from '../infrastructure/cache/memory.cache.service';
import { FinanceService } from '../domain/services/finance.service';
import { IvaHook } from '../domain/hooks/iva.hook';
import { EmailService } from '../infrastructure/services/email.service.impl';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    SalesModule,
    PurchasesModule,
    RefundsModule,
    ReportsModule,
    ExportsModule,
    InventoryModule,
    SuppliersModule,
    NotificationsModule,
    ProductsModule,
    CartModule,
  ],
  controllers: [HealthController, AppController],
  providers: [
    MemoryCacheService,
    FinanceService,
    EmailService,
    IvaHook,
  ],
})
export class AppModule {
  constructor(
    private readonly financeService: FinanceService,
    private readonly ivaHook: IvaHook,
  ) {
    this.financeService.registerPricingHook(this.ivaHook);
  }
}
