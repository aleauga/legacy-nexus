"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IvaHook = void 0;
class IvaHook {
    apply(amount, _context) {
        return Math.round(amount * 0.16 * 100) / 100;
    }
}
exports.IvaHook = IvaHook;
//# sourceMappingURL=iva.hook.js.map