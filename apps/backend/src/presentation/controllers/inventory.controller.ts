import { Controller, Get, Param } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IInventoryRepository } from '../../domain/interfaces/inventory.repository.interface';

@Controller('api/inventory')
export class InventoryController {
  constructor(@Inject('IInventoryRepository') private readonly inventoryRepository: IInventoryRepository) {}

  @Get()
  async getInventoryOverview() {
    return this.inventoryRepository.filterByWarehouse('1');
  }

  @Get('warehouse/:wh')
  async getInventoryByWarehouse(@Param('wh') warehouse: string) {
    return this.inventoryRepository.filterByWarehouse(warehouse);
  }
}
