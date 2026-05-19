export class Product {
  constructor(
    public readonly id: number,
    public readonly sku: string,
    public readonly name: string,
    public readonly price: number,
    public readonly category: string,
    public readonly supplierId: number,
    public readonly deletedAt: Date | null = null,
  ) {}

  isActive(): boolean {
    return this.deletedAt === null;
  }

  toDict(): Record<string, unknown> {
    return {
      id: this.id,
      sku: this.sku,
      name: this.name,
      price: this.price,
      category: this.category,
      supplier_id: this.supplierId,
      deleted_at: this.deletedAt,
    };
  }
}
