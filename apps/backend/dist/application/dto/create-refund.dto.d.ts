export interface RefundItem {
    product_id: number;
    qty: number;
}
export declare class CreateRefundDto {
    sale_id: number;
    amount?: number;
    reason: string;
    user_id?: number;
    items?: RefundItem[];
}
