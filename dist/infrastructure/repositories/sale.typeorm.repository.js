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
exports.SaleTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sale_orm_entity_1 = require("../database/entities/sale.orm-entity");
let SaleTypeOrmRepository = class SaleTypeOrmRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async createSale(userId, customerType, subtotal, total, status, lastTouchAt, createdAt) {
        const entity = this.repository.create({
            user_id: userId,
            customer_type: customerType,
            subtotal,
            total: total.toString(),
            status,
            last_touch_at: lastTouchAt.toISOString(),
            created_at: createdAt.toISOString(),
        });
        const saved = await this.repository.save(entity);
        return Array.isArray(saved) ? saved[0].id : saved.id;
    }
    async findById(id) {
        return this.repository.findOne({ where: { id } });
    }
    async findByUserId(userId) {
        return this.repository.find({
            where: { user_id: userId, status: 'completed' },
        });
    }
    async findAll() {
        return this.repository.find();
    }
    async findDetailedByMonth(year, month) {
        const query = this.repository.createQueryBuilder('sale')
            .leftJoin('users', 'user', 'user.id = sale.user_id')
            .leftJoin('sale_items', 'item', 'item.sale_id = sale.id')
            .leftJoin('products', 'product', 'product.id = item.product_id')
            .select([
            'sale.id',
            'user.username',
            'sale.user_id',
            'sale.customer_type',
            'product.name as product_name',
            'item.qty',
            'item.unit_price',
            'sale.subtotal as effective_subtotal',
            'sale.total as line_after_discount',
            'sale.created_at',
        ])
            .where("sale.status IN ('completed', 'done', 'COMPLETED', 'finalizada')");
        const result = await query.getRawMany();
        const filtered = result.filter((row) => {
            const dateStr = String(row.sale_created_at || '');
            if (!dateStr)
                return false;
            const patterns = [
                `${year}-${month.toString().padStart(2, '0')}`,
                `${month}/${year}`,
                `${year}/${month.toString().padStart(2, '0')}`,
                `${month.toString().padStart(2, '0')}/${year}`
            ];
            const matches = patterns.some(pattern => dateStr.includes(pattern));
            return matches;
        });
        return filtered.map((row) => ({
            id: Number(row.sale_id),
            username: String(row.user_username || row.sale_user_id?.toString()),
            user_id: Number(row.sale_user_id),
            customer_type: String(row.sale_customer_type),
            product_name: String(row.product_name),
            qty: Number(row.item_qty),
            unit_price: Number(row.item_unit_price),
            effective_subtotal: parseFloat(String(row.effective_subtotal)) || 0,
            line_after_discount: parseFloat(String(row.line_after_discount)) || 0,
            created_at: String(row.sale_created_at),
        }));
    }
    async updateLastTouchAt(id, date) {
        await this.repository.update(id, { last_touch_at: date.toISOString() });
    }
};
exports.SaleTypeOrmRepository = SaleTypeOrmRepository;
exports.SaleTypeOrmRepository = SaleTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sale_orm_entity_1.SaleOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SaleTypeOrmRepository);
//# sourceMappingURL=sale.typeorm.repository.js.map