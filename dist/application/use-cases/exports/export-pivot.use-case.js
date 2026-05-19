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
exports.ExportPivotUseCase = void 0;
const common_1 = require("@nestjs/common");
let ExportPivotUseCase = class ExportPivotUseCase {
    constructor(saleRepository, productRepository) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
    }
    async execute(_year, dimensionA, dimensionB) {
        const sales = await this.saleRepository.findAll();
        const products = await this.productRepository.findAll();
        const filteredSales = sales;
        const productMap = new Map();
        products.forEach((product) => {
            productMap.set(product.id, product);
        });
        const enrichedSales = filteredSales.map((sale) => {
            const product = productMap.get(sale.product_id || 0);
            return {
                ...sale,
                category: product ? product.category : 'Unknown',
            };
        });
        const uniqueA = [...new Set(enrichedSales.map((s) => s[dimensionA]))].filter((v) => v !== null);
        const uniqueB = [...new Set(enrichedSales.map((s) => s[dimensionB]))].filter((v) => v !== null);
        const pivot = [];
        let totalGross = 0;
        uniqueA.forEach((a) => {
            uniqueB.forEach((b) => {
                const matchingSales = enrichedSales.filter((s) => s[dimensionA] === a && s[dimensionB] === b);
                if (matchingSales.length > 0) {
                    const ventas = matchingSales.length;
                    const gross = matchingSales.reduce((sum, s) => sum + parseFloat(s.total), 0);
                    const effective = gross * 0.85;
                    const afterVolume = effective * 0.95;
                    totalGross += gross;
                    pivot.push({
                        dim_a: a,
                        dim_b: b,
                        n_sales: ventas,
                        gross: parseFloat(gross.toFixed(4)),
                        effective: parseFloat(effective.toFixed(4)),
                        after_volume: parseFloat(afterVolume.toFixed(4)),
                    });
                }
            });
        });
        return {
            data: pivot,
            summary: {
                total_gross: totalGross,
                filas: pivot.length,
            },
        };
    }
};
exports.ExportPivotUseCase = ExportPivotUseCase;
exports.ExportPivotUseCase = ExportPivotUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ISaleRepository')),
    __param(1, (0, common_1.Inject)('IProductRepository')),
    __metadata("design:paramtypes", [Object, Object])
], ExportPivotUseCase);
//# sourceMappingURL=export-pivot.use-case.js.map