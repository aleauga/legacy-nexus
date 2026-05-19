export declare class Product {
    readonly id: number;
    readonly sku: string;
    readonly name: string;
    readonly price: number;
    readonly category: string;
    readonly supplierId: number;
    readonly stock: number;
    readonly deletedAt: Date | null;
    constructor(id: number, sku: string, name: string, price: number, category: string, supplierId: number, stock: number, deletedAt?: Date | null);
    isActive(): boolean;
    toDict(): Record<string, unknown>;
}
