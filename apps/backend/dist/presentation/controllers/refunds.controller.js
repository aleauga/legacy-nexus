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
exports.RefundsController = void 0;
const common_1 = require("@nestjs/common");
const create_refund_use_case_1 = require("../../application/use-cases/refunds/create-refund.use-case");
const approve_refund_use_case_1 = require("../../application/use-cases/refunds/approve-refund.use-case");
const get_refunds_by_user_use_case_1 = require("../../application/use-cases/refunds/get-refunds-by-user.use-case");
const search_refunds_use_case_1 = require("../../application/use-cases/refunds/search-refunds.use-case");
const get_all_refunds_use_case_1 = require("../../application/use-cases/refunds/get-all-refunds.use-case");
const create_refund_dto_1 = require("../../application/dto/create-refund.dto");
let RefundsController = class RefundsController {
    constructor(createRefundUseCase, approveRefundUseCase, getRefundsByUserUseCase, searchRefundsUseCase, getAllRefundsUseCase) {
        this.createRefundUseCase = createRefundUseCase;
        this.approveRefundUseCase = approveRefundUseCase;
        this.getRefundsByUserUseCase = getRefundsByUserUseCase;
        this.searchRefundsUseCase = searchRefundsUseCase;
        this.getAllRefundsUseCase = getAllRefundsUseCase;
    }
    async getAllRefunds() {
        return this.getAllRefundsUseCase.execute();
    }
    async createRefund(dto) {
        return this.createRefundUseCase.execute(dto);
    }
    async approveRefund(rid) {
        return this.approveRefundUseCase.execute(Number(rid));
    }
    async getRefundsByUser(userId) {
        return this.getRefundsByUserUseCase.execute(Number(userId));
    }
    async searchRefunds(query) {
        return this.searchRefundsUseCase.execute(query);
    }
};
exports.RefundsController = RefundsController;
__decorate([
    (0, common_1.Get)('refunds'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RefundsController.prototype, "getAllRefunds", null);
__decorate([
    (0, common_1.Post)('refunds'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_refund_dto_1.CreateRefundDto]),
    __metadata("design:returntype", Promise)
], RefundsController.prototype, "createRefund", null);
__decorate([
    (0, common_1.Post)('refunds/:rid/approve'),
    __param(0, (0, common_1.Param)('rid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RefundsController.prototype, "approveRefund", null);
__decorate([
    (0, common_1.Get)('refunds/by-user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RefundsController.prototype, "getRefundsByUser", null);
__decorate([
    (0, common_1.Get)('refunds/search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RefundsController.prototype, "searchRefunds", null);
exports.RefundsController = RefundsController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [create_refund_use_case_1.CreateRefundUseCase,
        approve_refund_use_case_1.ApproveRefundUseCase,
        get_refunds_by_user_use_case_1.GetRefundsByUserUseCase,
        search_refunds_use_case_1.SearchRefundsUseCase,
        get_all_refunds_use_case_1.GetAllRefundsUseCase])
], RefundsController);
//# sourceMappingURL=refunds.controller.js.map