"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const monthly_report_use_case_1 = require("../../application/use-cases/reports/monthly-report.use-case");
const totals_report_use_case_1 = require("../../application/use-cases/reports/totals-report.use-case");
const sale_typeorm_repository_1 = require("../../infrastructure/repositories/sale.typeorm.repository");
const purchase_typeorm_repository_1 = require("../../infrastructure/repositories/purchase.typeorm.repository");
const sale_orm_entity_1 = require("../../infrastructure/database/entities/sale.orm-entity");
const purchase_orm_entity_1 = require("../../infrastructure/database/entities/purchase.orm-entity");
const reports_controller_1 = require("../controllers/reports.controller");
let ReportsModule = class ReportsModule {
};
exports.ReportsModule = ReportsModule;
exports.ReportsModule = ReportsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sale_orm_entity_1.SaleOrmEntity, purchase_orm_entity_1.PurchaseOrmEntity])],
        controllers: [reports_controller_1.ReportsController],
        providers: [
            {
                provide: 'ISaleRepository',
                useClass: sale_typeorm_repository_1.SaleTypeOrmRepository,
            },
            {
                provide: 'IPurchaseRepository',
                useClass: purchase_typeorm_repository_1.PurchaseTypeOrmRepository,
            },
            monthly_report_use_case_1.MonthlyReportUseCase,
            totals_report_use_case_1.TotalsReportUseCase,
        ],
    })
], ReportsModule);
//# sourceMappingURL=reports.module.js.map