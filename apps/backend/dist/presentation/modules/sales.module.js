"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const create_sale_use_case_1 = require("../../application/use-cases/sales/create-sale.use-case");
const return_sale_use_case_1 = require("../../application/use-cases/sales/return-sale.use-case");
const get_sales_by_user_use_case_1 = require("../../application/use-cases/sales/get-sales-by-user.use-case");
const sale_typeorm_repository_1 = require("../../infrastructure/repositories/sale.typeorm.repository");
const sale_item_typeorm_repository_1 = require("../../infrastructure/repositories/sale-item.typeorm.repository");
const inventory_typeorm_repository_1 = require("../../infrastructure/repositories/inventory.typeorm.repository");
const sale_orm_entity_1 = require("../../infrastructure/database/entities/sale.orm-entity");
const sale_item_orm_entity_1 = require("../../infrastructure/database/entities/sale-item.orm-entity");
const inventory_stock_orm_entity_1 = require("../../infrastructure/database/entities/inventory-stock.orm-entity");
const product_orm_entity_1 = require("../../infrastructure/database/entities/product.orm-entity");
const sales_controller_1 = require("../controllers/sales.controller");
const email_service_impl_1 = require("../../infrastructure/services/email.service.impl");
const finance_service_1 = require("../../domain/services/finance.service");
let SalesModule = class SalesModule {
};
exports.SalesModule = SalesModule;
exports.SalesModule = SalesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sale_orm_entity_1.SaleOrmEntity, sale_item_orm_entity_1.SaleItemOrmEntity, inventory_stock_orm_entity_1.InventoryStockOrmEntity, product_orm_entity_1.ProductOrmEntity]),
        ],
        controllers: [sales_controller_1.SalesController],
        providers: [
            {
                provide: 'ISaleRepository',
                useClass: sale_typeorm_repository_1.SaleTypeOrmRepository,
            },
            {
                provide: 'ISaleItemRepository',
                useClass: sale_item_typeorm_repository_1.SaleItemTypeOrmRepository,
            },
            {
                provide: 'IInventoryRepository',
                useClass: inventory_typeorm_repository_1.InventoryTypeOrmRepository,
            },
            {
                provide: 'IEmailService',
                useClass: email_service_impl_1.EmailService,
            },
            finance_service_1.FinanceService,
            create_sale_use_case_1.CreateSaleUseCase,
            return_sale_use_case_1.ReturnSaleUseCase,
            get_sales_by_user_use_case_1.GetSalesByUserUseCase,
        ],
    })
], SalesModule);
//# sourceMappingURL=sales.module.js.map