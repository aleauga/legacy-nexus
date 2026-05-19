import { ISupplierRepository } from '../../domain/interfaces/supplier.repository.interface';
export declare class SuppliersController {
    private readonly supplierRepository;
    constructor(supplierRepository: ISupplierRepository);
    listSuppliers(): Promise<import("../../domain/interfaces/supplier.repository.interface").Supplier[]>;
    getSupplier(id: string): Promise<import("../../domain/interfaces/supplier.repository.interface").Supplier | null>;
}
