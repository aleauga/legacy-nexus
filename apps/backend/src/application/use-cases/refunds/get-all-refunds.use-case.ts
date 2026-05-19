import { Inject } from '@nestjs/common';
import { IRefundRepository } from '../../../domain/interfaces/refund.repository.interface';

export class GetAllRefundsUseCase {
  constructor(@Inject('IRefundRepository') private readonly refundRepository: IRefundRepository) {}

  async execute(): Promise<unknown[]> {
    return this.refundRepository.findAll();
  }
}
