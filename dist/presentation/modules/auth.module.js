"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const login_use_case_1 = require("../../application/use-cases/auth/login.use-case");
const user_typeorm_repository_1 = require("../../infrastructure/repositories/user.typeorm.repository");
const user_orm_entity_1 = require("../../infrastructure/database/entities/user.orm-entity");
const auth_controller_1 = require("../controllers/auth.controller");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_orm_entity_1.UserOrmEntity])],
        controllers: [auth_controller_1.AuthController],
        providers: [
            {
                provide: 'IUserRepository',
                useClass: user_typeorm_repository_1.UserTypeOrmRepository,
            },
            login_use_case_1.LoginUseCase,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map