import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierOrmEntity } from '../database/entities/supplier.orm-entity';
import { ISupplierRepository, Supplier } from '../../domain/interfaces/supplier.repository.interface';

@Injectable()
export class SupplierTypeOrmRepository implements ISupplierRepository {
  constructor(
    @InjectRepository(SupplierOrmEntity)
    private readonly repository: Repository<SupplierOrmEntity>,
  ) {}

  async findAll(): Promise<Supplier[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Supplier | null> {
    return this.repository.findOne({ where: { id } });
  }
}
