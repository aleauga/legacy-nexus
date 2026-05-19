import { IsArray, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';

export class PurchaseItemDto {
  @IsNumber()
  @IsNotEmpty()
  product_id!: number;

  @IsNumber()
  @IsNotEmpty()
  qty!: number;

  @IsNumber()
  @IsNotEmpty()
  unit_cost!: number;

  @IsNumber()
  @IsNotEmpty()
  warehouse_id!: number;
}

export class CreatePurchaseDto {
  @IsNumber()
  @IsNotEmpty()
  supplier_id!: number;

  @IsDateString()
  @IsNotEmpty()
  received_date!: string;

  @IsArray()
  @IsNotEmpty()
  items!: PurchaseItemDto[];
}
