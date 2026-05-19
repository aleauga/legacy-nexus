export declare class SaleItemDto {
    product_id: number;
    qty: number;
    warehouse_id: number;
}
export declare class CreateSaleDto {
    user_id: number;
    customer_type: string;
    items: SaleItemDto[];
}
