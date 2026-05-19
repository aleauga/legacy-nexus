import { IsArray, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class SaleItemDto {
  @IsNumber()
  @IsNotEmpty()
  product_id!: number;

  @IsNumber()
  @IsNotEmpty()
  qty!: number;

  @IsNumber()
  @IsNotEmpty()
  warehouse_id!: number;
}

export class CreateSaleDto {
  @IsNumber()
  @IsNotEmpty()
  user_id!: number;

  @IsString()
  @IsNotEmpty()
  customer_type!: string;

  @IsArray()
  @IsNotEmpty()
  items!: SaleItemDto[];
}
