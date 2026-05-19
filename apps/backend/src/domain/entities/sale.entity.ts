export class Sale {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly customerType: string,
    public readonly total: number,
    public readonly status: string,
    public readonly createdAt: Date,
  ) {}

  isCompleted(): boolean {
    return this.status === 'completed';
  }
}
