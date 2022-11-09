import { IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsNumber()
  weight: number;
}
