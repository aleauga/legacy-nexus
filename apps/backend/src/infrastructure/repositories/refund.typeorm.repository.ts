import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefundOrmEntity } from '../database/entities/refund.orm-entity';
import { IRefundRepository } from '../../domain/interfaces/refund.repository.interface';

@Injectable()
export class RefundTypeOrmRepository implements IRefundRepository {
  constructor(
    @InjectRepository(RefundOrmEntity)
    private readonly repository: Repository<RefundOrmEntity>,
  ) {}

  async createRefund(
    saleId: number,
    amount: number,
    reason: string,
    status: string,
    userId?: number,
  ): Promise<number> {
    const entity = this.repository.create({
      sale_id: saleId,
      user_id: userId,
      amount,
      reason,
      status,
      created_at: new Date(),
    });
    const saved = await this.repository.save(entity);
    return saved.id;
  }

  async findById(id: number): Promise<unknown | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findBySaleId(saleId: number): Promise<unknown[]> {
    return this.repository.find({ where: { sale_id: saleId } });
  }

  async findByUserId(userId: number): Promise<unknown[]> {
    return this.repository.find({
      where: { user_id: userId },
    });
  }

  async search(query: string): Promise<unknown[]> {
    return this.repository
      .createQueryBuilder('refund')
      .where('refund.reason LIKE :query', { query: `%${query}%` })
      .getMany();
  }

  async updateStatus(id: number, status: string): Promise<void> {
    await this.repository.update(id, { status });
  }
}
