export interface Purchase {
  id: number;
  supplier_id: number;
  total: number;
  received_date: string;
  status: string;
  bank_ref: string | null;
}

export interface IPurchaseRepository {
  createPurchase(
    supplierId: number,
    total: number,
    receivedDate: string,
    status: string,
  ): Promise<number>;
  findById(id: number): Promise<Purchase | null>;
  findAll(limit?: number): Promise<Purchase[]>;
  findAllWithoutLimit(): Promise<Purchase[]>;
  updateBankRef(id: number, bankRef: string, status: string): Promise<void>;
}
