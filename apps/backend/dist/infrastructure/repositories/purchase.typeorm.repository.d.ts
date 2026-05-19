import { Repository } from 'typeorm';
import { PurchaseOrmEntity } from '../database/entities/purchase.orm-entity';
import { IPurchaseRepository, Purchase } from '../../domain/interfaces/purchase.repository.interface';
export declare class PurchaseTypeOrmRepository implements IPurchaseRepository {
    private readonly repository;
    constructor(repository: Repository<PurchaseOrmEntity>);
    createPurchase(supplierId: number, total: number, receivedDate: string, status: string): Promise<number>;
    findById(id: number): Promise<Purchase | null>;
    findAll(limit?: number): Promise<Purchase[]>;
    findAllWithoutLimit(): Promise<Purchase[]>;
    updateBankRef(id: number, bankRef: string, status: string): Promise<void>;
}
