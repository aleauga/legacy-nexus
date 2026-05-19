export interface IPurchaseItemRepository {
    createPurchaseItem(purchaseId: number, productId: number, qty: number, unitCost: number): Promise<number>;
}
