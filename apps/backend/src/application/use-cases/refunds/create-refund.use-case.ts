import { Inject } from '@nestjs/common';
import { CreateRefundDto } from '../../dto/create-refund.dto';
import { IRefundRepository } from '../../../domain/interfaces/refund.repository.interface';
import { ISaleRepository } from '../../../domain/interfaces/sale.repository.interface';

export class CreateRefundUseCase {
  constructor(
    @Inject('IRefundRepository') private readonly refundRepository: IRefundRepository,
    @Inject('ISaleRepository') private readonly saleRepository: ISaleRepository,
  ) {}

  async execute(dto: CreateRefundDto): Promise<{ refund_id: number; status: string }> {
    const sale = await this.saleRepository.findById(dto.sale_id);
    if (!sale) {
      throw new Error('Sale not found');
    }

    // Use provided amount or default to 0
    const amount = dto.amount ?? 0;

    const refundId = await this.refundRepository.createRefund(
      dto.sale_id,
      amount,
      dto.reason,
      'pending',
      dto.user_id,
    );

    return { refund_id: refundId, status: 'pending' };
  }
}
