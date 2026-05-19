import { Injectable, Inject } from '@nestjs/common';
import { IPurchaseRepository } from '../../../domain/interfaces/purchase.repository.interface';

@Injectable()
export class ReconcilePurchaseUseCase {
  constructor(@Inject('IPurchaseRepository') private readonly purchaseRepository: IPurchaseRepository) {}

  async execute(purchaseId: number, bankRef: string): Promise<{ purchase_id: number; bank_ref: string }> {
    await this.purchaseRepository.updateBankRef(purchaseId, bankRef, 'reconciled');
    return { purchase_id: purchaseId, bank_ref: bankRef };
  }
}
