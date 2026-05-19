"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(id, sku, name, price, category, supplierId, deletedAt = null) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.category = category;
        this.supplierId = supplierId;
        this.deletedAt = deletedAt;
    }
    isActive() {
        return this.deletedAt === null;
    }
    toDict() {
        return {
            id: this.id,
            sku: this.sku,
            name: this.name,
            price: this.price,
            category: this.category,
            supplier_id: this.supplierId,
            deleted_at: this.deletedAt,
        };
    }
}
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map