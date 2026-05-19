export declare class RefundOrmEntity {
    id: number;
    sale_id: number;
    user_id: number;
    amount: number;
    reason: string;
    status: string;
    approved_by: number | null;
    created_at: Date;
}
