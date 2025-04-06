import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'O email fornecido deve ser válido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;
}
