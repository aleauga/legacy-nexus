import { Injectable, Inject } from '@nestjs/common';
import { IRefundRepository } from '../../../domain/interfaces/refund.repository.interface';

@Injectable()
export class ApproveRefundUseCase {
  constructor(@Inject('IRefundRepository') private readonly refundRepository: IRefundRepository) {}

  async execute(refundId: number): Promise<{ refund_id: number; status: string }> {
    await this.refundRepository.updateStatus(refundId, 'approved');
    return { refund_id: refundId, status: 'approved' };
  }
}
