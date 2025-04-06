import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMaintenceRequestDto {
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must have at least 3 characters' })
  @MaxLength(50, { message: 'name must have at most 50 characters' })
  @IsNotEmpty({ message: 'name is required.' })
  name: string;

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
}
