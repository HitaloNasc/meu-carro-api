import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class MaintenceDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsEmail()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  odometer?: number;

  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  performedAt: Date;

  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  nextDueAt: Date;

  @IsBoolean()
  deleted?: boolean;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  updatedAt?: Date;
}
