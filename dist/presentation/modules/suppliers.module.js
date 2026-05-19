"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuppliersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const suppliers_controller_1 = require("../controllers/suppliers.controller");
const supplier_typeorm_repository_1 = require("../../infrastructure/repositories/supplier.typeorm.repository");
const supplier_orm_entity_1 = require("../../infrastructure/database/entities/supplier.orm-entity");
let SuppliersModule = class SuppliersModule {
};
exports.SuppliersModule = SuppliersModule;
exports.SuppliersModule = SuppliersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([supplier_orm_entity_1.SupplierOrmEntity])],
        controllers: [suppliers_controller_1.SuppliersController],
        providers: [
            {
                provide: 'ISupplierRepository',
                useClass: supplier_typeorm_repository_1.SupplierTypeOrmRepository,
            },
        ],
    })
], SuppliersModule);
//# sourceMappingURL=suppliers.module.js.map