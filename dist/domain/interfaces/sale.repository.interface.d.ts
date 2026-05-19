export interface Sale {
    id: number;
    user_id: number;
    product_id: number | null;
    customer_type: string;
    subtotal: number;
    total: string;
    status: string;
    last_touch_at: string | null;
    created_at: string;
}
export interface DetailedSaleRow {
    id: number;
    username: string;
    user_id: number;
    customer_type: string;
    product_name: string;
    qty: number;
    unit_price: number;
    effective_subtotal: number;
    line_after_discount: number;
    created_at: string;
}
export interface ISaleRepository {
    createSale(userId: number, customerType: string, subtotal: number, total: number, status: string, lastTouchAt: Date, createdAt: Date): Promise<number>;
    findById(id: number): Promise<Sale | null>;
    findByUserId(userId: number): Promise<Sale[]>;
    findAll(): Promise<Sale[]>;
    findDetailedByMonth(year: number, month: number): Promise<DetailedSaleRow[]>;
    updateLastTouchAt(id: number, date: Date): Promise<void>;
}
