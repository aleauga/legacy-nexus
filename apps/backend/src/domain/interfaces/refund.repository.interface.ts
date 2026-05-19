export interface IRefundRepository {
  createRefund(
    saleId: number,
    amount: number,
    reason: string,
    status: string,
    userId?: number,
  ): Promise<number>;
  findById(id: number): Promise<unknown | null>;
  findBySaleId(saleId: number): Promise<unknown[]>;
  findByUserId(userId: number): Promise<unknown[]>;
  findAll(): Promise<unknown[]>;
  search(query: string): Promise<unknown[]>;
  updateStatus(id: number, status: string): Promise<void>;
}
