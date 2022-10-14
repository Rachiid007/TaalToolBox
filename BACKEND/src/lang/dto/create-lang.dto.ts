import { IsString } from 'class-validator';

export class CreateLangDto {
  @IsString()
  code: string;

  @IsString()
  name: string;
}
