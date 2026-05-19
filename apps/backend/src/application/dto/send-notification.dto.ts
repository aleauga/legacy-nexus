import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SendNotificationDto {
  @IsNumber()
  @IsNotEmpty()
  user_id!: number;

  @IsString()
  @IsOptional()
  subject?: string;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsString()
  @IsOptional()
  kind?: string;
}
