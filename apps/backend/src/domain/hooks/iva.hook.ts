import { IPricingHook } from '../interfaces/pricing.hook.interface';

export class IvaHook implements IPricingHook {
  apply(amount: number, _context: Record<string, unknown>): number {
    return Math.round(amount * 0.16 * 100) / 100;
  }
}
