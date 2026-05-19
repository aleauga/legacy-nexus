import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { CreatePurchaseUseCase } from '../../application/use-cases/purchases/create-purchase.use-case';
import { ReconcilePurchaseUseCase } from '../../application/use-cases/purchases/reconcile-purchase.use-case';
import { ListPurchasesUseCase } from '../../application/use-cases/purchases/list-purchases.use-case';
import { CreatePurchaseDto } from '../../application/dto/create-purchase.dto';

@Controller('api')
export class PurchasesController {
  constructor(
    private readonly createPurchaseUseCase: CreatePurchaseUseCase,
    private readonly reconcilePurchaseUseCase: ReconcilePurchaseUseCase,
    private readonly listPurchasesUseCase: ListPurchasesUseCase,
  ) {}

  @Post('purchases')
  async createPurchase(@Body() dto: CreatePurchaseDto) {
    return this.createPurchaseUseCase.execute(dto);
  }

  @Post('purchases/:pid/reconcile')
  async reconcilePurchase(@Param('pid') pid: string, @Body() body: { bank_ref: string }) {
    return this.reconcilePurchaseUseCase.execute(Number(pid), body.bank_ref);
  }

  @Get('purchases')
  async listPurchases(@Query('limit') limit?: string) {
    return this.listPurchasesUseCase.execute(limit ? Number(limit) : 50);
  }
}
