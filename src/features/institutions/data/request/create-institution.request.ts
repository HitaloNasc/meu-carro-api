import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateInstitutionRequestDto {
  @IsString({ message: 'name must be a string.' })
  @MinLength(3, { message: 'name must have at least 3 characters.' })
  @MaxLength(80, { message: 'name must have at most 80 characters.' })
  @IsNotEmpty({ message: 'name is required.' })
  name: string;

  @IsOptional()
  email: string;
}
