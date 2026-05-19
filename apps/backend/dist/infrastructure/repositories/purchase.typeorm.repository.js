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
exports.PurchaseTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const purchase_orm_entity_1 = require("../database/entities/purchase.orm-entity");
let PurchaseTypeOrmRepository = class PurchaseTypeOrmRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async createPurchase(supplierId, total, receivedDate, status) {
        const entity = this.repository.create({
            supplier_id: supplierId,
            total,
            received_date: receivedDate,
            status,
        });
        const saved = await this.repository.save(entity);
        return saved.id;
    }
    async findById(id) {
        return this.repository.findOne({ where: { id } });
    }
    async findAll(limit) {
        if (limit) {
            return this.repository.find({ order: { id: 'DESC' }, take: limit });
        }
        return this.repository.find({ order: { id: 'DESC' } });
    }
    async findAllWithoutLimit() {
        return this.repository.find({ order: { id: 'DESC' } });
    }
    async updateBankRef(id, bankRef, status) {
        await this.repository.update(id, { bank_ref: bankRef, status });
    }
};
exports.PurchaseTypeOrmRepository = PurchaseTypeOrmRepository;
exports.PurchaseTypeOrmRepository = PurchaseTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(purchase_orm_entity_1.PurchaseOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PurchaseTypeOrmRepository);
//# sourceMappingURL=purchase.typeorm.repository.js.map