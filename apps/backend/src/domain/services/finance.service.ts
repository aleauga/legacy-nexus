import { IPricingHook } from '../interfaces/pricing.hook.interface';

export class FinanceService {
  private static readonly USD_MXN_RATE = 17.5;
  private readonly pricingHooks: IPricingHook[] = [];

  registerPricingHook(hook: IPricingHook): void {
    this.pricingHooks.push(hook);
  }

  calcIva(amount: number): number {
    let total = 0;
    for (const hook of this.pricingHooks) {
      total += hook.apply(amount, {});
    }
    return total;
  }

  roundAmount(val: number): number {
    return Math.round(val * 100) / 100;
  }

  convertCurrency(amount: number, fromCcy: string, toCcy: string): number {
    if (fromCcy === toCcy) {
      return amount;
    }
    if (fromCcy === 'USD' && toCcy === 'MXN') {
      return amount * FinanceService.USD_MXN_RATE;
    }
    if (fromCcy === 'MXN' && toCcy === 'USD') {
      return amount / FinanceService.USD_MXN_RATE;
    }
    return amount;
  }

  prorateShipping(items: unknown[], totalShipping: number): number[] {
    if (items.length === 0) {
      return [];
    }
    const perItem = totalShipping / items.length;
    return items.map(() => Math.round(perItem * 100) / 100);
  }

  applyVolumeDiscount(qty: number, subtotal: number): number {
    if (qty > 50) {
      return subtotal * 0.9;
    }
    if (qty > 10) {
      return subtotal * 0.95;
    }
    return subtotal;
  }
}
