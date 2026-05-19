import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliersController } from '../controllers/suppliers.controller';
import { SupplierTypeOrmRepository } from '../../infrastructure/repositories/supplier.typeorm.repository';
import { SupplierOrmEntity } from '../../infrastructure/database/entities/supplier.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierOrmEntity])],
  controllers: [SuppliersController],
  providers: [
    {
      provide: 'ISupplierRepository',
      useClass: SupplierTypeOrmRepository,
    },
  ],
})
export class SuppliersModule {}
