"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const create_purchase_use_case_1 = require("../../application/use-cases/purchases/create-purchase.use-case");
const reconcile_purchase_use_case_1 = require("../../application/use-cases/purchases/reconcile-purchase.use-case");
const list_purchases_use_case_1 = require("../../application/use-cases/purchases/list-purchases.use-case");
const purchase_typeorm_repository_1 = require("../../infrastructure/repositories/purchase.typeorm.repository");
const purchase_item_typeorm_repository_1 = require("../../infrastructure/repositories/purchase-item.typeorm.repository");
const inventory_typeorm_repository_1 = require("../../infrastructure/repositories/inventory.typeorm.repository");
const supplier_typeorm_repository_1 = require("../../infrastructure/repositories/supplier.typeorm.repository");
const purchase_orm_entity_1 = require("../../infrastructure/database/entities/purchase.orm-entity");
const purchase_item_orm_entity_1 = require("../../infrastructure/database/entities/purchase-item.orm-entity");
const inventory_stock_orm_entity_1 = require("../../infrastructure/database/entities/inventory-stock.orm-entity");
const product_orm_entity_1 = require("../../infrastructure/database/entities/product.orm-entity");
const supplier_orm_entity_1 = require("../../infrastructure/database/entities/supplier.orm-entity");
const purchases_controller_1 = require("../controllers/purchases.controller");
let PurchasesModule = class PurchasesModule {
};
exports.PurchasesModule = PurchasesModule;
exports.PurchasesModule = PurchasesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([purchase_orm_entity_1.PurchaseOrmEntity, purchase_item_orm_entity_1.PurchaseItemOrmEntity, inventory_stock_orm_entity_1.InventoryStockOrmEntity, product_orm_entity_1.ProductOrmEntity, supplier_orm_entity_1.SupplierOrmEntity]),
        ],
        controllers: [purchases_controller_1.PurchasesController],
        providers: [
            {
                provide: 'IPurchaseRepository',
                useClass: purchase_typeorm_repository_1.PurchaseTypeOrmRepository,
            },
            {
                provide: 'IPurchaseItemRepository',
                useClass: purchase_item_typeorm_repository_1.PurchaseItemTypeOrmRepository,
            },
            {
                provide: 'IInventoryRepository',
                useClass: inventory_typeorm_repository_1.InventoryTypeOrmRepository,
            },
            {
                provide: 'ISupplierRepository',
                useClass: supplier_typeorm_repository_1.SupplierTypeOrmRepository,
            },
            create_purchase_use_case_1.CreatePurchaseUseCase,
            reconcile_purchase_use_case_1.ReconcilePurchaseUseCase,
            list_purchases_use_case_1.ListPurchasesUseCase,
        ],
    })
], PurchasesModule);
//# sourceMappingURL=purchases.module.js.map