import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UpdateMaintenceRequestDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  clientId?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  odometer?: number;

  @IsOptional()
  @Transform(({ value }) => value && new Date(value))
  performedAt?: Date;

  @IsOptional()
  @Transform(({ value }) => value && new Date(value))
  nextDueAt?: Date;

  @IsOptional()
  deleted?: boolean;
}
