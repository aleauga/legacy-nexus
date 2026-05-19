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
exports.CreatePurchaseUseCase = void 0;
const common_1 = require("@nestjs/common");
let CreatePurchaseUseCase = class CreatePurchaseUseCase {
    constructor(purchaseRepository, purchaseItemRepository, inventoryRepository, supplierRepository) {
        this.purchaseRepository = purchaseRepository;
        this.purchaseItemRepository = purchaseItemRepository;
        this.inventoryRepository = inventoryRepository;
        this.supplierRepository = supplierRepository;
    }
    async execute(dto) {
        const total = this._calcPurchaseTotal(dto.items);
        const purchaseId = await this.purchaseRepository.createPurchase(dto.supplier_id, total, dto.received_date, 'received');
        for (const item of dto.items) {
            await this.purchaseItemRepository.createPurchaseItem(purchaseId, item.product_id, item.qty, item.unit_cost);
            await this.inventoryRepository.incrementStock(item.product_id, item.warehouse_id, item.qty);
        }
        const supplier = await this.supplierRepository.findById(dto.supplier_id);
        const supplierName = supplier?.name || 'Unknown';
        return { purchase_id: purchaseId, supplier_name: supplierName };
    }
    _calcPurchaseTotal(items) {
        return items.reduce((sum, item) => sum + item.qty * item.unit_cost, 0);
    }
};
exports.CreatePurchaseUseCase = CreatePurchaseUseCase;
exports.CreatePurchaseUseCase = CreatePurchaseUseCase = __decorate([
    __param(0, (0, common_1.Inject)('IPurchaseRepository')),
    __param(1, (0, common_1.Inject)('IPurchaseItemRepository')),
    __param(2, (0, common_1.Inject)('IInventoryRepository')),
    __param(3, (0, common_1.Inject)('ISupplierRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], CreatePurchaseUseCase);
//# sourceMappingURL=create-purchase.use-case.js.map