import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyReportUseCase } from '../../application/use-cases/reports/monthly-report.use-case';
import { TotalsReportUseCase } from '../../application/use-cases/reports/totals-report.use-case';
import { SaleTypeOrmRepository } from '../../infrastructure/repositories/sale.typeorm.repository';
import { PurchaseTypeOrmRepository } from '../../infrastructure/repositories/purchase.typeorm.repository';
import { SaleOrmEntity } from '../../infrastructure/database/entities/sale.orm-entity';
import { PurchaseOrmEntity } from '../../infrastructure/database/entities/purchase.orm-entity';
import { ReportsController } from '../controllers/reports.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SaleOrmEntity, PurchaseOrmEntity])],
  controllers: [ReportsController],
  providers: [
    {
      provide: 'ISaleRepository',
      useClass: SaleTypeOrmRepository,
    },
    {
      provide: 'IPurchaseRepository',
      useClass: PurchaseTypeOrmRepository,
    },
    MonthlyReportUseCase,
    TotalsReportUseCase,
  ],
})
export class ReportsModule {}
