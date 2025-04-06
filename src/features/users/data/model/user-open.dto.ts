import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UserProviderEnum } from 'src/common/enums/user-provider.enum';

export class UserOpenDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsEnum(UserProviderEnum)
  provider?: UserProviderEnum;

  @IsOptional()
  institutionId?: string;

  @IsOptional()
  institutionName?: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  updatedAt?: Date;
}
