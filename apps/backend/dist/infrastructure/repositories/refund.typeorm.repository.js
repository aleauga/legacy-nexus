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
exports.RefundTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const refund_orm_entity_1 = require("../database/entities/refund.orm-entity");
let RefundTypeOrmRepository = class RefundTypeOrmRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async createRefund(saleId, amount, reason, status, userId) {
        const entity = this.repository.create({
            sale_id: saleId,
            user_id: userId,
            amount,
            reason,
            status,
            created_at: new Date(),
        });
        const saved = await this.repository.save(entity);
        return saved.id;
    }
    async findById(id) {
        return this.repository.findOne({ where: { id } });
    }
    async findBySaleId(saleId) {
        return this.repository.find({ where: { sale_id: saleId } });
    }
    async findByUserId(userId) {
        return this.repository.find({
            where: { user_id: userId },
        });
    }
    async findAll() {
        return this.repository.find();
    }
    async search(query) {
        return this.repository
            .createQueryBuilder('refund')
            .where('refund.reason LIKE :query', { query: `%${query}%` })
            .getMany();
    }
    async updateStatus(id, status) {
        await this.repository.update(id, { status });
    }
};
exports.RefundTypeOrmRepository = RefundTypeOrmRepository;
exports.RefundTypeOrmRepository = RefundTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(refund_orm_entity_1.RefundOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RefundTypeOrmRepository);
//# sourceMappingURL=refund.typeorm.repository.js.map