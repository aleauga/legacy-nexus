"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const create_refund_use_case_1 = require("../../application/use-cases/refunds/create-refund.use-case");
const approve_refund_use_case_1 = require("../../application/use-cases/refunds/approve-refund.use-case");
const get_refunds_by_user_use_case_1 = require("../../application/use-cases/refunds/get-refunds-by-user.use-case");
const search_refunds_use_case_1 = require("../../application/use-cases/refunds/search-refunds.use-case");
const get_all_refunds_use_case_1 = require("../../application/use-cases/refunds/get-all-refunds.use-case");
const refund_typeorm_repository_1 = require("../../infrastructure/repositories/refund.typeorm.repository");
const sale_typeorm_repository_1 = require("../../infrastructure/repositories/sale.typeorm.repository");
const refund_orm_entity_1 = require("../../infrastructure/database/entities/refund.orm-entity");
const sale_orm_entity_1 = require("../../infrastructure/database/entities/sale.orm-entity");
const refunds_controller_1 = require("../controllers/refunds.controller");
let RefundsModule = class RefundsModule {
};
exports.RefundsModule = RefundsModule;
exports.RefundsModule = RefundsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([refund_orm_entity_1.RefundOrmEntity, sale_orm_entity_1.SaleOrmEntity]),
        ],
        controllers: [refunds_controller_1.RefundsController],
        providers: [
            {
                provide: 'IRefundRepository',
                useClass: refund_typeorm_repository_1.RefundTypeOrmRepository,
            },
            {
                provide: 'ISaleRepository',
                useClass: sale_typeorm_repository_1.SaleTypeOrmRepository,
            },
            create_refund_use_case_1.CreateRefundUseCase,
            approve_refund_use_case_1.ApproveRefundUseCase,
            get_refunds_by_user_use_case_1.GetRefundsByUserUseCase,
            search_refunds_use_case_1.SearchRefundsUseCase,
            get_all_refunds_use_case_1.GetAllRefundsUseCase,
        ],
    })
], RefundsModule);
//# sourceMappingURL=refunds.module.js.map