import {
    IsNotEmpty,
    IsString
} from 'class-validator';

export class FirstLoginRequestDto {
  @IsString({ message: 'institutionId must be a string' })
  @IsNotEmpty({ message: 'institutionId is required.' })
  institutionId: string;

  @IsString({ message: 'institutionName must be a string' })
  @IsNotEmpty({ message: 'institutionName is required.' })
  institutionName: string;
}
