export interface ISaleItemRepository {
    createSaleItem(saleId: number, productId: number, qty: number, unitPrice: number): Promise<number>;
    findBySaleId(saleId: number): Promise<unknown[]>;
}
