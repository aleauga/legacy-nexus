import { Injectable, Inject } from '@nestjs/common';
import { CreateSaleDto } from '../../dto/create-sale.dto';
import { ISaleRepository } from '../../../domain/interfaces/sale.repository.interface';
import { ISaleItemRepository } from '../../../domain/interfaces/sale-item.repository.interface';
import { IInventoryRepository } from '../../../domain/interfaces/inventory.repository.interface';
import { IEmailService } from '../../../domain/interfaces/email.service.interface';
import { FinanceService } from '../../../domain/services/finance.service';

@Injectable()
export class CreateSaleUseCase {
  constructor(
    @Inject('ISaleRepository') private readonly saleRepository: ISaleRepository,
    @Inject('ISaleItemRepository') private readonly saleItemRepository: ISaleItemRepository,
    @Inject('IInventoryRepository') private readonly inventoryRepository: IInventoryRepository,
    @Inject('IEmailService') private readonly emailService: IEmailService,
    private readonly financeService: FinanceService,
  ) {}

  async execute(dto: CreateSaleDto): Promise<{ sale_id: number; total: number }> {
    let subtotal = 0;
    let totalQty = 0;

    for (const item of dto.items) {
      const price = await this.inventoryRepository.getProductPrice(item.product_id);
      subtotal += price * item.qty;
      totalQty += item.qty;
    }

    const discounted = this.financeService.applyVolumeDiscount(totalQty, subtotal);
    const iva = this.financeService.calcIva(discounted);
    const total = this.financeService.roundAmount(discounted + iva);

    const now = new Date();
    const saleId = await this.saleRepository.createSale(
      dto.user_id,
      dto.customer_type,
      discounted,
      total,
      'completed',
      now,
      now,
    );

    for (const item of dto.items) {
      const price = await this.inventoryRepository.getProductPrice(item.product_id);
      await this.saleItemRepository.createSaleItem(saleId, item.product_id, item.qty, price);
      await this.inventoryRepository.decrementStock(item.product_id, 1, item.qty);
    }

    await this.emailService.send(dto.user_id, 'Venta confirmada', `Total: ${total}`);

    return { sale_id: saleId, total };
  }
}
