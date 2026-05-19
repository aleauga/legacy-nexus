export declare class Sale {
    readonly id: number;
    readonly userId: number;
    readonly customerType: string;
    readonly total: number;
    readonly status: string;
    readonly createdAt: Date;
    constructor(id: number, userId: number, customerType: string, total: number, status: string, createdAt: Date);
    isCompleted(): boolean;
}
