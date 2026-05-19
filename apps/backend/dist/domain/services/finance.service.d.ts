import { IPricingHook } from '../interfaces/pricing.hook.interface';
export declare class FinanceService {
    private static readonly USD_MXN_RATE;
    private readonly pricingHooks;
    registerPricingHook(hook: IPricingHook): void;
    calcIva(amount: number): number;
    roundAmount(val: number): number;
    convertCurrency(amount: number, fromCcy: string, toCcy: string): number;
    prorateShipping(items: unknown[], totalShipping: number): number[];
    applyVolumeDiscount(qty: number, subtotal: number): number;
}
