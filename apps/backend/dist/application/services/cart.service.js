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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
let CartService = class CartService {
    constructor(productRepository) {
        this.productRepository = productRepository;
        this.carts = new Map();
    }
    getCartKey(sessionId) {
        return sessionId || 'default';
    }
    async getCart(sessionId) {
        return this.carts.get(this.getCartKey(sessionId)) || [];
    }
    async addToCart(sessionId, productId, quantity) {
        const key = this.getCartKey(sessionId);
        let cart = this.carts.get(key) || [];
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        const existingItem = cart.find(item => item.product_id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            cart.push({ product_id: productId, quantity });
        }
        this.carts.set(key, cart);
    }
    async removeFromCart(sessionId, productId) {
        const key = this.getCartKey(sessionId);
        let cart = this.carts.get(key) || [];
        cart = cart.filter(item => item.product_id !== productId);
        this.carts.set(key, cart);
    }
    async clearCart(sessionId) {
        const key = this.getCartKey(sessionId);
        this.carts.delete(key);
    }
    async checkout(sessionId) {
        const key = this.getCartKey(sessionId);
        const cart = this.carts.get(key);
        if (!cart || cart.length === 0) {
            throw new Error('Cart is empty');
        }
        this.carts.delete(key);
        return { sale_id: Math.floor(Math.random() * 1000) };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.Inject)('IProductRepository')),
    __metadata("design:paramtypes", [Object])
], CartService);
//# sourceMappingURL=cart.service.js.map