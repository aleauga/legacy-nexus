"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventory_stock_orm_entity_1 = require("../database/entities/inventory-stock.orm-entity");
const product_orm_entity_1 = require("../database/entities/product.orm-entity");
let InventoryTypeOrmRepository = class InventoryTypeOrmRepository {
    constructor(repository, productRepository) {
        this.repository = repository;
        this.productRepository = productRepository;
    }
    async getStock(productId, warehouseId) {
        if (warehouseId) {
            const stock = await this.repository.findOne({
                where: { product_id: productId, warehouse_id: warehouseId },
            });
            return stock?.quantity ?? 0;
        }
        const result = await this.repository
            .createQueryBuilder('stock')
            .select('SUM(stock.quantity)', 'total')
            .where('stock.product_id = :productId', { productId })
            .getRawOne();
        return result?.total ?? 0;
    }
    async decrementStock(productId, warehouseId, qty) {
        const stock = await this.repository.findOne({
            where: { product_id: productId, warehouse_id: warehouseId },
        });
        const current = stock?.quantity ?? 0;
        const newQty = Math.max(0, current - qty);
        if (stock) {
            await this.repository.update({ product_id: productId, warehouse_id: warehouseId }, { quantity: newQty });
        }
        else {
            await this.repository.save({
                product_id: productId,
                warehouse_id: warehouseId,
                quantity: newQty,
            });
        }
    }
    async incrementStock(productId, warehouseId, qty) {
        const stock = await this.repository.findOne({
            where: { product_id: productId, warehouse_id: warehouseId },
        });
        const current = stock?.quantity ?? 0;
        const newQty = current + qty;
        if (stock) {
            await this.repository.update({ product_id: productId, warehouse_id: warehouseId }, { quantity: newQty });
        }
        else {
            await this.repository.save({
                product_id: productId,
                warehouse_id: warehouseId,
                quantity: newQty,
            });
        }
    }
    async getProductPrice(productId) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        return product?.price ?? 0;
    }
    async filterByWarehouse(warehouse) {
        const stockRecords = await this.repository.find({
            where: { warehouse_id: Number(warehouse) },
        });
        const result = [];
        for (const stock of stockRecords) {
            const product = await this.productRepository.findOne({
                where: { id: stock.product_id },
            });
            if (product) {
                result.push({
                    product_id: stock.product_id,
                    warehouse_id: stock.warehouse_id,
                    quantity: stock.quantity,
                    sku: product.sku,
                    name: product.name,
                    warehouse: stock.warehouse_id,
                });
            }
        }
        return result;
    }
};
exports.InventoryTypeOrmRepository = InventoryTypeOrmRepository;
exports.InventoryTypeOrmRepository = InventoryTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventory_stock_orm_entity_1.InventoryStockOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(product_orm_entity_1.ProductOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], InventoryTypeOrmRepository);
//# sourceMappingURL=inventory.typeorm.repository.js.map