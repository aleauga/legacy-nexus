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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_module_1 = require("../infrastructure/database/database.module");
const auth_module_1 = require("./modules/auth.module");
const sales_module_1 = require("./modules/sales.module");
const purchases_module_1 = require("./modules/purchases.module");
const refunds_module_1 = require("./modules/refunds.module");
const reports_module_1 = require("./modules/reports.module");
const exports_module_1 = require("./modules/exports.module");
const inventory_module_1 = require("./modules/inventory.module");
const suppliers_module_1 = require("./modules/suppliers.module");
const notifications_module_1 = require("./modules/notifications.module");
const products_module_1 = require("./modules/products.module");
const health_controller_1 = require("./controllers/health.controller");
const app_controller_1 = require("./controllers/app.controller");
const memory_cache_service_1 = require("../infrastructure/cache/memory.cache.service");
const finance_service_1 = require("../domain/services/finance.service");
const iva_hook_1 = require("../domain/hooks/iva.hook");
const email_service_impl_1 = require("../infrastructure/services/email.service.impl");
let AppModule = class AppModule {
    constructor(financeService, ivaHook) {
        this.financeService = financeService;
        this.ivaHook = ivaHook;
        this.financeService.registerPricingHook(this.ivaHook);
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            sales_module_1.SalesModule,
            purchases_module_1.PurchasesModule,
            refunds_module_1.RefundsModule,
            reports_module_1.ReportsModule,
            exports_module_1.ExportsModule,
            inventory_module_1.InventoryModule,
            suppliers_module_1.SuppliersModule,
            notifications_module_1.NotificationsModule,
            products_module_1.ProductsModule,
        ],
        controllers: [health_controller_1.HealthController, app_controller_1.AppController],
        providers: [
            memory_cache_service_1.MemoryCacheService,
            finance_service_1.FinanceService,
            email_service_impl_1.EmailService,
            iva_hook_1.IvaHook,
        ],
    }),
    __metadata("design:paramtypes", [finance_service_1.FinanceService,
        iva_hook_1.IvaHook])
], AppModule);
//# sourceMappingURL=app.module.js.map