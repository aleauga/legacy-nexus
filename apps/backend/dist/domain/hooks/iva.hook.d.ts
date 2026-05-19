import { IPricingHook } from '../interfaces/pricing.hook.interface';
export declare class IvaHook implements IPricingHook {
    apply(amount: number, _context: Record<string, unknown>): number;
}
