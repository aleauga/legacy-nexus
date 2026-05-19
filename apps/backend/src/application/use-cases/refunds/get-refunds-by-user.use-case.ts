import { Inject } from '@nestjs/common';
import { IRefundRepository } from '../../../domain/interfaces/refund.repository.interface';

export class GetRefundsByUserUseCase {
  constructor(@Inject('IRefundRepository') private readonly refundRepository: IRefundRepository) {}

  async execute(userId: number): Promise<unknown[]> {
    return this.refundRepository.findByUserId(userId);
  }
}
