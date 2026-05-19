import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportCsvUseCase } from '../../application/use-cases/exports/export-csv.use-case';
import { ExportPivotUseCase } from '../../application/use-cases/exports/export-pivot.use-case';
import { SaleTypeOrmRepository } from '../../infrastructure/repositories/sale.typeorm.repository';
import { ProductTypeOrmRepository } from '../../infrastructure/repositories/product.typeorm.repository';
import { SaleOrmEntity } from '../../infrastructure/database/entities/sale.orm-entity';
import { ProductOrmEntity } from '../../infrastructure/database/entities/product.orm-entity';
import { ExportsController } from '../controllers/exports.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SaleOrmEntity, ProductOrmEntity])],
  controllers: [ExportsController],
  providers: [
    {
      provide: 'ISaleRepository',
      useClass: SaleTypeOrmRepository,
    },
    {
      provide: 'IProductRepository',
      useClass: ProductTypeOrmRepository,
    },
    ExportCsvUseCase,
    ExportPivotUseCase,
  ],
})
export class ExportsModule {}
