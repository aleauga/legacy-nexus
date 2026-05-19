import { IsNumber, IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export interface RefundItem {
  product_id: number;
  qty: number;
}

export class CreateRefundDto {
  @IsNumber()
  @IsNotEmpty()
  sale_id!: number;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsNotEmpty()
  reason!: string;

  @IsNumber()
  @IsOptional()
  user_id?: number;

  @IsArray()
  @IsOptional()
  items?: RefundItem[];
}
