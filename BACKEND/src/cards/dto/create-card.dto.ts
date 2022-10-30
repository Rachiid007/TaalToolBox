import { IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  word: string;

  @IsString()
  translation: string;

  @IsString()
  image?: string;
}
