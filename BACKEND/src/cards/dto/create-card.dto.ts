import { IsOptional, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  readonly word: string;

  @IsString()
  readonly translation: string;

  // @IsString()
  // readonly image?: string;
}
