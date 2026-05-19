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
exports.NotificationTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_orm_entity_1 = require("../database/entities/notification.orm-entity");
const notification_entity_1 = require("../../domain/entities/notification.entity");
let NotificationTypeOrmRepository = class NotificationTypeOrmRepository {
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
        return new notification_entity_1.Notification(ormEntity.id, ormEntity.user_id, ormEntity.message, ormEntity.kind, ormEntity.status, ormEntity.created_at);
    }
    async findAll() {
        const ormEntities = await this.repository.find();
        return ormEntities.map((entity) => new notification_entity_1.Notification(entity.id, entity.user_id, entity.message, entity.kind, entity.status, entity.created_at));
    }
    async findByUserId(userId) {
        const ormEntities = await this.repository.find({
            where: { user_id: userId },
        });
        return ormEntities.map((entity) => new notification_entity_1.Notification(entity.id, entity.user_id, entity.message, entity.kind, entity.status, entity.created_at));
    }
    async updateStatus(id, status) {
        await this.repository.update(id, { status });
    }
    async delete(id) {
        await this.repository.delete(id);
    }
    async create(userId, message, kind, status) {
        const now = new Date().toISOString();
        const ormEntity = this.repository.create({
            user_id: userId,
            message: message,
            kind: kind,
            status: status,
            created_at: now,
        });
        const savedEntity = await this.repository.save(ormEntity);
        return new notification_entity_1.Notification(savedEntity.id, savedEntity.user_id, savedEntity.message, savedEntity.kind, savedEntity.status, savedEntity.created_at);
    }
};
exports.NotificationTypeOrmRepository = NotificationTypeOrmRepository;
exports.NotificationTypeOrmRepository = NotificationTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_orm_entity_1.NotificationOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationTypeOrmRepository);
//# sourceMappingURL=notification.typeorm.repository.js.map