export declare class Notification {
    readonly id: number;
    readonly userId: number;
    readonly message: string;
    readonly kind: string;
    readonly status: string;
    readonly createdAt: string;
    constructor(id: number, userId: number, message: string, kind: string, status: string, createdAt: string);
    toDict(): Record<string, unknown>;
}
