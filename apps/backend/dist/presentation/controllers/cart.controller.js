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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("../../application/services/cart.service");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async getCart(req) {
        const sessionId = req.headers['session-id'] || 'default';
        return this.cartService.getCart(sessionId);
    }
    async addToCart(req, body) {
        const sessionId = req.headers['session-id'] || 'default';
        await this.cartService.addToCart(sessionId, body.product_id, body.quantity);
        return { success: true };
    }
    async removeFromCart(req, productId) {
        const sessionId = req.headers['session-id'] || 'default';
        await this.cartService.removeFromCart(sessionId, Number(productId));
        return { success: true };
    }
    async clearCart(req) {
        const sessionId = req.headers['session-id'] || 'default';
        await this.cartService.clearCart(sessionId);
        return { success: true };
    }
    async checkout(req) {
        const sessionId = req.headers['session-id'] || 'default';
        return this.cartService.checkout(sessionId);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Delete)(':productId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "clearCart", null);
__decorate([
    (0, common_1.Post)('checkout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "checkout", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('api/cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map