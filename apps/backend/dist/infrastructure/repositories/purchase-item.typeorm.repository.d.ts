import { Repository } from 'typeorm';
import { PurchaseItemOrmEntity } from '../database/entities/purchase-item.orm-entity';
import { IPurchaseItemRepository } from '../../domain/interfaces/purchase-item.repository.interface';
export declare class PurchaseItemTypeOrmRepository implements IPurchaseItemRepository {
    private readonly repository;
    constructor(repository: Repository<PurchaseItemOrmEntity>);
    createPurchaseItem(purchaseId: number, productId: number, qty: number, unitCost: number): Promise<number>;
}
