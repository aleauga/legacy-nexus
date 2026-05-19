export interface IPricingHook {
  apply(amount: number, context: Record<string, unknown>): number;
}
