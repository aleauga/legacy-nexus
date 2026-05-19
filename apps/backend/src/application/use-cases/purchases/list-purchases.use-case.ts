import { Injectable, Inject } from '@nestjs/common';
import { IPurchaseRepository, Purchase } from '../../../domain/interfaces/purchase.repository.interface';
import { ISupplierRepository } from '../../../domain/interfaces/supplier.repository.interface';

@Injectable()
export class ListPurchasesUseCase {
  constructor(
    @Inject('IPurchaseRepository') private readonly purchaseRepository: IPurchaseRepository,
    @Inject('ISupplierRepository') private readonly supplierRepository: ISupplierRepository,
  ) {}

  async execute(limit: number = 50): Promise<(Purchase & { supplier_name: string })[]> {
    const purchases = await this.purchaseRepository.findAll(limit);
    
    const purchasesWithSupplierName = await Promise.all(
      purchases.map(async (purchase: Purchase) => {
        const supplier = await this.supplierRepository.findById(purchase.supplier_id);
        return {
          ...purchase,
          supplier_name: supplier?.name || 'Unknown',
        };
      })
    );
    
    return purchasesWithSupplierName;
  }
}
