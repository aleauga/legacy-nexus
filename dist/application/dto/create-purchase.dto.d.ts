export declare class PurchaseItemDto {
    product_id: number;
    qty: number;
    unit_cost: number;
    warehouse_id: number;
}
export declare class CreatePurchaseDto {
    supplier_id: number;
    received_date: string;
    items: PurchaseItemDto[];
}
