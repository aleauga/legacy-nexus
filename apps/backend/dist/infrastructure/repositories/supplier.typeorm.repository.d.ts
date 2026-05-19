import { Repository } from 'typeorm';
import { SupplierOrmEntity } from '../database/entities/supplier.orm-entity';
import { ISupplierRepository, Supplier } from '../../domain/interfaces/supplier.repository.interface';
export declare class SupplierTypeOrmRepository implements ISupplierRepository {
    private readonly repository;
    constructor(repository: Repository<SupplierOrmEntity>);
    findAll(): Promise<Supplier[]>;
    findById(id: number): Promise<Supplier | null>;
}
