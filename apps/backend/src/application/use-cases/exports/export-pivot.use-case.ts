import { Injectable, Inject } from '@nestjs/common';
import { ISaleRepository, Sale } from '../../../domain/interfaces/sale.repository.interface';
import { IProductRepository } from '../../../domain/interfaces/product.repository.interface';
import { Product } from '../../../domain/entities/product.entity';

interface PivotRow {
  dim_a: string | number;
  dim_b: string | number;
  n_sales: number;
  gross: number;
  effective: number;
  after_volume: number;
}

interface PivotResult {
  data: PivotRow[];
  summary: {
    total_gross: number;
    filas: number;
  };
}

@Injectable()
export class ExportPivotUseCase {
  constructor(
    @Inject('ISaleRepository') private readonly saleRepository: ISaleRepository,
    @Inject('IProductRepository') private readonly productRepository: IProductRepository,
  ) {}

  async execute(_year: number, dimensionA: string, dimensionB: string): Promise<PivotResult> {
    const sales = await this.saleRepository.findAll();
    const products = await this.productRepository.findAll();

    // Filter sales by year (temporarily disabled for debugging)
    const filteredSales = sales;

    // Create product lookup map
    const productMap = new Map<number, Product>();
    products.forEach((product: Product) => {
      productMap.set(product.id, product);
    });

    // Join sales with products to get category
    const enrichedSales = filteredSales.map((sale: Sale): Sale & { category: string } => {
      const product = productMap.get(sale.product_id || 0);
      return {
        ...sale,
        category: product ? product.category : 'Unknown',
      };
    });

    // Get unique values for dimensions
    const uniqueA = [...new Set(enrichedSales.map((s: Sale & { category: string }) => s[dimensionA as keyof (Sale & { category: string })]))].filter((v): v is string | number => v !== null);
    const uniqueB = [...new Set(enrichedSales.map((s: Sale & { category: string }) => s[dimensionB as keyof (Sale & { category: string })]))].filter((v): v is string | number => v !== null);

    // Build pivot table with metrics
    const pivot: PivotRow[] = [];
    let totalGross = 0;

    uniqueA.forEach((a: string | number) => {
      uniqueB.forEach((b: string | number) => {
        const matchingSales = enrichedSales.filter((s: Sale & { category: string }) => s[dimensionA as keyof (Sale & { category: string })] === a && s[dimensionB as keyof (Sale & { category: string })] === b);
        
        if (matchingSales.length > 0) {
          const ventas = matchingSales.length;
          const gross = matchingSales.reduce((sum: number, s: Sale) => sum + parseFloat(s.total), 0);
          const effective = gross * 0.85; // 15% discount
          const afterVolume = effective * 0.95; // 5% volume discount
          
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
}
