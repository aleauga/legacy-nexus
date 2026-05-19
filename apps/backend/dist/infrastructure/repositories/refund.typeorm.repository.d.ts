import { Repository } from 'typeorm';
import { RefundOrmEntity } from '../database/entities/refund.orm-entity';
import { IRefundRepository } from '../../domain/interfaces/refund.repository.interface';
export declare class RefundTypeOrmRepository implements IRefundRepository {
    private readonly repository;
    constructor(repository: Repository<RefundOrmEntity>);
    createRefund(saleId: number, amount: number, reason: string, status: string, userId?: number): Promise<number>;
    findById(id: number): Promise<unknown | null>;
    findBySaleId(saleId: number): Promise<unknown[]>;
    findByUserId(userId: number): Promise<unknown[]>;
    findAll(): Promise<unknown[]>;
    search(query: string): Promise<unknown[]>;
    updateStatus(id: number, status: string): Promise<void>;
}
