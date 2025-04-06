import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserProviderEnum } from 'src/common/enums/user-provider.enum';

export class CreateUserRequestDto {
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must have at least 3 characters' })
  @MaxLength(50, { message: 'name must have at most 50 characters' })
  @IsNotEmpty({ message: 'name is required.' })
  name: string;

  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email is required.' })
  email: string;

  @IsString({ message: 'password must be a string' })
  @MinLength(6, { message: 'password must have at least 6 characters' })
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  @IsString({ message: 'password confirmation must be a string' })
  @MinLength(6, {
    message: 'password confirmation must have at least 6 characters',
  })
  @IsNotEmpty({ message: 'password confirmation is required' })
  confirmPassword: string;

  @IsOptional()
  @IsString({ message: 'photo must be a string' })
  photo?: string;

  @IsOptional()
  @IsEnum(UserProviderEnum, { message: 'provider must be a valid enum value' })
  provider?: UserProviderEnum;

  @IsOptional()
  @IsString({ message: 'user provider id must be a string' })
  @MinLength(3, {
    message: 'user provider id must have at least 3 characters if provided',
  })
  userProviderId?: string;
}
