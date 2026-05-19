export interface Supplier {
    id: number;
    name: string;
    contact: string | null;
    country: string | null;
}
export interface ISupplierRepository {
    findAll(): Promise<Supplier[]>;
    findById(id: number): Promise<Supplier | null>;
}
