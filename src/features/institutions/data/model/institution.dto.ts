import { IsString, IsEmail, IsOptional, IsDate, IsUUID, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class InstitutionDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  updatedAt?: Date;
}
