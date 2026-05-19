import { Inject } from '@nestjs/common';
import { CreatePurchaseDto } from '../../dto/create-purchase.dto';
import { IPurchaseRepository } from '../../../domain/interfaces/purchase.repository.interface';
import { IPurchaseItemRepository } from '../../../domain/interfaces/purchase-item.repository.interface';
import { IInventoryRepository } from '../../../domain/interfaces/inventory.repository.interface';
import { ISupplierRepository } from '../../../domain/interfaces/supplier.repository.interface';

export class CreatePurchaseUseCase {
  constructor(
    @Inject('IPurchaseRepository')
    private readonly purchaseRepository: IPurchaseRepository,
    @Inject('IPurchaseItemRepository')
    private readonly purchaseItemRepository: IPurchaseItemRepository,
    @Inject('IInventoryRepository')
    private readonly inventoryRepository: IInventoryRepository,
    @Inject('ISupplierRepository')
    private readonly supplierRepository: ISupplierRepository,
  ) {}

  async execute(dto: CreatePurchaseDto): Promise<{ purchase_id: number; supplier_name: string }> {
    const total = this._calcPurchaseTotal(dto.items);
    
    const purchaseId = await this.purchaseRepository.createPurchase(
      dto.supplier_id,
      total,
      dto.received_date,
      'received',
    );

    for (const item of dto.items) {
      await this.purchaseItemRepository.createPurchaseItem(
        purchaseId,
        item.product_id,
        item.qty,
        item.unit_cost,
      );
      await this.inventoryRepository.incrementStock(item.product_id, item.warehouse_id, item.qty);
    }

    const supplier = await this.supplierRepository.findById(dto.supplier_id);
    const supplierName = supplier?.name || 'Unknown';

    return { purchase_id: purchaseId, supplier_name: supplierName };
  }

  private _calcPurchaseTotal(items: Array<{ qty: number; unit_cost: number }>): number {
    return items.reduce((sum, item) => sum + item.qty * item.unit_cost, 0);
  }
}
