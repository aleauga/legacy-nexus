import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrmEntity } from '../database/entities/purchase.orm-entity';
import { IPurchaseRepository, Purchase } from '../../domain/interfaces/purchase.repository.interface';

@Injectable()
export class PurchaseTypeOrmRepository implements IPurchaseRepository {
  constructor(
    @InjectRepository(PurchaseOrmEntity)
    private readonly repository: Repository<PurchaseOrmEntity>,
  ) {}

  async createPurchase(
    supplierId: number,
    total: number,
    receivedDate: string,
    status: string,
  ): Promise<number> {
    const entity = this.repository.create({
      supplier_id: supplierId,
      total,
      received_date: receivedDate,
      status,
    });
    const saved = await this.repository.save(entity);
    return saved.id;
  }

  async findById(id: number): Promise<Purchase | null> {
    return this.repository.findOne({ where: { id } }) as Promise<Purchase | null>;
  }

  async findAll(limit?: number): Promise<Purchase[]> {
    if (limit) {
      return this.repository.find({ order: { id: 'DESC' }, take: limit }) as Promise<Purchase[]>;
    }
    return this.repository.find({ order: { id: 'DESC' } }) as Promise<Purchase[]>;
  }

  async findAllWithoutLimit(): Promise<Purchase[]> {
    return this.repository.find({ order: { id: 'DESC' } }) as Promise<Purchase[]>;
  }

  async updateBankRef(id: number, bankRef: string, status: string): Promise<void> {
    await this.repository.update(id, { bank_ref: bankRef, status });
  }
}
