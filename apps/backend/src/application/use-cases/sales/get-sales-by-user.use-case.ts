import { Injectable, Inject } from '@nestjs/common';
import { ISaleRepository } from '../../../domain/interfaces/sale.repository.interface';

@Injectable()
export class GetSalesByUserUseCase {
  constructor(@Inject('ISaleRepository') private readonly saleRepository: ISaleRepository) {}

  async execute(userId: number): Promise<unknown[]> {
    return this.saleRepository.findByUserId(userId);
  }
}
