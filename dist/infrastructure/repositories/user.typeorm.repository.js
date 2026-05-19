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
exports.UserTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_orm_entity_1 = require("../database/entities/user.orm-entity");
const user_entity_1 = require("../../domain/entities/user.entity");
let UserTypeOrmRepository = class UserTypeOrmRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async findByUsername(username) {
        const ormEntity = await this.repository.findOne({
            where: { username },
        });
        if (!ormEntity) {
            return null;
        }
        return new user_entity_1.User(ormEntity.id, ormEntity.username, ormEntity.password, ormEntity.is_admin);
    }
    async findById(id) {
        const ormEntity = await this.repository.findOne({
            where: { id },
        });
        if (!ormEntity) {
            return null;
        }
        return new user_entity_1.User(ormEntity.id, ormEntity.username, ormEntity.password, ormEntity.is_admin);
    }
    async findAll() {
        const ormEntities = await this.repository.find();
        return ormEntities.map((entity) => new user_entity_1.User(entity.id, entity.username, entity.password, entity.is_admin));
    }
};
exports.UserTypeOrmRepository = UserTypeOrmRepository;
exports.UserTypeOrmRepository = UserTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_orm_entity_1.UserOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserTypeOrmRepository);
//# sourceMappingURL=user.typeorm.repository.js.map