"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const export_csv_use_case_1 = require("../../application/use-cases/exports/export-csv.use-case");
const export_pivot_use_case_1 = require("../../application/use-cases/exports/export-pivot.use-case");
const sale_typeorm_repository_1 = require("../../infrastructure/repositories/sale.typeorm.repository");
const product_typeorm_repository_1 = require("../../infrastructure/repositories/product.typeorm.repository");
const sale_orm_entity_1 = require("../../infrastructure/database/entities/sale.orm-entity");
const product_orm_entity_1 = require("../../infrastructure/database/entities/product.orm-entity");
const exports_controller_1 = require("../controllers/exports.controller");
let ExportsModule = class ExportsModule {
};
exports.ExportsModule = ExportsModule;
exports.ExportsModule = ExportsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sale_orm_entity_1.SaleOrmEntity, product_orm_entity_1.ProductOrmEntity])],
        controllers: [exports_controller_1.ExportsController],
        providers: [
            {
                provide: 'ISaleRepository',
                useClass: sale_typeorm_repository_1.SaleTypeOrmRepository,
            },
            {
                provide: 'IProductRepository',
                useClass: product_typeorm_repository_1.ProductTypeOrmRepository,
            },
            export_csv_use_case_1.ExportCsvUseCase,
            export_pivot_use_case_1.ExportPivotUseCase,
        ],
    })
], ExportsModule);
//# sourceMappingURL=exports.module.js.map