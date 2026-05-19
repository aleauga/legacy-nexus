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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
let InventoryController = class InventoryController {
    constructor(inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    async getInventoryOverview() {
        return this.inventoryRepository.filterByWarehouse('1');
    }
    async getInventoryByWarehouse(warehouse) {
        return this.inventoryRepository.filterByWarehouse(warehouse);
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getInventoryOverview", null);
__decorate([
    (0, common_1.Get)('warehouse/:wh'),
    __param(0, (0, common_1.Param)('wh')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getInventoryByWarehouse", null);
exports.InventoryController = InventoryController = __decorate([
    (0, common_1.Controller)('api/inventory'),
    __param(0, (0, common_2.Inject)('IInventoryRepository')),
    __metadata("design:paramtypes", [Object])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map