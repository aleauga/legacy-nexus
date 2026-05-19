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
exports.PurchasesController = void 0;
const common_1 = require("@nestjs/common");
const create_purchase_use_case_1 = require("../../application/use-cases/purchases/create-purchase.use-case");
const reconcile_purchase_use_case_1 = require("../../application/use-cases/purchases/reconcile-purchase.use-case");
const list_purchases_use_case_1 = require("../../application/use-cases/purchases/list-purchases.use-case");
const create_purchase_dto_1 = require("../../application/dto/create-purchase.dto");
let PurchasesController = class PurchasesController {
    constructor(createPurchaseUseCase, reconcilePurchaseUseCase, listPurchasesUseCase) {
        this.createPurchaseUseCase = createPurchaseUseCase;
        this.reconcilePurchaseUseCase = reconcilePurchaseUseCase;
        this.listPurchasesUseCase = listPurchasesUseCase;
    }
    async createPurchase(dto) {
        return this.createPurchaseUseCase.execute(dto);
    }
    async reconcilePurchase(pid, body) {
        return this.reconcilePurchaseUseCase.execute(Number(pid), body.bank_ref);
    }
    async listPurchases(limit) {
        return this.listPurchasesUseCase.execute(limit ? Number(limit) : 50);
    }
};
exports.PurchasesController = PurchasesController;
__decorate([
    (0, common_1.Post)('purchases'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_purchase_dto_1.CreatePurchaseDto]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "createPurchase", null);
__decorate([
    (0, common_1.Post)('purchases/:pid/reconcile'),
    __param(0, (0, common_1.Param)('pid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "reconcilePurchase", null);
__decorate([
    (0, common_1.Get)('purchases'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "listPurchases", null);
exports.PurchasesController = PurchasesController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [create_purchase_use_case_1.CreatePurchaseUseCase,
        reconcile_purchase_use_case_1.ReconcilePurchaseUseCase,
        list_purchases_use_case_1.ListPurchasesUseCase])
], PurchasesController);
//# sourceMappingURL=purchases.controller.js.map