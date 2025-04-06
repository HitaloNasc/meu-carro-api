import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SyncMaintenceRequestDto {
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name is required.' })
  name: string;

  @IsString({ message: 'clientId must be a string' })
  @IsNotEmpty({ message: 'clientId is required' })
  clientId: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string;

  @IsOptional()
  @IsNumber()
  odometer?: number;

  @IsOptional()
  @IsNotEmpty({ message: 'performedAt is required' })
  @Transform(({ value }) => value && new Date(value))
  performedAt: Date;

  @IsOptional()
  @IsNotEmpty({ message: 'nextDueAt is required' })
  @Transform(({ value }) => value && new Date(value))
  nextDueAt: Date;

  @IsOptional()
  @IsNotEmpty({ message: 'updastedAt is required' })
  @Transform(({ value }) => value && new Date(value))
  updastedAt: Date;

  @IsOptional()
  deleted?: boolean;
}
