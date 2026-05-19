export class Notification {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly message: string,
    public readonly kind: string,
    public readonly status: string,
    public readonly createdAt: string,
  ) {}

  toDict(): Record<string, unknown> {
    return {
      id: this.id,
      user_id: this.userId,
      message: this.message,
      kind: this.kind,
      status: this.status,
      created_at: this.createdAt,
    };
  }
}
