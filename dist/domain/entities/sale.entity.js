"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = void 0;
class Sale {
    constructor(id, userId, customerType, total, status, createdAt) {
        this.id = id;
        this.userId = userId;
        this.customerType = customerType;
        this.total = total;
        this.status = status;
        this.createdAt = createdAt;
    }
    isCompleted() {
        return this.status === 'completed';
    }
}
exports.Sale = Sale;
//# sourceMappingURL=sale.entity.js.map