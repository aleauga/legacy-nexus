import { Controller, Get, Param } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ISupplierRepository } from '../../domain/interfaces/supplier.repository.interface';

@Controller('api/suppliers')
export class SuppliersController {
  constructor(@Inject('ISupplierRepository') private readonly supplierRepository: ISupplierRepository) {}

  @Get()
  async listSuppliers() {
    return this.supplierRepository.findAll();
  }

  @Get(':id')
  async getSupplier(@Param('id') id: string) {
    return this.supplierRepository.findById(Number(id));
  }
}
