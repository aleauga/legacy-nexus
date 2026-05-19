import { Repository } from 'typeorm';
import { SaleOrmEntity } from '../database/entities/sale.orm-entity';
import { ISaleRepository, Sale, DetailedSaleRow } from '../../domain/interfaces/sale.repository.interface';
export declare class SaleTypeOrmRepository implements ISaleRepository {
    private readonly repository;
    constructor(repository: Repository<SaleOrmEntity>);
    createSale(userId: number, customerType: string, subtotal: number, total: number, status: string, lastTouchAt: Date, createdAt: Date): Promise<number>;
    findById(id: number): Promise<Sale | null>;
    findByUserId(userId: number): Promise<Sale[]>;
    findAll(): Promise<Sale[]>;
    findDetailedByMonth(year: number, month: number): Promise<DetailedSaleRow[]>;
    updateLastTouchAt(id: number, date: Date): Promise<void>;
}
