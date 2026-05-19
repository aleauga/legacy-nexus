import { Repository } from 'typeorm';
import { SaleItemOrmEntity } from '../database/entities/sale-item.orm-entity';
import { ISaleItemRepository } from '../../domain/interfaces/sale-item.repository.interface';
export declare class SaleItemTypeOrmRepository implements ISaleItemRepository {
    private readonly repository;
    constructor(repository: Repository<SaleItemOrmEntity>);
    createSaleItem(saleId: number, productId: number, qty: number, unitPrice: number): Promise<number>;
    findBySaleId(saleId: number): Promise<unknown[]>;
}
