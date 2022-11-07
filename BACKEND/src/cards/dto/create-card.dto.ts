import { IsOptional, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  word: string;

  @IsString()
  translation: string;

  // @IsString()
  // readonly image?: string;
}
