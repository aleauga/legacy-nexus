import { Inject } from '@nestjs/common';
import { IRefundRepository } from '../../../domain/interfaces/refund.repository.interface';

export class SearchRefundsUseCase {
  constructor(@Inject('IRefundRepository') private readonly refundRepository: IRefundRepository) {}

  async execute(query: string): Promise<unknown[]> {
    return this.refundRepository.search(query);
  }
}
