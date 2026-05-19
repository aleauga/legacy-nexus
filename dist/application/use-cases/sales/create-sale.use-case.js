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
exports.CreateSaleUseCase = void 0;
const common_1 = require("@nestjs/common");
const finance_service_1 = require("../../../domain/services/finance.service");
let CreateSaleUseCase = class CreateSaleUseCase {
    constructor(saleRepository, saleItemRepository, inventoryRepository, emailService, financeService) {
        this.saleRepository = saleRepository;
        this.saleItemRepository = saleItemRepository;
        this.inventoryRepository = inventoryRepository;
        this.emailService = emailService;
        this.financeService = financeService;
    }
    async execute(dto) {
        let subtotal = 0;
        let totalQty = 0;
        for (const item of dto.items) {
            const price = await this.inventoryRepository.getProductPrice(item.product_id);
            subtotal += price * item.qty;
            totalQty += item.qty;
        }
        const discounted = this.financeService.applyVolumeDiscount(totalQty, subtotal);
        const iva = this.financeService.calcIva(discounted);
        const total = this.financeService.roundAmount(discounted + iva);
        const now = new Date();
        const saleId = await this.saleRepository.createSale(dto.user_id, dto.customer_type, discounted, total, 'completed', now, now);
        for (const item of dto.items) {
            const price = await this.inventoryRepository.getProductPrice(item.product_id);
            await this.saleItemRepository.createSaleItem(saleId, item.product_id, item.qty, price);
            await this.inventoryRepository.decrementStock(item.product_id, 1, item.qty);
        }
        await this.emailService.send(dto.user_id, 'Venta confirmada', `Total: ${total}`);
        return { sale_id: saleId, total };
    }
};
exports.CreateSaleUseCase = CreateSaleUseCase;
exports.CreateSaleUseCase = CreateSaleUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ISaleRepository')),
    __param(1, (0, common_1.Inject)('ISaleItemRepository')),
    __param(2, (0, common_1.Inject)('IInventoryRepository')),
    __param(3, (0, common_1.Inject)('IEmailService')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, finance_service_1.FinanceService])
], CreateSaleUseCase);
//# sourceMappingURL=create-sale.use-case.js.map