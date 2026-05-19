import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { CreateRefundUseCase } from '../../application/use-cases/refunds/create-refund.use-case';
import { ApproveRefundUseCase } from '../../application/use-cases/refunds/approve-refund.use-case';
import { GetRefundsByUserUseCase } from '../../application/use-cases/refunds/get-refunds-by-user.use-case';
import { SearchRefundsUseCase } from '../../application/use-cases/refunds/search-refunds.use-case';
import { GetAllRefundsUseCase } from '../../application/use-cases/refunds/get-all-refunds.use-case';
import { CreateRefundDto } from '../../application/dto/create-refund.dto';

@Controller('api')
export class RefundsController {
  constructor(
    private readonly createRefundUseCase: CreateRefundUseCase,
    private readonly approveRefundUseCase: ApproveRefundUseCase,
    private readonly getRefundsByUserUseCase: GetRefundsByUserUseCase,
    private readonly searchRefundsUseCase: SearchRefundsUseCase,
    private readonly getAllRefundsUseCase: GetAllRefundsUseCase,
  ) {}

  @Get('refunds')
  async getAllRefunds() {
    return this.getAllRefundsUseCase.execute();
  }

  @Post('refunds')
  async createRefund(@Body() dto: CreateRefundDto) {
    return this.createRefundUseCase.execute(dto);
  }

  @Post('refunds/:rid/approve')
  async approveRefund(@Param('rid') rid: string) {
    return this.approveRefundUseCase.execute(Number(rid));
  }

  @Get('refunds/by-user/:userId')
  async getRefundsByUser(@Param('userId') userId: string) {
    return this.getRefundsByUserUseCase.execute(Number(userId));
  }

  @Get('refunds/search')
  async searchRefunds(@Query('q') query: string) {
    return this.searchRefundsUseCase.execute(query);
  }
}
