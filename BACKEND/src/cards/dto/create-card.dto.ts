import { IsString, IsOptional } from 'class-validator';

export class CreateCardDto {
  @IsString()
  word: string;

  @IsString()
  translation: string;

  @IsString()
  @IsOptional()
  image: string;
}
