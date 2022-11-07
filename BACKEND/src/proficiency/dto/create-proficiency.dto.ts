import { IsNumber, IsString } from 'class-validator';

export class CreateProficiencyDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsNumber()
  weight: number;
}
