import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateRefundUseCase } from '../../application/use-cases/refunds/create-refund.use-case';
import { ApproveRefundUseCase } from '../../application/use-cases/refunds/approve-refund.use-case';
import { GetRefundsByUserUseCase } from '../../application/use-cases/refunds/get-refunds-by-user.use-case';
import { SearchRefundsUseCase } from '../../application/use-cases/refunds/search-refunds.use-case';
import { GetAllRefundsUseCase } from '../../application/use-cases/refunds/get-all-refunds.use-case';
import { RefundTypeOrmRepository } from '../../infrastructure/repositories/refund.typeorm.repository';
import { SaleTypeOrmRepository } from '../../infrastructure/repositories/sale.typeorm.repository';
import { RefundOrmEntity } from '../../infrastructure/database/entities/refund.orm-entity';
import { SaleOrmEntity } from '../../infrastructure/database/entities/sale.orm-entity';
import { RefundsController } from '../controllers/refunds.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefundOrmEntity, SaleOrmEntity]),
  ],
  controllers: [RefundsController],
  providers: [
    {
      provide: 'IRefundRepository',
      useClass: RefundTypeOrmRepository,
    },
    {
      provide: 'ISaleRepository',
      useClass: SaleTypeOrmRepository,
    },
    CreateRefundUseCase,
    ApproveRefundUseCase,
    GetRefundsByUserUseCase,
    SearchRefundsUseCase,
    GetAllRefundsUseCase,
  ],
})
export class RefundsModule {}
