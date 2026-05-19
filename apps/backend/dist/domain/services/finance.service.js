"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceService = void 0;
class FinanceService {
    constructor() {
        this.pricingHooks = [];
    }
    registerPricingHook(hook) {
        this.pricingHooks.push(hook);
    }
    calcIva(amount) {
        let total = 0;
        for (const hook of this.pricingHooks) {
            total += hook.apply(amount, {});
        }
        return total;
    }
    roundAmount(val) {
        return Math.round(val * 100) / 100;
    }
    convertCurrency(amount, fromCcy, toCcy) {
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
    prorateShipping(items, totalShipping) {
        if (items.length === 0) {
            return [];
        }
        const perItem = totalShipping / items.length;
        return items.map(() => Math.round(perItem * 100) / 100);
    }
    applyVolumeDiscount(qty, subtotal) {
        if (qty > 50) {
            return subtotal * 0.9;
        }
        if (qty > 10) {
            return subtotal * 0.95;
        }
        return subtotal;
    }
}
exports.FinanceService = FinanceService;
FinanceService.USD_MXN_RATE = 17.5;
//# sourceMappingURL=finance.service.js.map