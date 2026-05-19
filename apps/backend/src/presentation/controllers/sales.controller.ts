import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CreateSaleUseCase } from '../../application/use-cases/sales/create-sale.use-case';
import { ReturnSaleUseCase } from '../../application/use-cases/sales/return-sale.use-case';
import { GetSalesByUserUseCase } from '../../application/use-cases/sales/get-sales-by-user.use-case';
import { CreateSaleDto } from '../../application/dto/create-sale.dto';

@Controller('api')
export class SalesController {
  constructor(
    private readonly createSaleUseCase: CreateSaleUseCase,
    private readonly returnSaleUseCase: ReturnSaleUseCase,
    private readonly getSalesByUserUseCase: GetSalesByUserUseCase,
  ) {}

  @Post('sales')
  async createSale(@Body() dto: CreateSaleDto) {
    const result = await this.createSaleUseCase.execute(dto);
    return result;
  }

  @Post('sales/:sid/return')
  async returnSale(@Param('sid') sid: string, @Body() body: { items: Array<{ product_id: number; qty: number }> }) {
    return this.returnSaleUseCase.execute(Number(sid), body.items);
  }

  @Get('sales/by-user/:uid')
  async getSalesByUser(@Param('uid') uid: string) {
    return this.getSalesByUserUseCase.execute(Number(uid));
  }
}
