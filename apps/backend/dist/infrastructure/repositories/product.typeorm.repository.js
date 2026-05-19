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
exports.ProductTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_orm_entity_1 = require("../database/entities/product.orm-entity");
const product_entity_1 = require("../../domain/entities/product.entity");
let ProductTypeOrmRepository = class ProductTypeOrmRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async findById(id) {
        const ormEntity = await this.repository.findOne({
            where: { id },
        });
        if (!ormEntity) {
            return null;
        }
        return new product_entity_1.Product(ormEntity.id, ormEntity.sku, ormEntity.name, ormEntity.price, ormEntity.category, ormEntity.supplier_id, ormEntity.deleted_at);
    }
    async findAll() {
        const ormEntities = await this.repository.find();
        return ormEntities.map((entity) => new product_entity_1.Product(entity.id, entity.sku, entity.name, entity.price, entity.category, entity.supplier_id, entity.deleted_at));
    }
    async findActive() {
        const ormEntities = await this.repository.find({
            where: { deleted_at: null },
        });
        return ormEntities.map((entity) => new product_entity_1.Product(entity.id, entity.sku, entity.name, entity.price, entity.category, entity.supplier_id, entity.deleted_at));
    }
    async findBySku(sku) {
        const ormEntity = await this.repository.findOne({
            where: { sku },
        });
        if (!ormEntity) {
            return null;
        }
        return new product_entity_1.Product(ormEntity.id, ormEntity.sku, ormEntity.name, ormEntity.price, ormEntity.category, ormEntity.supplier_id, ormEntity.deleted_at);
    }
    async create(product) {
        const ormEntity = this.repository.create({
            sku: product.sku,
            name: product.name,
            price: product.price,
            category: product.category,
            supplier_id: product.supplierId,
            deleted_at: product.deletedAt,
        });
        const saved = await this.repository.save(ormEntity);
        return saved.id;
    }
    async delete(id) {
        await this.repository.update(id, { deleted_at: new Date() });
    }
};
exports.ProductTypeOrmRepository = ProductTypeOrmRepository;
exports.ProductTypeOrmRepository = ProductTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_orm_entity_1.ProductOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductTypeOrmRepository);
//# sourceMappingURL=product.typeorm.repository.js.map