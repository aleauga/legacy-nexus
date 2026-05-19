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
exports.SalesController = void 0;
const common_1 = require("@nestjs/common");
const create_sale_use_case_1 = require("../../application/use-cases/sales/create-sale.use-case");
const return_sale_use_case_1 = require("../../application/use-cases/sales/return-sale.use-case");
const get_sales_by_user_use_case_1 = require("../../application/use-cases/sales/get-sales-by-user.use-case");
const create_sale_dto_1 = require("../../application/dto/create-sale.dto");
let SalesController = class SalesController {
    constructor(createSaleUseCase, returnSaleUseCase, getSalesByUserUseCase) {
        this.createSaleUseCase = createSaleUseCase;
        this.returnSaleUseCase = returnSaleUseCase;
        this.getSalesByUserUseCase = getSalesByUserUseCase;
    }
    async createSale(dto) {
        const result = await this.createSaleUseCase.execute(dto);
        return result;
    }
    async returnSale(sid, body) {
        return this.returnSaleUseCase.execute(Number(sid), body.items);
    }
    async getSalesByUser(uid) {
        return this.getSalesByUserUseCase.execute(Number(uid));
    }
};
exports.SalesController = SalesController;
__decorate([
    (0, common_1.Post)('sales'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sale_dto_1.CreateSaleDto]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "createSale", null);
__decorate([
    (0, common_1.Post)('sales/:sid/return'),
    __param(0, (0, common_1.Param)('sid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "returnSale", null);
__decorate([
    (0, common_1.Get)('sales/by-user/:uid'),
    __param(0, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "getSalesByUser", null);
exports.SalesController = SalesController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [create_sale_use_case_1.CreateSaleUseCase,
        return_sale_use_case_1.ReturnSaleUseCase,
        get_sales_by_user_use_case_1.GetSalesByUserUseCase])
], SalesController);
//# sourceMappingURL=sales.controller.js.map